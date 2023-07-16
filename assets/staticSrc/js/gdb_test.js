const RDFMimeType = require('graphdb/lib/http/rdf-mime-type');
//const SparqlJsonResultParser = require('graphdb/lib/parser/sparql-json-result-parser');
//const SparqlXmlResultParser = require('graphdb/lib/parser/sparql-xml-result-parser');
const {TurtleParser} = require('graphdb').parser ;

//RDF repository client
const {RDFRepositoryClient, RepositoryClientConfig} = require('graphdb').repository ;
const {GetQueryPayload, QueryType} = require('graphdb').query ;

//const query = 'CONSTRUCT {?s ?p ?o} WHERE {?s ?p ?o}' ;
const query = 'SELECT * WHERE { ?s ?p ?o }' ;
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

//RDF query
//repository.registerParser(new TurtleParser()) ;
//repository.registerParser(new SparqlJsonResultParser()) ;


const payload = new GetQueryPayload()
    .setResponseType(mimeType)
    .setQuery(query)
    .setQueryType(queryType)
    .setLimit(3) ;

    return repository.query(payload).then((stream) => {
        stream.on('data', (data) => {
            // handle data
            console.log('data: ', data.toString()) ;
            //console.log('data: ', data) ;
        });
        stream.on('end', () => {
          // handle end of the stream
        });
      });


