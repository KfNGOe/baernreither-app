const fs = require('fs') ;

//RDF repository client
const {RDFRepositoryClient, RepositoryClientConfig} = require('graphdb').repository ;
const {GetQueryPayload, QueryType} = require('graphdb').query ;

const RDFMimeType = require('graphdb').http ;
//const SparqlJsonResultParser = require('graphdb/lib/parser/sparql-json-result-parser');
//const SparqlXmlResultParser = require('graphdb/lib/parser/sparql-xml-result-parser');
//const {TurtleParser} = require('graphdb').parser ;

const query = 'CONSTRUCT {?s ?p ?o} WHERE {?s ?p ?o}' ;
//const query = 'SELECT * WHERE { ?s ?p ?o }' ;

const mimeType = RDFMimeType.TURTLE ;
//const mimeType = RDFMimeType.RDF_JSON ;
//const mimeType = RDFMimeType.SPARQL_RESULTS_JSON ;

const queryType = QueryType.CONSTRUCT ;
//const queryType = QueryType.SELECT ;

const endpoint = 'http://localhost:7200' ;
const readTimeout = 30000 ;
const writeTimeout = 30000 ;
const config = new RepositoryClientConfig(endpoint)
    .setEndpoints(['http://localhost:7200/repositories/kfngoe_test'])
    //.setEndpoint('http://localhost:7200/repositories/kfngoe_test')
    .setReadTimeout(readTimeout)
    .setWriteTimeout(writeTimeout) ;
    
const repository = new RDFRepositoryClient(config) ;
console.log('repository: ', repository.repositoryClientConfig) ;

//RDF query
//repository.registerParser(new TurtleParser()) ;
//repository.registerParser(new SparqlJsonResultParser()) ;

(async () => {
    const payload = new GetQueryPayload()
    .setResponseType(mimeType)
    .setQuery(query)
    .setQueryType(queryType)
    .setLimit(3) ;

    var sparql = fs.readFileSync('assets/staticSrc/sparql/test.rq', 'utf8');
    console.log('sparql data read: ', sparql.length, ' bytes')
    
    let result = await repository.query(payload).catch((err) => {
        console.log(err);
    }) ;
    //console.log('result: ', result) ;
    result.on('data', (data) => {
        // handle data
        console.log('data: ', data.toString()) ;
        //let result_json = data.toString() ;
        let result_ttl = data.toString() ;
        
        //fs.writeFileSync('./data/json/test.json', result_json, 'utf8') ;        
        fs.writeFileSync('./data/ttl/test.ttl', result_ttl, 'utf8') ;
        //console.log('json data written: ', result_json.length, ' bytes')
        console.log('ttl data written: ', result_ttl.length, ' bytes')
    }) ;
})() ;


