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
   console.log('object length =', length) ;
   Object.keys(obj).forEach((key) => {
      console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
         case 'nnnn':
            console.log('nnnn = ', obj[key]) ;
            break ;
         case 'nnnnn':
            console.log('nnnnn = ',obj[key]) ;
            if(Array.isArray(obj[key])) {
               console.log('Hello, ', obj[key],' is an array') ;
               getArray(obj[key]) ;               
            } else {
               console.log('parsing failed, ', obj[key], ' is not an array') ;
            }
            break ;            
         case 'nnnnnn':
            console.log('nnnnnn =  ', obj[key]) ;
            if (typeof obj[key] === 'object') {                    
               console.log('Hello, ', obj[key], ' is an object') ;
            } else {
               console.log('parsing failed, ', obj[key], ' is not an object') ;
            }
            break ;                  
         default:
            console.log('no case') ;
            break ;
      } 
   }) ;
   //console.log('result', length) ;
} ; 

function getArray(arr) {
   let length = arr.length ;   
   console.log('array length =', length) ;
   arr.forEach((item, index, array) => {
      if (typeof item === 'object') {
         console.log('item = ', item, ', index = ', index) ;          
         getObject(item) ;
      }
   }) ;
   //console.log('result: ',arr) ;   
} ;

var xml = fs.readFileSync('data/tei/Tagebuch_Baernreither_8.xml', 'utf8');
console.log('tei data read: ', xml.length, ' bytes')

var xmlJs = convert.xml2js(xml, {compact: false, spaces: 2});
xmlJs.elements ;
xmlJs.elements[0] ;
//console.log('xmlJs: ', Object.keys(xmlJs).forEach((item) => { console.log(item)})) ;

getObject(xmlJs) ;

var xmlJsString = JSON.stringify(xmlJs);

fs.writeFileSync('./data/json/Tagebuch_Baernreither_8.json', xmlJsString ) ;
        console.log('js data written: ', xmlJsString.length, ' bytes')


