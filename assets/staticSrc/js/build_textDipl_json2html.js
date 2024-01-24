// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { exit } = require("process") ;

var convert = require('xml-js') ;
var i_N = 0 ;
var N = 0 ;
var i_level = 0 ;
var i_startTag = 0 ; 
var i_endTag = 0 ;
var fullText = '' ;
var pos_body = 0 ;
var title_short = '' ;
var groupedByPos = {} ;
var allPos = [] ;
var html = '' ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`<div id="content"></div>`);
const $ = require('jquery')(dom.window) ;
//dom = <html><head></head><body><div id="content"></div></body></html>
$('div[id="content"]').append('<div>test</div>') ;
html = $('div[id="content"]').html() ;
//console.log('html = ', html) ;

// Importing the jquery and providing it
// with the window
//const jquery = require("jquery")(dom.window);

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_txt=process.env.filepath_out_txt ;

function buildDiplText(obj) {   
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
    }
    groupedByPos = obj.results.bindings.groupBy( item => {        
        return item.pos.value ;
     }) ;    
    allPos = Object.keys(groupedByPos) ;
    //allPos.sort() ;        
    allPos.forEach((key) => {
        console.log('key = ', key) ;
        if (key === pos_body) {
            //console.log('key = ', key) ;
            groupedByPos[key].forEach((item, index, array) => {
                console.log('item = ', item) ;
                switch(item.name.value) {
                     case 'http://www.tei-c.org/ns/1.0/p': 
                        fullText = fullText.concat('<p>') ;
                        break ;
                     default:
                        break ;
                  }

            }) ;
        }
    }) ;
            
     //iterate over pos
     Object.keys(groupedByPos).forEach((key) => {
        console.log('key = ', key, ', value = ', groupedByPos[key]) ;
     } ) ;
    /*
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
         case 'results':
            console.log('results = ', key) ;
            let item = obj[key] ;
            buildDiplText(item) ;
            break ;
         case 'bindings':
            if(Array.isArray(obj[key])) {               
               //level + 1
               obj[key].forEach((item, index, array) => {
                  if (typeof item === 'object') {
                     //console.log('item = ', item, ', index = ', index) ;          
                     buildDiplText(item) ;
                  }
               }) ;
            } else {
               //console.log(obj.constructor.name, 'property is not an array: ', key) ;
            }
            //console.log('bindings = ', obj[key]) ;
            break ;
         case 'pos':
            console.log('pos = ', obj[key].value) ;
            if (obj[key].value > pos_body) {
                console.log('pos = ', obj[key].value) ;
                fullText = fullText.concat(obj[key].value) ;
            }
            
            break ;
         case 'o_txt':
            console.log('o_txt = ', obj[key]) ;
            fullText = fullText.concat(obj[key].value) ;
            console.log('fullText = ', fullText) ;            
            break ;
         case 'text':
            obj[key] = obj[key].replace(/\n\s+$/g, '') ;            
            //console.log('result: ',obj[key]) ;
            break ;         
         default:
            console.log('no case') ;
            break ;
      } 
   }) ;
   */
} ; 


//read full text json file
let json_in = fs.readFileSync('./data/json/textDipl.json', 'utf8'); // ./data/json/fullText.json
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

buildDiplText(jsonJs_in) ;

//write tei file
fs.writeFileSync(filepath_out_txt, fullText ) ;  //./data/tei/register/register_place.xml
console.log('text data written: ', fullText.length, ' bytes')