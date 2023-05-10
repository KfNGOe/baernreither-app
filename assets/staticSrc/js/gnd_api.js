const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://d-nb.info/gnd/119148331/about/lds',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(response.data) ;
  //console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
