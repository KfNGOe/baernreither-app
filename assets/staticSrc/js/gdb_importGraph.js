const fs = require('fs') ;
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
var connectFlag = false ;

const endpoint = process.env.endpoint ;
const repo_name = process.env.repo_name ;

const path_in = process.env.path_in ;
const file_in = process.env.file_in ;
const ext_in = process.env.ext_in ;
const filepath = path_in + file_in + ext_in ;

const mime_type = process.env.mime_type ;

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: endpoint ,
    repository: repo_name ,    
    prefixes: [],    
    triplestore: 'graphdb',
    version: 10,
    //ATTENTION: no api type rdf4j here!
    apiType: 'REST'
}) ;

//graphdb upload a file into graph
graphDBEndpoint
    .uploadFromFile({        
        filename: filepath ,
        format: mime_type ,        
        context: 'https://github.com/KfNGOe/kfngoei/g1' ,
    })
    .then((result) => {
        console.log('result = ', result) ;
    })
    .catch((err) => {
        console.log('error = ', err) ;
    }) ;