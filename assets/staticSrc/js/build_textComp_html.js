// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const ShortUniqueId = require('short-unique-id');
const { exit } = require("process") ;

var convert = require('xml-js') ;
const { group } = require("console");
const { includes } = require("core-js/core/array");
var i_N = 0 ;
var N = 0 ;
var i_level = 0 ;
var i_startTag = 0 ; 
var i_endTag = 0 ;
var fullText = '' ;
var pos_body = 0 ;
var title_short = '' ;
var groupedBySource = {} ;
var allPos = [] ;
var html = '' ;
var html_str = '<div id="content"></div>' ;
var appStack = {
   'start': '',
   'end': ''
} ;

// Creating a window with a document
const dom = new jsdom.JSDOM() ;
const $ = require('jquery')(dom.window) ;
console.log('dom = ', dom.serialize()) ;
//dom =  <html><head></head><body></body></html>
//$('div[id="content"]').append('<div>test</div>') ;
//html = $('div[id="content"]').html() ;

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
   return uid.rnd() + '_' + item.pos.value ;
}

function buildDiplText(obj, obj_1) {   
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
     groupedByAnchApp = obj_1.results.bindings.groupBy( item => {
         return item.start.value ;
     }) ;
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
                     html_str = html_str.concat('<a href="#" id="comp_' + generateId(item) + '"><img src="images/anchor.png" title="click"></a>') ;                           
                     /*
                     if (appStack.start == '' || appStack.end == '') {
                        let pos_arr = groupedByAnchApp[posStr2Nr(item.pos.value).toString()] ;
                        if (pos_arr !== undefined) {
                           appStack.start = pos_arr[0].start.value ;
                           appStack.end = pos_arr[0].end.value ;
                           html_str = html_str.concat('<span class="comp-passage" style="display: none">') ;
                        } else {
                           console.log('pos anchor not in annoTextComp : ', posStr2Nr(item.pos.value).toString()) ;
                        }                              
                     }*/
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
               let item_hit = obj_1.results.bindings.find((item_1, index_1, array_1) => {
                  //console.log('item_1 = ', item_1) ;
                  //check if same text source
                  let flag_source = (item.pos.value.includes(item_1.source_target.value)) ? true : false ;                        
                  return (+item_1.start.value < posStr2Nr(item.pos.value)) && (posStr2Nr(item.pos.value) < +item_1.end.value && flag_source) ;
               }) ;
               if (item_hit !== undefined) {
                  //console.log('item_hit = ', item_hit) ;
                  html_str = html_str.concat('<span class="comp-passage" id="comp_' + generateId(item) + '">') ;                           
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

function setRefValue(anchorSource, anchorRefSource, anchorId_pos_nr, anchorRef_pos_nr) {
   
   $('html').find('body').children('div').each(function() {
      //console.log('this = ', this) ;
      let attrId = $(this).find('a').attr('id') ;
      console.log('attrId = ', attrId) ;
      
      if (attrId.includes(anchorSource)) {
         $(this).find('a').each(function() {
            console.log('this = ', $(this).attr('id')) ;
            if ($(this).attr('id').includes('comp_') && $(this).attr('id').includes(anchorId_pos_nr) ) {
               $(this).attr('href', '#comp_' + anchorRef_pos_nr) ;
            }            
         }) ;
         $(this).find('a').attr('href', '#comp_' + anchorRef_pos_nr) ;
         
      }            
   }) ; 
} ;   

//read text comparison data
let json_in = fs.readFileSync('./data/json/annoTextComp_1-2.json', 'utf8');
console.log('json data read: ', json_in.length, ' bytes') ;
//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

groupedBySource = jsonJs_in.results.bindings.groupBy( item => {        
    return item.source_target.value ;
 }) ;
 //collect the html partials of the works into one html dom
 Object.keys(groupedBySource).forEach((key) => {
      console.log('key = ', key) ;
      let fileNamePath = 'data/txt/' + key + '_dipl_html.txt' ;    //data/txt/Bae_TB_8_dipl_html.txt  
      console.log('filename = ', fileNamePath) ;
      //let html_str = fs.readFileSync(fileNamePath, 'utf8') ;
      let html_str = '<div><a href="" id="comp_r6TJeVlGl9_Bae_TB_8_130">test</a>test<a href="" id="comp_r6TJeVlGl9_Bae_TB_8_140">test</a></div>';
      let html = $.parseHTML(html_str) ;      
      $('html').find('body').append('<div></div>') ;
      $('html').find('body').children('div:last-child').append(html) ;      
 }) ;
//console.log('html = ', dom.serialize()) ;

//iterate over text compare annotations
jsonJs_in.results.bindings.forEach((item, index, array) => {   
   let sourceBody = item.source_body.value ;   
   groupedById = jsonJs_in.results.bindings.groupBy( item => {        
      return item.id.value ;
   }) ;   
   if (groupedById[sourceBody] !== undefined) {
      let anchorSource = item.source_target.value ;
      let anchorRefSource = groupedById[sourceBody][0].source_target.value ;
      let anchorId_pos_nr = item.start.value ;
      let anchorRef_pos_nr = groupedById[sourceBody][0].start.value ; 
      setRefValue(anchorSource, anchorRefSource, anchorId_pos_nr, anchorRef_pos_nr) ;   
   }

} ) ; 

//buildDiplText(jsonJs_in, jsonJs_in_1) ;

let test_html = dom.serialize() ;

//write tei file
//fs.writeFileSync('html/synoptik.html', synoptik_html ) ;
fs.writeFileSync('data/html/test.html', test_html ) ;  
console.log('text data written: ', test_html.length, ' bytes')