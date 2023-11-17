const axios = require('axios') ;
const fs = require('fs') ;
var convert = require('xml-js');

var gnSets = "" ;
var gnSet = "" ;
var gnUrl = "" ;
var gnUrls = [] ;

async function getGnData(gnUrl) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: gnUrl,
        headers: { }
    };
    
    const response = await axios.request(config)
    .catch(error => {
        console.log(error) ;
    }) ;    
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

//geoname_api("https://sws.geonames.org/3020251/about.rdf") ;

(async () => {

    var json = fs.readFileSync('./data/json_xlsx/place_xlsx.json', 'utf8');
    console.log('json data read: ', json.length, ' bytes')
    var jsonJS = JSON.parse(json) ;
    var places = jsonJS.Tabelle1 ;
  
    //getArray(places) ;
    //console.log('gnUrls: ', gnUrls) ;
  
    console.log('start gn api calls') ;
  
    for (const item of places) {
      console.log('item = ', item) ;
      if (item.E.includes('https')) {        
        gnUrl = item.E ;
        gnUrl = gnUrl.replace('https://www.geonames.org/', 'https://sws.geonames.org/') ;
        gnUrl= gnUrl.substring(0, gnUrl.lastIndexOf('/')) ;        
        gnUrl = gnUrl.concat('/about.rdf') ;   
        console.log('gnUrl = ', gnUrl) ;

        await getGnData(gnUrl).then(response => {
            //console.log('response.data: ', response.data) ;
            xml = response.data ;
            //gnSets = gndSets + gndSet ;
          })
          //console.log('xml: ', xml) ;
          //convert xml to json object
          json = convert.xml2json(xml, {compact: false, spaces: 2}) ;
          let arr_json = json.declaration ;          
          
          fs.writeFileSync('./data/json_xmlId/test.json', arr_json ) ;
          console.log('json data written: ', arr_json.length  , ' bytes') ;
      }
      //var result = convert.xml2json(xml, {compact: false, spaces: 2});      
    }  
    
    console.log('end gnd api calls') ;
    
    //console.log('gndSets: ', gndSets) ;  
    
    fs.writeFileSync('./data/ttl/annotation/person/instance/gnd/gnd.ttl', gndSets ) ;
    console.log('ttl data written: ', gndSets.length  , ' bytes')
    
  })() ;