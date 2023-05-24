const { groupBy } = require("core-js/actual/array/group-by") ;
// Importing the jsdom module
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const date = new Date() ;
console.log(date);

var prefInstance = "kfngoei:" ;
var prefOntology = "kfngoeo:" ;

const dateMod = '"' + date.toISOString() + '"' ;
const lic = '<http://creativecommons.org/publicdomain/zero/1.0/>' ;
const src = '<http://d-nb.info/standards/elementset/gnd#>' ;

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

var label_en = '""' ;
var label_de = '""' ;
var prefName = '""' ;
var forename = '""' ;
var surname = '""' ;
var nameAdd = '""' ;
var gender = '""' ;
var birth = '""' ;
var death = '""' ;
var bio = '""' ;
var propVal_gnd = '""' ;
var propVal_cc = '""' ;

const prefix =   "@prefix kfngoeo: <https://github.com/KfNGOe/kfngoeo#> ." + LF 
               + "@prefix kfngeoi: <https://github.com/KfNGOe/kfngeoi/> ." + LF               
               + "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ." + LF
               + "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> ." + LF
               + "@prefix gndo: <http://d-nb.info/standards/elementset/gnd#> ." + LF
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
   } else {
      obj.D = '' ;
   }
   if ('E' in obj) {
   } else {
      obj.E = '' ;
   }
   if ('F' in obj) {      
      obj.F = convertChar2Html(obj.F) ;
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
   if ('I' in obj) {
   } else {
      obj.I = '' ;
   }
   if ('J' in obj) {
   } else {
      obj.J = '' ;
   }
}

function getPrefName(obj) {
   //build preferred name
   if(obj.A != '') {
      if (obj.C != '' || obj.B != '') {
         if (obj.C != '') {
            if (obj.B != '') {
               prefName = obj.A + COMMA + obj.C + SPACE + obj.B ;            
            } else {
               prefName = obj.A + COMMA + obj.C ;
            }             
         } else {
            prefName = obj.A + SPACE + obj.B ;
         }
      }
      else {
         prefName = obj.A ;       
      }
   } else {
      if (obj.C != '' || obj.B != '') {
         if (obj.C != '') {
            if (obj.B != '') {
               prefName = obj.C + SPACE + obj.B ;            
            } else {
               prefName = obj.C ;
            }             
         } else {
            prefName = obj.B ;
         }
      }
      else {
         prefName = '' ;       
      }
   }
}

function getObject(obj) {
   let length = Object.keys(obj).length ;
   console.log('object length =', length) ;
   resourceIri = prefInstance + uuidv4() ;
   //console.log( 'resourceIri = ', resourceIri ) ;
   checkKeys(obj) ;
   getPrefName(obj) ;
   
   var ttl_tmp = '' ;
   ttl_tmp = ttl_tmp + resourceIri + LF ;
   ttl_tmp = ttl_tmp + TAB + 'a' + SPACE + prefOntology + 'Person' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'modified' + SPACE + dateMod + '^^xsd:dateTime' + SEMICOLON + LF ; 
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'license' + SPACE + lic + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'source' + SPACE + src + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'preferredNameEntityForThePerson' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a' + SPACE + prefOntology + 'NameOfThePerson' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'rdfs:label' + SPACE + label_en + '@en' + COMMA + SPACE + QUOT + prefName + QUOT + '@de' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'preferredNameForThePerson' + SPACE + QUOT + prefName + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'forename' + SPACE + QUOT + obj.C + QUOT + '^^xsd:string' + SEMICOLON + LF ;   
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'surname' + SPACE + QUOT + obj.A + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'nameAddition' + SPACE + QUOT + obj.B + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + SEMICOLON + LF ;   
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'gender' + SPACE + gender + SEMICOLON + LF ;  
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'dateOfBirth' + SPACE + QUOT + obj.D + QUOT + '^^xsd:date' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'dateOfDeath' + SPACE + QUOT + obj.E + QUOT + '^^xsd:date' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'biographicalOrHistoricalInformation' + SPACE + QUOT + obj.F + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'identifier' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a' + SPACE + prefOntology + 'PropertyValue' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'propertyID "GND"^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'value' + SPACE + QUOT + obj.G + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + prefOntology + 'identifier' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a' + SPACE + prefOntology + 'PropertyValue' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'propertyID "CamelCase"^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + prefOntology + 'value' + SPACE + QUOT + obj.H + QUOT + '^^xsd:string' + SEMICOLON + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + ' .' + LF + LF ;
   ttl = ttl + ttl_tmp ;
   //console.log('ttl = ', ttl) ;      
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

var json = fs.readFileSync('./data/json_xlsx/Baernreither_Personenregister_2023.json', 'utf8');
console.log('json data read: ', json.length, ' bytes')

var jsonJS = JSON.parse(json) ;
var persons = jsonJS.Tabelle1 ;
//console.log('jsonJS: ', persons[0]) ;
getArray(persons) ;
//console.log('ttl = ', ttl) ;

//write ttl file
//filepath = path_out_ttl + filename + ext_ttl ;
//console.log(filepath);
fs.writeFileSync('./data/ttl/annotation/person/instance/personi.ttl', ttl ) ;
console.log('ttl data written: ', ttl.length  , ' bytes')

//group by gnd
//var personsGND = persons.groupBy(person => {
//    return person.G ;
//}) ;
//console.log('personsGND: ', personsGND) ;
