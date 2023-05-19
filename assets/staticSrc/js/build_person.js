const { groupBy } = require("core-js/actual/array/group-by") ;
// Importing the jsdom module
const fs = require('fs');
const date = new Date() ;
console.log(date);

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

var template_ttl = 'kfngoei:nnnnnn' + LF +
                        'a kfngoeo:Person ;' + LF +
                        'kfngoeo:modified' + dateMod + '^^xsd:dateTime ;' + LF +
                        'kfngoeo:license' + lic + ' ;' + LF +
                        'kfngoeo:source' + src + ' ;' + LF +
                        'kfngoeo:preferredNameEntityForThePerson [' + LF +
                           'a kfngoeo:NameOfThePerson ;' + LF +
                           'rdfs:label' + label_en + '@en' + ',' + label_de + '@de ;' + LF +
                           'kfngoeo:preferredNameForThePerson' + prefName + '^^xsd:string ;' + LF +
                           'kfngoeo:forename' + forename + '^^xsd:string ;' + LF +
                           'kfngoeo:surname' + surname + '^^xsd:string ;' + LF +
                           'kfngoeo:nameAddition' + nameAdd + '^^xsd:string ;' + LF +
                        '] ;' + LF +
                        'kfngoeo:gender' + gender + '; ' + LF +  
                        'kfngoeo:dateOfBirth' + birth + '^^xsd:date ;' + LF +
                        'kfngoeo:dateOfDeath' + death + '^^xsd:date ;' + LF +
                        'kfngoeo:biographicalOrHistoricalInformation' + bio + '^^xsd:string ;' + LF +
                        'kfngoeo:identifier [' + LF +
                           'a kfngoeo:PropertyValue ;' + LF +
                           'kfngoeo:propertyID "GND"^^xsd:string ;' + LF +
                           'kfngoeo:value' + propVal_gnd + '^^xsd:string ;' + LF +
                        '] ;' + LF +
                        'kfngoeo:identifier [' + LF +
                           'a kfngoeo:PropertyValue ;' + LF +
                           'kfngoeo:propertyID "CamelCase"^^xsd:string ;' + LF +
                           'kfngoeo:value' + propVal_cc + '^^xsd:string ;' + LF +
                        '] ;' 
                        ;    

var ttl = prefix + LF + LF ;

function getObject(obj) {
   let length = Object.keys(obj).length ;
   console.log('object length =', length) ;
   prefName = obj.A + COMMA + obj.C + SPACE + obj.B ;
   var ttl_tmp = '' ;
   ttl_tmp = ttl_tmp + 'kfngoei:nnnnnn' + LF ;
   ttl_tmp = ttl_tmp + TAB + 'a kfngoeo:Person ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:modified' + SPACE + dateMod + '^^xsd:dateTime ;' + LF ; 
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:license' + SPACE + lic + ' ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:source' + SPACE + src + ' ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:preferredNameEntityForThePerson' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a kfngoeo:NameOfThePerson ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'rdfs:label' + SPACE + label_en + '@en' + COMMA + SPACE + QUOT + prefName + QUOT + '@de ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'kfngoeo:preferredNameForThePerson' + SPACE + QUOT + prefName + QUOT + '^^xsd:string ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'kfngoeo:forename' + SPACE + QUOT + obj.C + QUOT + '^^xsd:string ;' + LF ;   
   ttl_tmp = ttl_tmp + TAB + TAB + 'kfngoeo:surname' + SPACE + QUOT + obj.A + QUOT + '^^xsd:string ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'kfngoeo:nameAddition' + SPACE + QUOT + obj.B + QUOT + '^^xsd:string ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + ' ;' + LF ;   
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:gender' + SPACE + gender + SEMICOLON + LF ;  
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:dateOfBirth' + SPACE + QUOT + obj.D + QUOT + '^^xsd:date ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:dateOfDeath' + SPACE + QUOT + obj.E + QUOT + '^^xsd:date ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:biographicalOrHistoricalInformation' + SPACE + QUOT + obj.F + QUOT + '^^xsd:string ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:identifier' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a kfngoeo:PropertyValue ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'kfngoeo:propertyID "GND"^^xsd:string ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'kfngoeo:value' + SPACE + QUOT + obj.G + QUOT + '^^xsd:string ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + ' ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + 'kfngoeo:identifier' + SPACE + SQBRACKET_OPEN + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'a kfngoeo:PropertyValue ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'kfngoeo:propertyID "CamelCase"^^xsd:string ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + TAB + 'kfngoeo:value' + SPACE + QUOT + obj.H + QUOT + '^^xsd:string ;' + LF ;
   ttl_tmp = ttl_tmp + TAB + SQBRACKET_CLOSE + ' .' + LF + LF ;
   ttl = ttl + ttl_tmp ;
   console.log('ttl = ', ttl) ;
   
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

var json = fs.readFileSync('./data/json_xlsx/Baernreither_Personenregister_2023.json', 'utf8');
console.log('json data read: ', json.length, ' bytes')

var jsonJS = JSON.parse(json) ;
var persons = jsonJS.Tabelle1 ;
//console.log('jsonJS: ', persons[0]) ;
getArray(persons) ;
console.log('ttl = ', ttl) ;

//group by gnd
//var personsGND = persons.groupBy(person => {
//    return person.G ;
//}) ;
//console.log('personsGND: ', personsGND) ;



//var xmlJsString = JSON.stringify(xmlJs);

//fs.writeFileSync('./data/json/Tagebuch_Baernreither_8.json', xmlJsString ) ;
//        console.log('js data written: ', xmlJsString.length, ' bytes')


