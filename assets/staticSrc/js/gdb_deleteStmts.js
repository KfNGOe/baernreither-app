const fs = require('fs') ;
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
var connectFlag = false ;

const endpoint = process.env.endpoint ;
const repo_name = process.env.repo_name ;

const path_rq = process.env.path_rq ; // 'assets/staticSrc/sparql/'
const file_rq = process.env.file_rq ; // 'annoPerson_1.rq'
const ext_rq = process.env.ext_rq ; // '.rq'
const filepath_rq = path_rq + file_rq + ext_rq ;

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: endpoint,
    repository: repo_name,    
    triplestore: 'graphdb',
    version: 10,
    apiType: 'RDF4J'
}) ;

//graphdb delete statements
(async () => {
    const query = fs.readFileSync(filepath_rq, 'utf8');
    console.log('query data read: ', query.length, ' bytes') ;

    let result = await graphDBEndpoint
        .update( query )
        .catch((err) => {
            console.log(err);
        }) ;
    console.log('Delete the class:\n' + JSON.stringify(result, null, 2)) ;
  })() ;