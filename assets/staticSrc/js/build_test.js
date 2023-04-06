// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
var convert = require('xml-js');
//var xmlserializer = require('xmlserializer');


// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);
// Appending a paragraph tag to the body

function getObject(obj) {
   let length = Object.keys(obj).length ;
   Object.keys(obj).forEach((subobj) => { console.log(subobj)
      if(subobj === 'elements') {
         console.log('result: ',obj[subobj]) ;

         if(Array.isArray(obj[subobj])) {               
            console.log('Hello elements array') ;            
         } else {
            console.log(obj.constructor.name, 'property is not an array: ', subobj) ;
         }        
      }
/*
      if (typeof obj[subobj] === 'object') {
         getObject(obj[subobj]) ;
      }
      */
   
   }) ;
   //console.log('result', length) ;
} ; 

function getArray(arr) {} ;

var xml = fs.readFileSync('data/tei/Tagebuch_Baernreither_8.xml', 'utf8');
console.log('tei data read: ', xml.length, ' bytes')

var xmlJs = convert.xml2js(xml, {compact: false, spaces: 2});
xmlJs.elements ;
xmlJs.elements[0] ;
//console.log('xmlJs: ', Object.keys(xmlJs).forEach((item) => { console.log(item)})) ;

getObject(xmlJs) ;






/*
var xmlJsString = JSON.stringify(xmlJs);

fs.writeFileSync('./data/json/Tagebuch_Baernreither_8.json', xmlJsString ) ;
        console.log('js data written: ', xmlJsString.length, ' bytes')
*/


