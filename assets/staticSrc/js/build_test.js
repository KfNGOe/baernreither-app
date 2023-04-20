// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

var convert = require('xml-js');
var stmtsList = {} ;
var stmts = {} ;
var stmt = {
   "subject": "",
   "predicate": "",
   "object": "",
} ;
var prefInstance = "kfngoei:" ;
var prefOntology = "kfngoeo:" ;
var prefTei = "tei:" ;
var bnAttr = "_:attr" ;
var i_stmt = 0 ;
var N = 0 ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);

/////////////////////////// Functions ///////////////////////////

function buildStmt( subj, pred, obj ) {
   stmt.subject = subj ;
   stmt.predicate = pred ;
   stmt.object = obj ;   
}

function buildStmts( n ) {
   stmts[n] = stmt ;
}

function buildStmtsList( n ) {
   stmtsList[n] = stmts ;
}

function buildAttrStmt( obj ) {
   let objAttr = obj.attributes ;
   let length = Object.keys(objAttr).length ;
   Object.keys(objAttr).forEach((key) => {
      console.log('key = ', key, ', value = ', objAttr[key]) ;
      switch(key) {
         case 'xml:id':
            console.log('xml:id = ', objAttr[key]) ;
            let i_attr = i_stmt
            buildStmt( resourceIri, prefOntology + 'hasAttr', bnAttr + i_attr ) ;
            console.log( 'stmt = ', stmt ) ;
            buildStmts( i_stmt ) ;
            console.log( 'stmts = ', stmts ) ;
            i_stmt++ ;
            buildStmt( bnAttr + i_attr, prefOntology + 'attrName', key ) ;
            console.log( 'stmt = ', stmt ) ;
            i_stmt++ ;
            buildStmts( i_stmt ) ;
            console.log( 'stmts = ', stmts ) ;
            
            break ;
         case 'startTagNr':
            console.log('startTagNr = ', objAttr[key]) ;
            break ;
         case 'endTagNr':
            console.log('endTagNr = ', objAttr[key]) ;
            break ;
         case 'level':
            console.log('type = ', objAttr[key]) ;
            break ;                           
         default:
            console.log('no case') ;
            break ;
      }
   }) ;
}

function buildElementStmt( obj ) {
   let resourceIri = prefInstance + uuidv4() ;
   console.log( 'resourceIri = ', resourceIri ) ;

   //build tag type statement
   buildStmt( resourceIri, 'a', prefOntology + 'startTag' ) ;
   console.log( 'stmt = ', stmt ) ;
   buildStmts( i_stmt ) ;
   i_stmt++ ;
   console.log( 'stmts = ', stmts ) ;
   //build element name statement
   buildStmt( resourceIri, prefOntology + 'elementName', prefTei + obj['name'] ) ;
   buildStmts( i_stmt ) ;
   i_stmt++ ;
   //build element attributes statement   
   buildAttrStmt( obj ) ;
   
   //check single tag
   if ('endTagNr' in obj['attributes']) {
      //console.log('endTagNr = ', obj['attributes']['endTagNr']) ;
      
      //build end tag statement
   }
   
}

function buildTextStmt( obj ) {

}

function buildCommentStmt( obj ) {

}

function buildRdfJs( obj ) {
   switch( obj['type'] ) {
      case 'element':
         console.log( 'element = ', obj['name'] ) ;
         buildElementStmt(obj) ;
         break ;
      case 'text':
         console.log( 'text = ', obj['text'] ) ;
         buildTextStmt(obj) ;
         break ;
      case 'comment':
         console.log( 'comment = ', obj['comment'] ) ;
         buildCommentStmt(obj) ;
         break ;
      default:
         console.log( 'no case' ) ;
         break ;
   }
}

function getObject(obj) {
   let length = Object.keys(obj).length ;
   console.log('object length =', length) ;
   console.log('first object key  =', Object.keys(obj)[0]) ;
   
   if(obj['name'] === 'TEI') {
      buildRdfJs(obj) ;
   }   

   Object.keys(obj).forEach((key) => {
      console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {         
         case 'elements':
            console.log('elements = ',obj[key]) ;
            if(Array.isArray(obj[key])) {
               console.log('Hello elements array') ;
               getArray(obj[key]) ;               
            } else {
               console.log(obj.constructor.name, 'property is not an array: ', key) ;
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
            //console.log('no case') ;
            break ;
      } 
   }) ;
      
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

//////////////////////////////////////////////////////


var json = fs.readFileSync('data/json_tag/Tagebuch_Baernreither_8.json', 'utf8');
console.log('json data read: ', json.length, ' bytes')

var jsonJs = JSON.parse(json) ;
console.log('jsonJs = ', jsonJs) ;

//get N
getObject(jsonJs) ;
console.log('N = ', N) ;

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

