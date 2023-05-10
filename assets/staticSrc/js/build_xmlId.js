/*
better?:
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
*/

// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
var convert = require('xml-js');
var i_xmlId = 0 ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const $ = require("jquery")(dom.window);

function getObject(obj) {
   console.log('i_xmlId = ', i_xmlId) ;     
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
               getArray(obj[key]) ;               
            } else {
               console.log(obj.constructor.name, 'property is not an array: ', key) ;
            }
            break ;            
         case 'attributes':
            console.log('attributes =  ', obj[key]) ;
            if (typeof obj[key] === 'object') {               
               if ('xml:id' in obj[key]) {
                  console.log('xml:id = ', obj[key]["xml:id"]) ;
                  //delete old xml:id ;
                  delete obj[key]["xml:id"] ;                  
               } else {
                  console.log('xml:id not found') ;
               }
               //add new xml:id
               obj[key]["xml:id"] = i_xmlId_str ;
               console.log('attributes = ', obj[key]) ;
            } else {
               console.log(obj.constructor.name, 'property is not an object: ', key) ;
            }
            break ;         
         case 'type':
            console.log('result: ',obj[key]) ;
            switch (obj[key]) {
               case 'element':
                  //xmlId + 1 ; 
                  i_xmlId++ ;
                  i_xmlId_str = '' + titleShort + '_' + i_xmlId ;
                  if('attributes' in obj) {
                     console.log('attributes = ', obj.attributes) ;                  
                  } else {
                     console.log('attributes not found') ;
                     //create attributes object                  
                     obj.attributes = {} ;
                     console.log('attributes = ', obj.attributes) ;
                     //add xml:id
                     obj.attributes["xml:id"] = i_xmlId_str ;
                     console.log('attributes = ', obj.attributes) ;
                  }
                  break ;
               case 'text':                  
                  console.log('text = ', obj[key]) ;                  
                  break ;
                  Comment
               case 'comment':
                  console.log('comment = ', obj[key]) ;                  
                  break ;
               default:
                  console.log('no case') ;
                  break ;                  
            }                      
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
   console.log('i_xmlId = ', i_xmlId) ;     
   let length = arr.length ;   
   console.log('array length =', length) ;
   arr.forEach((item, index, array) => {
      if (typeof item === 'object') {
         console.log('item = ', item, ', index = ', index) ;          
         getObject(item) ;
      }
   }) ;   
} ;

var xml = fs.readFileSync('data/tei/Tagebuch_Baernreither_8.xml', 'utf8');
console.log('tei data read: ', xml.length, ' bytes') ;

xmlDoc = $.parseXML( xml ),
$xml = $( xmlDoc ),
titleShort = $xml.find( "[type='short']" ).text();
//$titleAttr = $title.attr('type') ;
console.log('title = ', titleShort) ;

var xmlJs = convert.xml2js(xml, {compact: false, spaces: 2});

//start with xml:id = 0
getObject(xmlJs) ;

//write xml file
xml = convert.js2xml(xmlJs, {compact: false, spaces: 2}) ;
fs.writeFileSync('./data/tei_xmlId/Tagebuch_Baernreither_8.xml', xml ) ;
console.log('xml data written: ', xml.length, ' bytes')

//write json file
var xmlJsString = JSON.stringify(xmlJs);
fs.writeFileSync('./data/json/Tagebuch_Baernreither_8.json', xmlJsString ) ;
console.log('json data written: ', xmlJsString.length, ' bytes')
