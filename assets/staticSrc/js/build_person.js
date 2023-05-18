const { groupBy } = require("core-js/actual/array/group-by") ;
// Importing the jsdom module
const fs = require('fs');
const date = new Date() ;
console.log(date);

const dateMod = '"' + date.toISOString() + '"' ;
const lic = '<http://creativecommons.org/publicdomain/zero/1.0/>' ;
const src = '<http://d-nb.info/standards/elementset/gnd#>' ;

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

const template_ttl = 'kfngoei:nnnnnn' + 
                        'a kfngoeo:Person ;' +     
                        'kfngoeo:modified' + dateMod + '^^xsd:dateTime ;' +
                        'kfngoeo:license' + lic + ' ;' +
                        'kfngoeo:source' + src + ' ;' +
                        'kfngoeo:preferredNameEntityForThePerson [' +
                           'a kfngoeo:NameOfThePerson ;' +
                           'rdfs:label' + label_en + '@en' + ',' + label_de + '@de ;' +
                           'kfngoeo:preferredNameForThePerson' + prefName + '^^xsd:string ;' +
                           'kfngoeo:forename' + forename + '^^xsd:string ;' +
                           'kfngoeo:surname' + surname + '^^xsd:string ;' +
                           'kfngoeo:nameAddition' + nameAdd + '^^xsd:string ;' +
                        '] ;' +
                        'kfngoeo:gender' + gender + '; ' +
                        'kfngoeo:dateOfBirth' + birth + '^^xsd:date ;' +
                        'kfngoeo:dateOfDeath' + death + '^^xsd:date ;' +
                        'kfngoeo:biographicalOrHistoricalInformation' + bio + '^^xsd:string ;' +
                        'kfngoeo:identifier [' +
                           'a kfngoeo:PropertyValue ;' +
                           'kfngoeo:propertyID "GND"^^xsd:string ;' +
                           'kfngoeo:value' + propVal_gnd + '^^xsd:string ;' +
                        '] ;' +
                        'kfngoeo:identifier [' +
                           'a kfngoeo:PropertyValue ;' +
                           'kfngoeo:propertyID "CamelCase"^^xsd:string ;' +
                           'kfngoeo:value' + propVal_cc + '^^xsd:string ;' +
                        '] ;' 
                        ;    

var ttl = prefix + LF + LF ;
var ttl_tmp = '' ;

function getObject(obj) {
   let length = Object.keys(obj).length ;
   console.log('object length =', length) ;
   ttl_tmp = template_ttl ;
   Object.keys(obj).forEach((key) => {
      console.log('key = ', key, ', value = ', obj[key]) ;           

      switch(key) {
         case 'A':
            console.log('A = ', obj[key]) ;
            surname = obj[key] ;
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

var json = fs.readFileSync('.data/json_xlsx/Baernreither_Personenregister_2023.json', 'utf8');
console.log('json data read: ', json.length, ' bytes')

var jsonJS = JSON.parse(json) ;
var persons = jsonJS.Tabelle1 ;
console.log('jsonJS: ', persons[0]) ;
getArray(persons) ;

//group by gnd
//var personsGND = persons.groupBy(person => {
//    return person.G ;
//}) ;
//console.log('personsGND: ', personsGND) ;



//var xmlJsString = JSON.stringify(xmlJs);

//fs.writeFileSync('./data/json/Tagebuch_Baernreither_8.json', xmlJsString ) ;
//        console.log('js data written: ', xmlJsString.length, ' bytes')


