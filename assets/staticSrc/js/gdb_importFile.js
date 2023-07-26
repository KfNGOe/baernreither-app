const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
var connectFlag = false ;
//var convert = require("xml-js") ;

//console.log(convert.xml2json("<xml>test</xml>")) ;

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: 'http://localhost:7200',
    repository: 'kfngoe_test',
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

//graphdb upload a file
graphDBEndpoint
    .uploadFromFile({
        
        filename: 'data/ttl/text/Bae_TB_8.ttl',        
        //filename: 'data/ttl/annotation/person/example/DouglasAdams/DouglasAdams-gnd.ttl',        
        format: 'text/turtle',
        //baseIRI: 'http://ont.enapso.com/test#',
        //context: 'http://ont.enapso.com/test'
    })
    .then((result) => {
        console.log(result) ;
    })
    .catch((err) => {
        console.log(err, 'process error here...') ;
    });



