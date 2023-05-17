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

(async () => {    
  await getGNDData('https://d-nb.info/gnd/119148331/about/lds').then(response => {
    console.log(response.data) ;    
  })
  //error handling    
  .catch(error => {
    console.log(error) ;
  } ) ;        
})() ;


