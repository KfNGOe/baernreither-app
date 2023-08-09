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
// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);
// Importing the jquery and providing it
// with the window
const $ = require("jquery")(dom.window);

const path_in_tei=process.env.path_in_tei 
const path_out_json=process.env.path_out_json
const path_out_tei=process.env.path_out_tei
const filename = process.env.file; 
const ext_xml=process.env.ext_xml
const ext_json=process.env.ext_json

var i_xmlId = 0 ;
var i_xmlId_new = 0 ;
var i_elements = 0 ;

function getObject(obj) {
   ////console.log('i_xmlId = ', i_xmlId) ;     
   let length = Object.keys(obj).length ;
   //console.log('object length =', length) ;
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
         case 'declaration':
            //console.log('declaration = ', obj[key]) ;
            break ;
         case 'instruction':
            //console.log('instruction = ', obj[key]) ;
            break ;
         case 'elements':
            //console.log('elements = ',obj[key]) ;
            if(Array.isArray(obj[key])) {               
               getArray(obj[key]) ;               
            } else {
               //console.log(obj.constructor.name, 'property is not an array: ', key) ;
            }
            break ;            
         case 'attributes':
            //console.log('attributes =  ', obj[key]) ;
            if (typeof obj[key] === 'object') {               
               if ('xml:id' in obj[key]) {
                  //console.log('xml:id = ', obj[key]["xml:id"]) ;
                  //delete old xml:id ;
                  //delete obj[key]["xml:id"] ;
                  //check if xml:id is empty
                  if (Object.keys(obj[key]).length === 0) {
                     //console.log('attributes is empty') ;
                     obj[key]["xml:id"] = i_xmlId_str ;
                  } else {
                     //console.log('attributes is not empty') ;
                  }
               } else {
                  //console.log('xml:id not found') ;
                  //add new xml:id
                  obj[key]["xml:id"] = i_xmlId_str ;
               }
               
               //console.log('attributes = ', obj[key]) ;
            } else {
               //console.log(obj.constructor.name, 'property is not an object: ', key) ;
            }
            break ;         
         case 'type':
            //console.log('result: ',obj[key]) ;
            switch (obj[key]) {
               case 'element':
                  //number of tei elements + 1                  
                  i_elements++ ;
                  //xmlId + 1 ; 
                  i_xmlId++ ;
                  i_xmlId_str = '' + titleShort + '_' + i_xmlId ;
                  if('attributes' in obj) {
                     //console.log('attributes = ', obj.attributes) ;                  
                  } else {
                     //number of new xml:id + 1
                     i_xmlId_new++ ;
                     //console.log('attributes not found') ;
                     //create attributes object                  
                     obj.attributes = {} ;
                     //console.log('attributes = ', obj.attributes) ;
                     //add xml:id
                     obj.attributes["xml:id"] = i_xmlId_str ;
                     //console.log('attributes = ', obj.attributes) ;
                  }
                  break ;
               case 'text':                  
                  //console.log('text = ', obj[key]) ;                  
                  break ;                  
               case 'comment':
                  //console.log('comment = ', obj[key]) ;                  
                  break ;
               default:
                  //console.log('no case') ;
                  break ;                  
            }                      
            break ;
         case 'name':
            //console.log('result: ',obj[key]) ;
            break ;
         case 'text':
            //console.log('result: ',obj[key]) ;            
            break ;
         case 'comment':
            //console.log('comment = ', obj[key]) ;            
            break ;
         default:
            //console.log('no case') ;
            break ;
      } 
   }) ;   
} ; 

function getArray(arr) {
   //console.log('i_xmlId = ', i_xmlId) ;     
   let length = arr.length ;   
   //console.log('array length =', length) ;
   arr.forEach((item, index, array) => {
      if (typeof item === 'object') {
         //console.log('item = ', item, ', index = ', index) ;          
         getObject(item) ;
      }
   }) ;   
} ;
//read xml file
var filepath = path_in_tei + filename + ext_xml ;
console.log(filepath);
var xml = fs.readFileSync(filepath, 'utf8');
console.log('tei data read: ', xml.length, ' bytes') ;

xmlDoc = $.parseXML( xml ),
$xml = $( xmlDoc ),
titleShort = $xml.find( "[type='short']" ).text();
//$titleAttr = $title.attr('type') ;
//console.log('title = ', titleShort) ;

var xmlJs = convert.xml2js(xml, {compact: false, spaces: 2});

//start with xml:id = 0
getObject(xmlJs) ;

//write xml file
filepath = path_out_tei + filename + ext_xml ;
console.log(filepath);
xml = convert.js2xml(xmlJs, {compact: false, spaces: 2}) ;
fs.writeFileSync(filepath, xml ) ;
console.log('xml data written: ', xml.length, ' bytes')

//write json file
filepath = path_out_json + filename + ext_json ;
console.log(filepath);
var xmlJsString = JSON.stringify(xmlJs);
fs.writeFileSync(filepath, xmlJsString ) ;
console.log('json data written: ', xmlJsString.length, ' bytes')
