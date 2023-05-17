// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

var convert = require('xml-js');
var stmtsListJs = { "statements": [] } ;
var stmtsList = [] ;
var stmts = [] ;
var stmt = {} ;
var prefInstance = "kfngoei:" ;
var prefOntology = "kfngoeo:" ;
var resourceIri = "" ;
var prefTei = "tei:" ;
var bnAttr = "_:attr" ;
var i_stmt = 1 ;
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
   stmt["subject"] = subj ;
   stmt["predicate"] = pred ;
   stmt["object"] = obj ;   
}

function buildStmts() {   
   stmts.push(stmt) ;
   stmt = {} ;
}

function addStmt( subj, pred, obj ){
   buildStmt( subj, pred, obj ) ;
   console.log( 'stmt = ', stmt ) ;
   buildStmts() ;
   console.log( 'stmts = ', stmts ) ;
   i_stmt++ ;   
}

function addAttrStmt( iri, bn, attrName, attrValue ) {
   let i_attr = i_stmt ;                                    
   addStmt( iri, prefOntology + 'hasAttr', bn + i_attr ) ;   
   addStmt( bn + i_attr, prefOntology + 'attrName', attrName  ) ;   
   addStmt( bn + i_attr, prefOntology + 'attrValue', attrValue ) ;   
}

function buildAttrStmt( obj ) {
   let objAttr = obj.attributes ;
   let length = Object.keys(objAttr).length ;
   Object.keys(objAttr).forEach((key) => {
      console.log('key = ', key, ', value = ', objAttr[key]) ;
      switch(key) {
         case 'xml:id':
            console.log('xml:id = ', objAttr[key]) ;            
            addAttrStmt( resourceIri, bnAttr, key, objAttr[key] ) ;
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
            console.log('attrName = ', key) ;            
            console.log('attrValue = ', objAttr[key]) ;            
            addAttrStmt( resourceIri, bnAttr, key, objAttr[key] ) ;
            break ;
      }
   }) ;
}

function buildStartTagStmts( iri, obj ) {
   //build tag type statement   
   addStmt( iri, 'a', prefOntology + 'StartTag' ) ;   
   //build element name statement   
   addStmt( iri, prefOntology + 'elementName', prefTei + obj['name'] ) ;
   //build element attributes statement   
   buildAttrStmt( obj ) ;
   //build element position statement
   addStmt( iri, prefOntology + 'elementPos', obj['attributes']['startTagNr'] ) ;
   //reset stmt counter   
   i_stmt = 1 ;
}

function buildEndTagStmts( iri, obj ) {
   //build tag type statement   
   addStmt( iri, 'a', prefOntology + 'EndTag' ) ;   
   //build element name statement   
   addStmt( iri, prefOntology + 'elementName', prefTei + obj['name'] ) ;
   //build element attributes statement   
   addAttrStmt( iri, bnAttr, 'xml:id', obj['attributes']['xml:id'] ) ; ;
   //build element position statement
   addStmt( iri, prefOntology + 'elementPos', obj['attributes']['endTagNr'] ) ;
   //reset stmt counter   
   i_stmt = 1 ;
}

function buildStmtsList( index ) {
   stmtsList[index] = stmts ;
   stmts = [] ;
}



function buildElementStmt( obj ) {
   resourceIri = prefInstance + uuidv4() ;
   console.log( 'resourceIri = ', resourceIri ) ;
   
   //build start tag statements
   buildStartTagStmts( resourceIri, obj ) ;
   //build list of statements
   buildStmtsList( obj['attributes']['startTagNr'] - 1 ) ;
   console.log( 'stmtsList = ', stmtsList ) ;

   //check single tag
   if ('endTagNr' in obj['attributes']) {      
      //build end tag statements
      buildEndTagStmts( resourceIri, obj ) ;
      //build list of statements
      buildStmtsList( obj['attributes']['endTagNr'] - 1 ) ;
      console.log( 'stmtsList = ', stmtsList ) ;
   }   
}

function buildTextStmt( obj ) {
   resourceIri = prefInstance + uuidv4() ;
   console.log( 'resourceIri = ', resourceIri ) ;

   //build Text type statement   
   addStmt( resourceIri, 'a', prefOntology + 'Text' ) ;   
   //build text content statement   
   addStmt( resourceIri, prefOntology + 'hasContent', obj['text'] ) ;   
   //build element position statement
   addStmt( resourceIri, prefOntology + 'elementPos', obj['attributes']['startTagNr'] ) ;
   //reset stmt counter   
   i_stmt = 1 ;

   //build list of statements
   buildStmtsList( obj['attributes']['startTagNr'] - 1 ) ;
   console.log( 'stmtsList = ', stmtsList ) ;
}

function buildCommentStmt( obj ) {
   resourceIri = prefInstance + uuidv4() ;
   console.log( 'resourceIri = ', resourceIri ) ;

   //build Text type statement   
   addStmt( resourceIri, 'a', prefOntology + 'Comment' ) ;   
   //build text content statement   
   addStmt( resourceIri, prefOntology + 'hasContent', obj['comment'] ) ;   
   //build element position statement
   addStmt( resourceIri, prefOntology + 'elementPos', obj['attributes']['startTagNr'] ) ;
   //reset stmt counter   
   i_stmt = 1 ;

   //build list of statements
   buildStmtsList( obj['attributes']['startTagNr'] - 1 ) ;
   console.log( 'stmtsList = ', stmtsList ) ;
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
   
   if(Object.keys(obj)[0] !== 'declaration' && obj['type'] !== 'instruction') {   
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

var json = fs.readFileSync('data/json_tei/Tagebuch_Baernreither_8.json', 'utf8');
console.log('json data read: ', json.length, ' bytes')

var jsonJs = JSON.parse(json) ;
console.log('jsonJs = ', jsonJs) ;

//get N
getObject(jsonJs) ;
//build statements list as js object
stmtsListJs['statements'] = stmtsList ;


//write xml file
/*
xml = convert.js2xml(xmlJs, {compact: false, spaces: 2}) ;
fs.writeFileSync('./data/tei_xmlId/test.xml', xml ) ;
console.log('xml data written: ', xml.length, ' bytes')
*/
//write json file

var stmtsListJsString = JSON.stringify(stmtsListJs);
fs.writeFileSync('./data/json_rdf/Tagebuch_Baernreither_8.json', stmtsListJsString ) ;
console.log('json data written: ', stmtsListJsString.length  , ' bytes')