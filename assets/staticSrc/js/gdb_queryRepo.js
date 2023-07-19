const fs = require('fs') ;
//const normalize = require('normalize-space') ;
//const SparqlJsonResultParser = require('graphdb/lib/parser/sparql-json-result-parser');
//const SparqlXmlResultParser = require('graphdb/lib/parser/sparql-xml-result-parser');
//const {TurtleParser} = require('graphdb').parser ;

//RDF repository client
const {RDFRepositoryClient, RepositoryClientConfig} = require('graphdb').repository ;
const {GetQueryPayload, QueryType} = require('graphdb').query ;

const RDFMimeType = require('graphdb/lib/http/rdf-mime-type') ;

//const query = 'PREFIX gndo: <https://d-nb.info/standards/elementset/gnd#> CONSTRUCT {?s a gndo:DifferentiatedPerson} WHERE {?s a gndo:DifferentiatedPerson}' ;
//const query = 'SELECT * WHERE { ?s ?p ?o }' ;

//const mimeType = RDFMimeType.TURTLE ;
//const mimeType = RDFMimeType.RDF_JSON ;
const mimeType = RDFMimeType.SPARQL_RESULTS_JSON ;

//const queryType = QueryType.CONSTRUCT ;
const queryType = QueryType.SELECT ;

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
//console.log('repository: ', repository) ;

let body = '' ;

//RDF query
//repository.registerParser(new TurtleParser()) ;
//repository.registerParser(new SparqlJsonResultParser()) ;

(async () => {
    //get namespaced prefixes
    const prefixes = await repository.getNamespaces() ;
    console.log('prefixes: ', prefixes) ;

    const query = fs.readFileSync('assets/staticSrc/sparql/test.rq', 'utf8');
    console.log('query data read: ', query.length, ' bytes') ;    

    const payload = new GetQueryPayload()
    .setResponseType(mimeType)
    .setQuery(query)
    .setQueryType(queryType) ;
    //.setLimit(3)
       
    let result = await repository.query(payload).catch((err) => {
        console.log(err);
    }) ;
    //console.log('result: ', result) ;
    result.on('data', (chunk) => {
        // handle data
        body += chunk;
        console.log('data: ', chunk.toString()) ;
        //let result_json = data.toString() ;
        //let result_ttl = data.toString() ;
        
        //fs.writeFileSync('./data/json/test.json', result_json, 'utf8') ;        
        //fs.writeFileSync('./data/ttl/test.ttl', result_ttl, 'utf8') ;
        //console.log('json data written: ', result_json.length, ' bytes')
        //console.log('ttl data written: ', result_ttl.length, ' bytes')
    }) ;
    result.on('end', () => {
        // handle end of data
        console.log('end: ', body) ;
        fs.writeFileSync('./data/ttl/test.ttl', body, 'utf8') ;
        console.log('ttl data written: ', body.length, ' bytes') ;
    }) ;
    result.on('error', (err) => {
        // handle error
        console.log('error: ', err) ;
    }
    ) ;
})() ;

    


