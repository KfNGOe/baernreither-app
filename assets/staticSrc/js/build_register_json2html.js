// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const ShortUniqueId = require('short-unique-id');
const { exit } = require("process") ;
var convert = require('xml-js') ;
const { group } = require("console");

var pos_body = 0 ;
var title_short = '' ;
//var groupedByPos = {} ;
var html_str = '' ;

// Creating a window with a document
const dom = new jsdom.JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>

//Instantiate ShortUniqueId
const uid = new ShortUniqueId({ length: 10 });

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_txt=process.env.filepath_out_txt ;

function posStr2Nr(posStr) {
   let pos_tmp = posStr.substring(title_short.length + 1) ;   
   return +pos_tmp ;
}

function posNr2Str(posNr) {
   let pos_tmp = title_short + '_' + posNr.toString() ;   
   return pos_tmp ;
}

function generateId(item) {
   //random number + pos   
   return uid.rnd() ;
   //return item.pos.value ;
}

function buildReg(obj) {   //obj = register_person.json
   html_str = '' ;
   //group by key
   groupedByKey = obj.results.bindings.groupBy( item => {        
      return item.key ;
   }) ;     
   //iterate over keys
   Object.keys(groupedByKey).forEach((key) => {
      console.log('key = ', key) ;
      console.log('groupedByKey[key] = ', groupedByKey[key]) ;
      let key_arr = groupedByKey[key] ;
      //start new row
      html_str = html_str.concat('<tr>') ;      
      //id
      let id = key_arr[0].id ;
      html_str = html_str.concat('<td style="display: none">' + id + '</td>') ;
      //entry
      let entry = key_arr[0].surname + ', ' + key_arr[0].forename + ' ' + key_arr[0].addName ;
      html_str = html_str.concat('<td>' + entry + '</td>') ;
      //life dates
      let birth = key_arr[0].birth ;
      let death = key_arr[0].death ;
      html_str = html_str.concat('<td>' + '∗ ' + birth +'<br>' + '† ' + death + '</td>') ;
      //description
      let desc = key_arr[0].desc ;
      html_str = html_str.concat('<td>' + desc + '</td>') ;
      //pid
      let pid = key_arr[0].pid ;
      html_str = html_str.concat('<td>' + '<a href=#"' + pid + '" target="blank">GND</a></td>') ;      
      
      html_str = html_str.concat('</tr>') ;
      
      
      
      
      if (posStr2Nr(key) >= posStr2Nr(pos_body)) {
         //console.log('key = ', key) ;
         let item = groupedByPos[key][0] ;
         //console.log('item = ', item) ;
         switch(item.type.value) {
            case 'https://github.com/KfNGOe/kfngoeo#StartTag':
               switch(item.name.value) {
                  case 'http://www.tei-c.org/ns/1.0/p': 
                     html_str = html_str.concat('<p>') ;                              
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/anchor':                     
                     if (groupedByStartPos[posStr2Nr(key)] !== undefined) {
                        let sourceBodyId = groupedByStartPos[posStr2Nr(key)][0].source_body.value ;
                        if (groupedById[sourceBodyId] !== undefined) {
                           //build ref
                           let sourceBodyTarget = groupedById[sourceBodyId][0].source_target.value ;
                           let sourceBodyStart = groupedById[sourceBodyId][0].start.value ;
                           let ref = "comp_" + sourceBodyTarget + '_' + sourceBodyStart ;
                           //check status and set class
                           let item_comp = {} ;                           
                           let item_comp_arr = groupedByStartPos[posStr2Nr(key)] ;
                           if (item_comp_arr.length > 1) {
                              groupedBySourceTarget = item_comp_arr.groupBy( item => {
                                 return item.source_target.value ;
                              }) ;
                              if (groupedBySourceTarget[title_short] !== undefined) {                                 
                                 item_comp = groupedBySourceTarget[title_short][0] ;
                              }                              
                           } else {
                              item_comp = item_comp_arr[0] ;
                           }
                           switch(item_comp.status.value) {
                              case 'equal': 
                                 html_str = html_str.concat('<a class="comp-img-equal" href="#' + ref + '" id="comp_' + generateId(item) + '" style="display: none"><img src="images/anchor.png" title="click"></a>') ;                                 
                                 break ;
                              case 'notEqual':
                                 html_str = html_str.concat('<a class="comp-img-inequal" href="#' + ref + '" id="comp_' + generateId(item) + '" style="display: none"><img src="images/anchor.png" title="click"></a>') ;                                 
                                 break ;
                              case 'missing':
                                 html_str = html_str.concat('<a class="comp-img-not" href="#' + ref + '" id="comp_' + generateId(item) + '" style="display: none"><img src="images/anchor.png" title="click"></a>') ;                                 
                                 break ;
                              default:
                                 break ;
                           }                           
                        } else {                       
                           console.log('sourceBodyId = ', sourceBodyId, ' not in annoTextComp') ;
                           html_str = html_str.concat('<a href="#" id="comp_' + generateId(item) + '"><img src="images/anchor.png" title="click" style="display: none"></a>') ;
                        }                           
                     } else {
                        console.log('key = ', key, ' not in annoTextComp') ;
                        html_str = html_str.concat('<a href="#" id="comp_' + generateId(item) + '"><img src="images/anchor.png" title="click" style="display: none"></a>') ;
                     }
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/app':
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/note':
                     html_str = html_str.concat('<span id="note_' + generateId(item) + '" style="display: none">') ;
                     break ;
                  default:
                     break ;
               }                        
               break ;
            case 'https://github.com/KfNGOe/kfngoeo#EndTag':
               switch(item.name.value) {
                  case 'http://www.tei-c.org/ns/1.0/p': 
                     html_str = html_str.concat('</p>') ;
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/note':
                     html_str = html_str.concat('</span>') ;
                     break ;
                  default:
                     break ;
               }
               break ;
            case 'https://github.com/KfNGOe/kfngoeo#Text':
               //check if text is between anchor and app pos
               let item_comp = {} ;                        
               let item_hit = obj_1.results.bindings.find((item_1, index_1, array_1) => {                  
                  //check if same text source
                  let flag_source = (item.pos.value.includes(item_1.source_target.value)) ? true : false ;
                  item_comp = item_1 ;                  
                  return (+item_1.start.value < posStr2Nr(item.pos.value)) && (posStr2Nr(item.pos.value) < +item_1.end.value && flag_source) ;
               }) ;
               if (item_hit !== undefined) {
                  //text is between anchor and app pos
                  //check status and set class
                  switch(item_comp.status.value) {
                     case 'equal': 
                        html_str = html_str.concat('<span class="comp-passage-equal" id="comp_' + generateId(item) + '">') ;
                        break ;
                     case 'notEqual':
                        html_str = html_str.concat('<span class="comp-passage-inequal" id="comp_' + generateId(item) + '">') ;
                        break ;
                     case 'missing':
                        html_str = html_str.concat('<span class="comp-passage-not" id="comp_' + generateId(item) + '">') ;
                        break ;
                     default:
                        break ;
                  }                  
                  html_str = html_str.concat(item.cont.value) ;
                  html_str = html_str.concat('</span>') ;
               } else {                        
                  //check if text is between app pos
                  let pos_tmp = posNr2Str(posStr2Nr(item.pos.value) - 2) ;
                  let pos_arr = groupedByPos[pos_tmp] ;
                  if (pos_arr[0].name !== undefined && pos_arr[0].name.value == 'http://www.tei-c.org/ns/1.0/app' 
                     && pos_arr[0].type.value == 'https://github.com/KfNGOe/kfngoeo#StartTag') {
                        html_str = html_str.concat('<span id="comp_' + generateId(item) + '" style="display: none">') ;
                        html_str = html_str.concat(item.cont.value) ;
                        html_str = html_str.concat('</span>') ;
                  } else {
                     html_str = html_str.concat('<span id="text_' + generateId(item) + '">') ;
                     html_str = html_str.concat(item.cont.value) ;
                     html_str = html_str.concat('</span>') ;                           
                  }
               }
               break ;                     
            default:
               break ;
         }
      }
   }) ;
} ; 

//read comp text json file
let json_in = fs.readFileSync('./data/json/register/register_person.json', 'utf8') ; //data/json/register/register_person.json
console.log('json data read: ', json_in.length, ' bytes') ;
//convert json to js object
var jsonJs_in_reg = JSON.parse(json_in) ;
//build html string
buildReg(jsonJs_in_reg) ;
//write html strings to files
fileNamePath = 'data/txt/' + key + '_dipl_html.txt' ;    //data/txt/Bae_TB_8_dipl_html.txt  
fs.writeFileSync(fileNamePath, html_str ) ;  
   