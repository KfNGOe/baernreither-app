const axios = require('axios') ;
const fs = require('fs') ;
var convert = require('xml-js');

var gnSets_json = {} ;
var gnSets_str = "" ;
var gnSet = "" ;
var gnUrl = "" ;

var gndUrl = "" ;

let gn_json = {
    "head": {
        "vars": [
            "A",
            "B",
            "C",
            "D",
            "Lemma_gn",
            "Lat",
            "Long"
        ]
    },
    "results": {
        "bindings": []
    }
};
let gnSets = gn_json.results.bindings ;

async function getGnData(gnUrl) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: gnUrl, //"https://sws.geonames.org/3020251/about.rdf"
        headers: { }
    } ;    
    const response = await axios.request(config)
    .catch(error => {
        console.log(error) ;
        throw error ;
    }) ;    
    return response ;
}

async function getGNDData(gndUrl) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: gndUrl,
      headers: { }
    };  
    const response = await axios.request(config)
    .catch(error => {
        console.log(error) ;
    }) ;    
    return response ;
  }

(async () => {
    
    var json = fs.readFileSync('./data/json/register/register_place_xlsx.json', 'utf8');
    console.log('json data read: ', json.length, ' bytes')
    var jsonJS = JSON.parse(json) ;
    var places = jsonJS.Tabelle1 ;
  
    console.log('start gn api calls') ;
  
    for (const item of places) {
      console.log('item = ', item) ;
      //check if item.C exists
        if (item.C && item.C.includes('https')) {
            if(item.C.includes('geonames')) {
                gnUrl = item.C ;
                gnUrl = gnUrl.replace('https://www.geonames.org/', 'https://sws.geonames.org/') ;
                gnUrl= gnUrl.substring(0, gnUrl.lastIndexOf('/')) ;        
                gnUrl = gnUrl.concat('/about.rdf') ;   
                console.log('gnUrl = ', gnUrl) ;

                await getGnData(gnUrl).then(response => {                    
                    xml = response.data ;                    
                })
                js = convert.xml2js(xml, {compact: false, spaces: 2}) ;
                let arr_js = js.elements[0].elements[0].elements ;
                let lemma = arr_js.find(item => item.name === 'gn:name').elements[0].text ;
                let wgs_lat = arr_js.find(item => item.name === 'wgs84_pos:lat').elements[0].text ;
                let wgs_long = arr_js.find(item => item.name === 'wgs84_pos:long').elements[0].text ;
                console.log('lemma: ', lemma) ;
                console.log('wgs_lat: ', wgs_lat) ;
                console.log('wgs_long: ', wgs_long) ;
                item.Lemma_gn = lemma ;
                item.Lat = wgs_lat ;
                item.Long = wgs_long ;
                gnSet = item ;
                gnSets.push(gnSet) ;
                console.log('gnSets: ', JSON.stringify(gnSets)) ;
            } else {
                if(item.C.includes('gnd')) {                    
                    gnSet = item ;
                    gnSets.push(gnSet) ;
                    /*gndUrl = item.C ;
                    gndUrl = gndUrl.concat('/about/lds') ;
                    console.log('gndUrl = ', gndUrl) ;

                    await getGndData(gndUrl).then(response => {
                        //console.log('response.data: ', response.data) ;
                        xml = response.data ;
                        //gnSets = gndSets + gndSet ;
                    })*/
                }
            }
        } else {            
            //add item
            console.log('no gnUrl found') ;            
            gnSet = item ;
            gnSets.push(gnSet) ;
        }      
    }          
    console.log('end api calls') ;
    //gnSets_json.Tabelle1 = gnSets ;
    //delete first element of gnSets
    gnSets.shift() ;
    //put gnSets into gn_json
    gn_json.results.bindings = gnSets ;
    gnSets_str = JSON.stringify(gn_json) ;
    fs.writeFileSync('./data/json/register/register_place_geo.json', gnSets_str) ;
    console.log('json data write: ', gnSets_str.length, ' bytes') ;
  })() ;