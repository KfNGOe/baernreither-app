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

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_txt=process.env.filepath_out_txt ;

function buildFullText(obj) {   
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
         case 'results':
            console.log('results = ', key) ;
            let item = obj[key] ;
            buildFullText(item) ;
            break ;
         case 'bindings':
            if(Array.isArray(obj[key])) {               
               //level + 1
               obj[key].forEach((item, index, array) => {
                  if (typeof item === 'object') {
                     //console.log('item = ', item, ', index = ', index) ;          
                     buildFullText(item) ;
                  }
               }) ;
            } else {
               //console.log(obj.constructor.name, 'property is not an array: ', key) ;
            }
            //console.log('bindings = ', obj[key]) ;
            break ;
         case 'o_txt':
            //console.log('o_txt = ', obj[key]) ;
            fullText = fullText.concat(obj[key].value) ;
            //console.log('fullText = ', fullText) ;            
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
} ; 

//read full text json file
let json_in = fs.readFileSync(filepath_in_json, 'utf8'); // ./data/json/text/fullText.json

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

buildFullText(jsonJs_in) ;

//write tei file
fs.writeFileSync(filepath_out_txt, fullText ) ;  //./data/tei/register/register_place.xml
