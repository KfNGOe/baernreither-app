const axios = require('axios');

async function geoname_api(geonameUrl) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: geonameUrl,
        headers: { }
    };
    
    const response = await axios.request(config) ;
    console.log(response.data) ;
    return response ;
}

geoname_api("https://sws.geonames.org/3020251/about.rdf") ;