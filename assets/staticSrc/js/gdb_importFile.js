const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
var connectFlag = false ;

const endpoint = process.env.endpoint ;
const repo_name = process.env.repo_name ;

//const path_in = process.env.path_in ;
//const file_in = process.env.file_in ;
//const ext_in = process.env.ext_in ;
const filepath = process.env.filepath ;

const mime_type = process.env.mime_type ;

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: endpoint ,
    repository: repo_name ,
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
        filename: filepath ,
        format: mime_type ,
    })
    .then((result) => {
        console.log('result = ', result) ;
    })
    .catch((err) => {
        console.log('error = ', err) ;
    }) ;