const fs = require('fs') ;
//RDF repository client
const {RDFRepositoryClient, RepositoryClientConfig} = require('graphdb').repository ;
const {GetQueryPayload, QueryType} = require('graphdb').query ;
const RDFMimeType = require('graphdb/lib/http/rdf-mime-type') ;

const endpoint = process.env.GDB_ENDPOINT ; // 'http://localhost:7200'
const repo_name = process.env.GDB_REPO_NAME ; // 'kfngoe_test'

const path_rq = process.env.path_rq ; // 'assets/staticSrc/sparql/'
const filename_rq = process.env.filename_rq ; // 'annoPerson_1.rq'
const ext_rq = process.env.ext_rq ; // '.rq'
const filepath_rq = path_rq + filename_rq + ext_rq ;

const mimeType = process.env.mimeType ; //RDFMimeType.TURTLE
const queryType = process.env.queryType ; //QueryType.CONSTRUCT

const path_out = process.env.path_out ; // '.data/ttl/annotation/anno_web/instance/'
const filename_out = process.env.filename_out ; // 'annoPersoni_1'
const ext_out = process.env.ext_out ; // '.ttl'
const filepath_out = path_out + filename_out + ext_out ; // '.data/ttl/annotation/anno_web/instance/annoPerson_1.ttl'

const readTimeout = 30000 ;
const writeTimeout = 30000 ;
const config = new RepositoryClientConfig(endpoint)
    .setEndpoints([ endpoint + '/repositories/' + repo_name])
    //.setEndpoint('http://localhost:7200/repositories/kfngoe_test')
    .setReadTimeout(readTimeout)
    .setWriteTimeout(writeTimeout) ;    
    
const repository = new RDFRepositoryClient(config) ;
console.log('repository: ', repository.repositoryClientConfig) ;

let body = '' ;

//RDF query
(async () => {
    const query = fs.readFileSync(filepath_rq, 'utf8');
    console.log('query data read: ', query.length, ' bytes') ;
    const payload = new GetQueryPayload()
    .setResponseType(mimeType)
    .setQuery(query)
    .setQueryType(queryType) ;    
       
    let result = await repository.query(payload).catch((err) => {
        console.log(err);
    }) ;    
    result.on('data', (chunk) => {
        // handle data
        body += chunk;        
    }) ;
    result.on('end', () => {
        // handle end of data        
        fs.writeFileSync(filepath_out, body, 'utf8') ;        
        console.log('data written: ', body.length, ' bytes') ;
    }) ;
    result.on('error', (err) => {
        // handle error
        console.log('error: ', err) ;
    }) ;
})() ;