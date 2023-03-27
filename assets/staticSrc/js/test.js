const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client') ;
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
var connectFlag = false ;
//var convert = require("xml-js") ;

//console.log(convert.xml2json("<xml>test</xml>")) ;

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: 'http://localhost:7200',
    repository: 'Test',
    prefixes: [
        {
            prefix: 'entest',
            iri: 'http://ont.enapso.com/test#'
        }
    ],
    triplestore: 'graphdb',
    version: 9,
    apiType: 'RDF4J'
});

connect = async function() {
    try {
        const result =  await graphDBEndpoint.login('admin','root');
        console.log('result= ', result.success);

        return result.success ;      
      
    } catch (err) {
        console.log('result error = ', err.success);
    };
  }

  connect().then(value => {
    connectFlag = value ;
    console.log("Connect =", connectFlag) ;
}) ;
   

     
/*
graphDBEndpoint.login('admin','root').then((result) => {
    console.log('result= ', result.success);    
})
.catch((err) => {
    console.log('result= ', err.success);
});
*



/*
graphDBEndpoint.query('select * where {?class rdf:type owl:Class filter(regex(str(?class), "http://ont.enapso.com/test#TestClass", "i"))}', { transform: 'toJSON' }).then((result) => {
        console.log('Read the classes name:\n' + JSON.stringify(result, null, 2));
    })
    .catch((err) => {
        console.log(err);
    });
*/

