const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
//var convert = require("xml-js") ;

//console.log(convert.xml2json("<xml>test</xml>")) ;

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: 'http://localhost:7200',
    repository: 'Test',
    prefixes: [
        {
            prefix: 'entest',
            iri: 'http://ont.enapso.com/test#'
        }
    ],
    triplestore: 'graphdb',
    version: 9,
    apiType: 'RDF4J'
});

console.log('Waiting for GraphDB to start...');    
do {    
} while (!graphDBEndpoint.isReady());

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

