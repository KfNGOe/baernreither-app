const fs = require('fs') ;
//RDF repository client
const {RDFRepositoryClient, RepositoryClientConfig} = require('graphdb').repository ;
const {GetQueryPayload, QueryType} = require('graphdb').query ;
const RDFMimeType = require('graphdb/lib/http/rdf-mime-type') ;

const endpoint = process.env.endpoint ; // 'http://localhost:7200'
const repo_name = process.env.repo_name ; // 'kfngoe_test'

const path_rq = process.env.path_rq ; // 'assets/staticSrc/sparql/'
const file_rq = process.env.file_rq ; // 'annoPerson_1.rq'
const ext_rq = process.env.ext_rq ; // '.rq'
const filepath_rq = path_rq + file_rq + ext_rq ;

const readTimeout = 30000 ;
const writeTimeout = 30000 ;
const config = new RepositoryClientConfig(endpoint)
    .setEndpoints([ endpoint + '/repositories/' + repo_name])
    //.setEndpoint('http://localhost:7200/repositories/kfngoe_test')
    .setReadTimeout(readTimeout)
    .setWriteTimeout(writeTimeout) ;    
    
const repository = new RDFRepositoryClient(config) ;
console.log('repository: ', repository.repositoryClientConfig) ;

//RDF delete query
(async () => {
    const query = fs.readFileSync(filepath_rq, 'utf8');
    console.log('query data read: ', query.length, ' bytes') ;    
        
    let result = await repository.deleteStatements(query).catch((err) => {
        console.log(err);
    }) ;    
    console.log('result: ', result) ;
})() ;