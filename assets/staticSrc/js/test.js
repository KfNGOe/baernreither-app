const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
//var convert = require("xml-js") ;

//console.log(convert.xml2json("<xml>test</xml>")) ;

//console.log(EnapsoGraphDBClient) ;

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: 'http://localhost:7200',
    repository: 'Test',
    triplestore: 'graphdb', // 'graphdb' or 'fuseki' or 'stardog'
    prefixes: [
        {
            prefix: 'entest',
            iri: 'http://ont.enapso.com/test#'
        }
    ],
    transform: 'toCSV'
});

//console.log(graphDBEndpoint) ;

graphDBEndpoint.login('admin','root').then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
});

/*
graphDBEndpoint.query('select * where {?class rdf:type owl:Class filter(regex(str(?class), "http://ont.enapso.com/test#TestClass", "i"))}', { transform: 'toJSON' }).then((result) => {
        console.log('Read the classes name:\n' + JSON.stringify(result, null, 2));
    })
    .catch((err) => {
        console.log(err);
    });
*/


