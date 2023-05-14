const { groupBy } = require("core-js/actual/array/group-by") ;
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
            if (typeof obj[key] === 'object') {
               //obj[key]["xml:id"] = 'test' ;
               //console.log('attributes = ', obj[key]) ;
            }
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

var json = fs.readFileSync('data/json_xlsx/Baernreither_Personenregister_2023.json', 'utf8');
console.log('json data read: ', json.length, ' bytes')

var jsonJS = JSON.parse(json) ;
var persons = jsonJS.Tabelle1 ;
console.log('jsonJS: ', persons[0]) ;

//group by gnd
var personsGND = persons.groupBy(person => {
    return person.G ;
}) ;
console.log('personsGND: ', personsGND) ;



//var xmlJsString = JSON.stringify(xmlJs);

//fs.writeFileSync('./data/json/Tagebuch_Baernreither_8.json', xmlJsString ) ;
//        console.log('js data written: ', xmlJsString.length, ' bytes')


