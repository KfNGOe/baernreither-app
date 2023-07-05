//RDF repository client
const endpoint = 'http://localhost:7200' ;
const readTimeout = 30000 ;
const writeTimeout = 30000 ;
const config = new RepositoryClientConfig(endpoint)
    .setEndpoint('http://localhost:7200/repositories/kfngoe_test')
    .setReadTimeout(readTimeout)
    .setWriteTimeout(writeTimeout) ;
    
const repository = new RDFRepositoryClient(config) ;