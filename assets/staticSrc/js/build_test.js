// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');

var convert = require('xml-js');
var N = 0 ;

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
      
} ; 

function getArray(arr) {
   let length = arr.length ;   
   console.log('array length =', length) ;

   arr.forEach((item, index, array) => {
      if (typeof item === 'object') {
         console.log('item = ', item, ', index = ', index) ;
         //get root elemtent
         if(item['name'] === 'TEI') {               
            N = item['attributes']['endTagNr'] ;
         }         
      }
   }) ;
} ;

var json = fs.readFileSync('data/json_tag/Tagebuch_Baernreither_8.json', 'utf8');
console.log('json data read: ', json.length, ' bytes')

var jsonJs = JSON.parse(json) ;
console.log('jsonJs = ', jsonJs) ;

//get N
getArray(jsonJs['elements']) ;
console.log('N = ', N) ;

for (i = 1; i <= N; i++) {
   console.log('i = ', i) ;
   //get object
   getObject(jsonJs['elements'][i]) ;
}

//write xml file
/*
xml = convert.js2xml(xmlJs, {compact: false, spaces: 2}) ;
fs.writeFileSync('./data/tei_xmlId/test.xml', xml ) ;
console.log('xml data written: ', xml.length, ' bytes')
*/
//write json file
/*
var xmlJsString = JSON.stringify(xmlJs);
fs.writeFileSync('./data/json/Tagebuch_Baernreither_8.json', xmlJsString ) ;
console.log('json data written: ', xmlJsString.length, ' bytes')
*/

