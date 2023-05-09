//gnd api
const gndId = "118540347";
axios = require('axios');


var gnd_api = {
    //get all the data from the api
    getGndData: function (gndId) {
        var url = "https://lobid.org/gnd/" + gndId + ".jsonld";
        return axios.get(url);
    }
};

console.log('gnd_api.js loaded', gnd_api );





