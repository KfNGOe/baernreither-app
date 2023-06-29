const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
var connectFlag = false ;
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
    version: 10,
    apiType: 'RDF4J'
}) ;

//get repo list
graphDBEndpoint.getRepositories().then((res) => {
    console.log(res) ;    
}).catch((err) => {
    console.log(err) ;
}) ;


/*
let graphDBAdmin = new EnapsoGraphDBAdmin.Endpoint({
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
*/


