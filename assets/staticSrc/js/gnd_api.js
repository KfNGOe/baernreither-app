// Description: This file contains the functions to call the GND API
const axios = require('axios');

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

gnd_api('https://d-nb.info/gnd/119148331/about/lds') ;


