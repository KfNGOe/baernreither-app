// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');

var convert = require('xml-js');
var i_N = 0 ;
var N = 0 ;
var i_level = 0 ;
var i_startTag = 0 ; 
var i_endTag = 0 ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);

function getObject(obj) {
   let length = Object.keys(obj).length ;
   console.log('object length =', length) ;
   console.log('first object key  =', Object.keys(obj)[0]) ;

   //start tag + 1
   //no declaration or instruction
   if(Object.keys(obj)[0] !== 'declaration' && obj['type'] !== 'instruction') {
      if('attributes' in obj) {      
      } else {
         obj['attributes'] = {} ;      
      }
      i_startTag++ ;
      obj['attributes']['startTagNr'] = i_startTag ;
      obj['attributes']['level'] = i_level ;
   }


   Object.keys(obj).forEach((key) => {
      console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
         case 'declaration':
            console.log('declaration = ', obj[key]) ;
            break ;
         case 'instruction':
            console.log('instruction = ', obj[key]) ;
            break ;
         case 'elements':
            console.log('elements = ',obj[key]) ;
            if(Array.isArray(obj[key])) {
               console.log('Hello elements array') ;
               getArray(obj[key]) ;               
            } else {
               console.log(obj.constructor.name, 'property is not an array: ', key) ;
            }
            break ;            
         case 'attributes':
            console.log('attributes =  ', obj[key]) ;            
            break ;         
         case 'type':
            console.log('result: ',obj[key]) ;
            break ;
         case 'name':
            console.log('result: ',obj[key]) ;
            break ;
         case 'text':
            console.log('result: ',obj[key]) ;
            break ;
         case 'comment':
            console.log('comment = ', obj[key]) ;            
            break ;
         default:
            console.log('no case') ;
            break ;
      } 
   }) ;
   
   //end tag + 1 if level = level of start tag and if elements exist
   //no declaration or instruction
   if(Object.keys(obj)[0] !== 'declaration' && obj['type'] !== 'instruction') {
      if(obj['attributes']['level'] === i_level) {
         if('elements' in obj) {
            i_endTag = i_startTag ;            
            i_endTag++ ;
            i_startTag = i_endTag ;
            obj['attributes']['endTagNr'] = i_endTag ;      
         } else {
            if('endTagNr' in obj['attributes']) {
               delete obj['attributes']['endTagNr'] ;
            }
         }
      }
   }
      
} ; 

function getArray(arr) {
   let length = arr.length ;   
   console.log('array length =', length) ;

//level + 1
   arr.forEach((item, index, array) => {
      if (typeof item === 'object') {
         console.log('item = ', item, ', index = ', index) ;          
         getObject(item) ;
      }
   }) ;
//level - 1

} ;

var xml = fs.readFileSync('data/tei_xmlId/Tagebuch_Baernreither_8.xml', 'utf8');
console.log('tei data read: ', xml.length, ' bytes')

var xmlJs = convert.xml2js(xml, {compact: false, spaces: 2}) ;
console.log('xmlJs = ', xmlJs) ;

getObject(xmlJs) ;
if (i_startTag > i_endTag) {
   N = i_startTag ;
} else {
   N = i_endTag ;
}
console.log('N = ', N) ;
i_startTag, i_endTag = 0 ;

//write xml file
/*
xml = convert.js2xml(xmlJs, {compact: false, spaces: 2}) ;
fs.writeFileSync('./data/tei_xmlId/test.xml', xml ) ;
console.log('xml data written: ', xml.length, ' bytes')
*/

//write json file
var xmlJsString = JSON.stringify(xmlJs);
fs.writeFileSync('./data/json_tag/Tagebuch_Baernreither_8.json', xmlJsString ) ;
console.log('json data written: ', xmlJsString.length, ' bytes')


