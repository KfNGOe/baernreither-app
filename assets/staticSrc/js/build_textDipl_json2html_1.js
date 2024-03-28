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
   //return uid.rnd() + '_' + item.pos.value ;
   return item.pos.value ;
}

function buildDiplText(obj, obj_1) {   
   html_str = '' ; 
   //find tei:body
    if (obj.head !== undefined) {        
        obj.results.bindings.forEach((item, index, array) => {
            if (typeof item === 'object') {                
                if (item.name !== undefined) {
                    if (item.name.value == 'http://www.tei-c.org/ns/1.0/body' 
                        && item.type.value == 'https://github.com/KfNGOe/kfngoeo#StartTag') {
                        pos_body = item.pos.value ;                        
                    }
                    if (item.name.value == 'http://www.tei-c.org/ns/1.0/TEI' 
                        && item.type.value == 'https://github.com/KfNGOe/kfngoeo#StartTag'
                        && item.attr.value == 'xmlns') {
                        title_short = item.pos.value.substring(0, item.pos.value.length - 2) ;
                    }
                }                
            }
        }) ;
        console.log('pos_body = ', pos_body) ;
        console.log('title_short = ', title_short) ; 
        //BIND(xsd:integer(SUBSTR(?o_pos_ch_end,strlen(?title_short)+2)) AS ?end_nr_ch)       
    }
    groupedByPos = obj.results.bindings.groupBy( item => {        
        return item.pos.value ;
     }) ;
     /*
     groupedByStartPos = obj_1.results.bindings.groupBy( item => {
         return item.start.value ;
     }) ;
     groupedById = obj_1.results.bindings.groupBy( item => {
         return item.id.value ;
     }) ;
     */
   //iterate over pos
   Object.keys(groupedByPos).forEach((key) => {
      //console.log('key = ', key) ;
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
//let json_in = fs.readFileSync('./data/json/annoTextComp_1-2.json', 'utf8') ;
let json_in_comp = '{}' ;
console.log(json_in_comp) ;
//console.log('json data read: ', json_in.length, ' bytes') ;
//convert json to js object
let jsonJs_in_comp = JSON.parse(json_in_comp) ;

//read json dipl directory
let jsonFiles = fs.readdirSync('data/json/dipl/') ;
console.log('json files: ', jsonFiles) ;

//iterate over source files
jsonFiles.forEach((file) => {
   //read dipl text json files
   let fileNamePath = 'data/json/dipl/' + file ;   
   let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
   console.log('json data read: ', json_in.length, ' bytes') ;
   let jsonJs_in_dipl = JSON.parse(json_in) ;
   buildDiplText(jsonJs_in_dipl, jsonJs_in_comp) ;
   //write html strings to files
   fileNamePath = 'data/txt/' + file.replace('.json', '_html.txt') ;    //data/txt/Bae_TB_8_dipl_html.txt  
   fs.writeFileSync(fileNamePath, html_str ) ;  
   //convert html strings to html 
   console.log('text data written: ', html_str.length, ' bytes')
   let html = $.parseHTML(html_str) ;   
   $('html').find('body').append('<div id="' + key + '"></div>') ;    
   $('html').find('body').children('div:last-child').append(html) ;   
}) ;

//write html file
let fileNamePath = 'html/compRes.html' ;    //data/txt/Bae_TB_8_dipl_html.txt
fs.writeFileSync(fileNamePath, dom.serialize() ) ;
console.log('html data written: ', dom.serialize().length, ' bytes') ;