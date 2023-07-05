const fs = require('fs') ;
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin') ;
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
    //format: 'text/turtle',   
    triplestore: 'graphdb',
    version: 10,
    apiType: 'RDF4J'
}) ;

graphDBEndpoint
    .query(
        'SELECT ?s ?p ?o WHERE { ?s ?p ?o }',
        { transform: 'toJSON' }
    )
    .then((result) => {
        console.log(
            'Read the classes name:\n' + JSON.stringify(result, null, 2)
        );
    })
    .catch((err) => {
        console.log(err);
    });

/*
(async () => {    
    var sparql = fs.readFileSync('assets/staticSrc/sparql/test.rq', 'utf8');
    console.log('sparql data read: ', sparql.length, ' bytes')
    
    let result = await graphDBEndpoint.query(sparql, {format: 'text/turtle'}).catch((err) => {
        console.log(err);
    });

    let result_json = JSON.stringify(result) ;

    fs.writeFileSync('./data/json/test.json', result_json, 'utf8') ;
        console.log('json data written: ', result_json.length, ' bytes')
    
})() ;
*/
