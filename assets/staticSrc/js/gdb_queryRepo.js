const fs = require('fs') ;
//RDF repository client
const {RDFRepositoryClient, RepositoryClientConfig} = require('graphdb').repository ;
const {GetQueryPayload, QueryType} = require('graphdb').query ;
const RDFMimeType = require('graphdb/lib/http/rdf-mime-type') ;

const endpoint = process.env.endpoint ; // 'http://localhost:7200'
const repo_name = process.env.repo_name ; // 'kfngoe'

//const path_rq = process.env.path_rq ; // 'assets/staticSrc/sparql/'
//const file_rq = process.env.file_rq ; // 'annoPerson_1.rq'
//const ext_rq = process.env.ext_rq ; // '.rq'
const filepath_rq = process.env.filepath_rq ;

//const path_out = process.env.path_out ; // '.data/ttl/anno/anno_web/'
//const file_out = process.env.file_out ; // 'annoPersoni_1'
//const ext_out = process.env.ext_out ; // '.ttl'
const filepath_out = process.env.filepath_out ;

const readTimeout = 60000 ;
const writeTimeout = 60000 ;
const config = new RepositoryClientConfig(endpoint)
    .setEndpoints([ endpoint + '/repositories/' + repo_name])
    //.setEndpoint('http://localhost:7200/repositories/kfngoe')
    .setReadTimeout(readTimeout)
    .setWriteTimeout(writeTimeout) ;    
    
const repository = new RDFRepositoryClient(config) ;

var mimeType = process.env.mime_type ; //RDFMimeType.TURTLE
var queryType = process.env.query_type ; //QueryType.CONSTRUCT

let body = '' ;

//RDF query
(async () => {    
    switch (mimeType) {
        case 'text/turtle':
            mimeType = RDFMimeType.TURTLE ;            
            break;
        case 'application/sparql-results+json':
            mimeType = RDFMimeType.SPARQL_RESULTS_JSON ;            
            break;
        default:
            break;
    }
    switch (queryType) {
        case 'CONSTRUCT':
            queryType = QueryType.CONSTRUCT ;            
            break;
        case 'SELECT':
            queryType = QueryType.SELECT ;            
            break;
        default:
            break;
    }
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
        //console.log('data: ', body) ;        
        fs.writeFileSync(filepath_out, body, 'utf8') ;        
        console.log('data written: ', body.length, ' bytes') ;
    }) ;
    result.on('error', (err) => {
        // handle error
        console.log('error: ', err) ;
    }) ;
})() ;