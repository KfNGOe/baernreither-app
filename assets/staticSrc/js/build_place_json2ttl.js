//convert json to turtle for person register
const { groupBy } = require("core-js/actual/array/group-by") ;
// Importing the jsdom module
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const date = new Date() ;

var prefInstance = "kfngoei:" ;
var prefOntology = "kfngoeo:" ;

const dateMod = '"' + date.toISOString() + '"' ;
const lic = '<http://creativecommons.org/publicdomain/zero/1.0/>' ;
const src_gnd = '<http://d-nb.info/standards/elementset/gnd#>' ;
const src_gn = '<https://www.geonames.org/ontology#>' ;

const LF = "\n" ;
const TAB = "\t" ;
const COMMA = ", " ;
const DOT = " ." ;
const SEMICOLON = " ;" ;
const SPACE = " " ;
const QUOT = '"' ;
const SQBRACKET_OPEN = "[" ;
const SQBRACKET_CLOSE = "]" ;
const BN = "_:" ;
const NaN = 'NaN' ;

var label_en = '""' ;
var label_de = '""' ;
var prefName = '""' ;
var bio = '""' ;
var propVal_gnd = '' ;
var propVal_gn = '' ;

const prefix =   "@prefix kfngoeo: <https://github.com/KfNGOe/kfngoeo#> ." + LF 
               + "@prefix kfngoei: <https://github.com/KfNGOe/kfngoei/> ." + LF               
               + "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ." + LF
               + "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> ." + LF
               + "@prefix gndo: <http://d-nb.info/standards/elementset/gnd#> ." + LF
               + "@prefix	gn: <https://www.geonames.org/ontology#> ." + LF
            ;
    

var ttl = prefix + LF + LF ;

//convert special characters to html encoding
function convertChar2Html(str) {
   return str.replace(/'/g,"&apos;")       
       .replace(/"/g, "&quot;")
   ;
}

function checkKeys(obj) {
   //test if key exists
   if ('A' in obj) {      
   } else {      
      obj.A = '' ;
   }
   if ('B' in obj) {      
   } else {
      obj.B = '' ;
   }
   if ('C' in obj) {
   } else {
      obj.C = '' ;
   }
   if ('D' in obj) {
      obj.D = convertChar2Html(obj.D) ;
   } else {
      obj.D = '' ;
   }
   if ('E' in obj) {
      propVal_gnd = '' ;
      propVal_gn = '' ;
      if (obj.E.includes('https://d-nb.info/gnd/')) {
         propVal_gnd = obj.E.replace('https://d-nb.info/gnd/', '') ;         
         propVal_gn = '' ;         
      }
      if (obj.E.includes('https://www.geonames.org/')) {
         obj.E = obj.E.replace('https://www.geonames.org/', '') ;
         propVal_gn = obj.E.slice(0, obj.E.indexOf("/")) ;
         propVal_gnd = '' ;
      }
   } else {
      obj.E = '' ;
   }
   if ('F' in obj) {
   } else {      
      obj.F = '' ;
   }
   if ('G' in obj) {      
   } else {
      obj.G = '' ;
   }
   if ('H' in obj) {
   } else {
      obj.H = '' ;
   }   
}

function getObject(obj) {
   let length = Object.keys(obj).length ;
   console.log('object length =', length) ;
   resourceIri = prefInstance + uuidv4() ;
   //console.log( 'resourceIri = ', resourceIri ) ;
   checkKeys(obj) ;   
   
   var ttl_tmp = '' ;
   ttl_tmp = ttl_tmp + resourceIri + LF ;
   ttl_tmp = ttl_tmp + TAB + 'a' + SPACE + prefOntology + 'PlaceOrGeographicName' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + 'rdfs:label' + SPACE + label_en + '@en' + COMMA + SPACE + QUOT + obj.A + QUOT + '@de' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'modified' + SPACE + dateMod + '^^xsd:dateTime' + SEMICOLON + LF ; 
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'license' + SPACE + lic + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'source' + SPACE + src_gn + COMMA + SPACE + src_gnd + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'preferredNameForThePlaceOrGeographicName' + SPACE + QUOT + obj.A + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'hasGeometry' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a' + SPACE + prefOntology + 'Point' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'lat' + SPACE + NaN + '^^xsd:decimal' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'long' + SPACE + NaN + '^^xsd:decimal' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + SEMICOLON + LF ;   
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'biographicalOrHistoricalInformation' + SPACE + QUOT + obj.D + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'identifier' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a' + SPACE + prefOntology + 'PropertyValue' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'propertyID' + SPACE + '"GND"' + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'value' + SPACE + QUOT + propVal_gnd + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'identifier' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a' + SPACE + prefOntology + 'PropertyValue' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'propertyID' + SPACE + '"GN"' + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'value' + SPACE + QUOT + propVal_gn + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'identifier' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a' + SPACE + prefOntology + 'PropertyValue' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'propertyID "CamelCase"^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'value' + SPACE + QUOT + obj.B + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + DOT + LF + LF ;
   ttl = ttl + ttl_tmp ;
   console.log('ttl = ', ttl) ;      
} ; 

function getArray(arr) {
   let length = arr.length ;   
   console.log('array length =', length) ;
   arr.forEach((item, index, array) => {
      if (typeof item === 'object') {
         console.log('index = ', index) ;          
         getObject(item) ;
      }
   }) ;
   //console.log('result: ',arr) ;   
} ;

var json = fs.readFileSync('./data/json_xlsx/place_xlsx.json', 'utf8');

var jsonJS = JSON.parse(json) ;
var persons = jsonJS.Tabelle1 ;
//console.log('jsonJS: ', persons[0]) ;
getArray(persons) ;
//console.log('ttl = ', ttl) ;

//write ttl file
//filepath = path_out_ttl + filename + ext_ttl ;
//console.log(filepath);
fs.writeFileSync('./data/ttl/annotation/place/instance/placei.ttl', ttl ) ;

//group by gnd
//var personsGND = persons.groupBy(person => {
//    return person.G ;
//}) ;
//console.log('personsGND: ', personsGND) ;
