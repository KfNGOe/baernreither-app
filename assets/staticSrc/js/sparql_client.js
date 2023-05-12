//https://www.npmjs.com/package/sparql-http-client

const SparqlClient = require('sparql-http-client')

const endpointUrl = 'https://query.wikidata.org/sparql'
const query = `
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX p: <http://www.wikidata.org/prop/>
    PREFIX ps: <http://www.wikidata.org/prop/statement/>
    PREFIX pq: <http://www.wikidata.org/prop/qualifier/>

    SELECT ?value WHERE {
        wd:Q243 p:P2048 ?height.

        ?height pq:P518 wd:Q24192182;
            ps:P2048 ?value .
}`

async function sparqlHttpClient (endpointUrl) {
    const client = new SparqlClient({ endpointUrl })
    const stream = await client.query.select(query) // get a ReadableStream of results from the SPARQL endpoint
    //const results = await streamToPromise(stream) // get all results as an array
    //return results // array of bindings
    return stream ;
}

(async () => {
    await sparqlHttpClient(endpointUrl).then(stream => {
    
        stream.on('data', row => {
            Object.entries(row).forEach(([key, value]) => {
                console.log(`${key}: ${value.value} (${value.termType})`)
            })
        })

        stream.on('error', err => {
            console.error(err)
        })
    })
})() ;

