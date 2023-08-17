const fs = require('fs') ;
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
var connectFlag = false ;

const endpoint = process.env.endpoint ;
const repo_name = process.env.repo_name ;

const graph = process.env.graph ;

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: endpoint ,
    repository: repo_name ,    
    prefixes: [],    
    triplestore: 'graphdb',
    version: 10,
    //ATTENTION: no api type rdf4j here!
    apiType: 'REST'
}) ;

//graphdb clear graph
graphDBEndpoint
    .clearContext(graph)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });