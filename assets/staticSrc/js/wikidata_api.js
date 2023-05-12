const axios = require('axios');

async function getWikidataData(wikidataUrl) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: wikidataUrl,
    headers: { 
      'Accept': 'application/rdf+xml', 
      'Cookie': 'GeoIP=AT:6:Graz:47.08:15.57:v4; WMF-Last-Access-Global=11-May-2023; WMF-DP=028; WMF-Last-Access=11-May-2023'
    }
  };

  const response = await axios.request(config) ;
  return response ;
}

(async () => {
  await getWikidataData('https://www.wikidata.org/wiki/Special:EntityData/Q875141.ttl').then(response => {
    console.log(response.data) ;    
  })
  //error handling
  .catch(error => {
    console.log(error) ;
  } ) ;
})() ;

