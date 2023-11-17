// Purpose: build GND data from GND API
const axios = require('axios') ;
const fs = require('fs') ;

var gndSets = "" ;
var gndSet = "" ;
var gndUrl = "" ;
var gndUrls = [] ;

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

async function getObject(obj) {
  let length = Object.keys(obj).length ;
  console.log('object length =', length) ;    
  //console.log( 'resourceIri = ', resourceIri ) ;
  if ('G' in obj && obj.G.includes('https')) {        
      gndUrl = obj.G.concat('/about/lds') ;
      console.log('gndUrl = ', gndUrl) ;
      gndUrls.push(gndUrl) ;      
      //gnd_api('https://d-nb.info/gnd/119148331/about/lds') ;      
   }
  
} ;

function getArray(arr) {
  let length = arr.length ;   
  console.log('array length =', length) ;
  arr.forEach(async (item, index, array) => {
     if (typeof item === 'object') {
        console.log('index = ', index) ;          
        getObject(item) ;
     }
  }) ;
  //console.log('result: ',arr) ;   
} ;


(async () => {

  var json = fs.readFileSync('./data/json_xlsx/person_xlsx', 'utf8');
  console.log('json data read: ', json.length, ' bytes')
  var jsonJS = JSON.parse(json) ;
  var persons = jsonJS.Tabelle1 ;

  getArray(persons) ;
  console.log('gndUrls: ', gndUrls) ;

  console.log('start gnd api calls') ;

  for (const item of gndUrls) {
    console.log('item = ', item) ;
    await getGNDData(item).then(response => {
      //console.log(response.data) ;
      gndSet = response.data ;
      gndSets = gndSets + gndSet ;
    })
    //error handling
    .catch(error => {
      console.log(error) ;
    }) ;
  }  
  
  console.log('end gnd api calls') ;
  
  //console.log('gndSets: ', gndSets) ;  
  
  fs.writeFileSync('./data/ttl/annotation/person/instance/gnd/gnd.ttl', gndSets ) ;
  console.log('ttl data written: ', gndSets.length  , ' bytes')
  
})() ;

/*
var jsonJS = JSON.parse(json) ;
var persons = jsonJS.Tabelle1 ;
//console.log('jsonJS: ', persons[0]) ;
getArray(persons) ;

fs.writeFileSync('./data/ttl/annotation/person/instance/gnd/gnd.ttl', gndSets ) ;
console.log('ttl data written: ', gndSets.length  , ' bytes')
*/