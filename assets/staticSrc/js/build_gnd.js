// Purpose: build GND data from GND API
const axios = require('axios') ;
const fs = require('fs');

var gndSets = "" ;
var gndSet = "" ;
var gndUrl = "" ;

async function getGNDData(gndUrl) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: gndUrl,
    headers: { }
  };

  const response = await axios.request(config) ;
  return response ;
}

gnd_api = async (gndUrl) => {
  await getGNDData(gndUrl).then(response => {
    console.log(response.data) ;    
  })
  //error handling
  .catch(error => {
    console.log(error) ;
  }
  ) ;
}

function checkKeys(obj) {
    //test if key exists    
    if ('G' in obj) {
       return obj.G ;
    }    
 }

function getObject(obj) {
    let length = Object.keys(obj).length ;
    console.log('object length =', length) ;    
    //console.log( 'resourceIri = ', resourceIri ) ;
    if ('G' in obj) {        
        gndUrl = obj.G.concat('/about/lds') ;
        console.log('gndUrl = ', gndUrl) ;
        gndSet = gnd_api(gndUrl) ;        
        //gnd_api('https://d-nb.info/gnd/119148331/about/lds') ;
        gndSets = gndSets + gndSet ;
     }
    
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

fs.writeFileSync('./data/ttl/annotation/person/instance/gnd/gnd.ttl', gndSets ) ;
console.log('ttl data written: ', gndSets.length  , ' bytes')