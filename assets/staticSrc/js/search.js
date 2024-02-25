//import groupBy from "https://cdn.jsdelivr.net/npm/core-js-bundle@3.36.0/minified.js";
//import { Octokit } from "https://cdn.skypack.dev/@octokit/core" ;
var text_in ;
searchFinishedHook = function(num){} ;

$(document).ready(function() {
    console.log("ready!");    

    (async () => {
        //get search index
        console.log('get search index start') ;
        text_in = await fetchData() ;        
        searchFinishedHook(1);
    })() ;
}) ;

window.addEventListener('load', function() {
    searchFinishedHook = function(num) {    
    console.log('hook nr: ', num) ;
    console.log('get search index done') ;
    console.log('text_in: ', text_in) ;    
  }
} ) ;

/*
window.git_login = async function() {
  try {
    const response = await octokit.request("GET /user");      
    console.log("Response =", response) ;
    console.log("Status =", response.status) ;    
    
  } catch (error) {  
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)      
    }
    alert('Login error!') ;    
  }
}

//Now we can start trickle-downloading the various JSON files.
      this.getJson(0);

      async getJson(jsonIndex){
    if (jsonIndex < this.jsonToRetrieve.length){
      try{
        if (this.mapJsonRetrieved.get(this.jsonToRetrieve[jsonIndex].id) != GOT){
          this.mapJsonRetrieved.set(this.jsonToRetrieve[jsonIndex].id, GETTING);
          let fch = await fetch(this.jsonToRetrieve[jsonIndex].path);
          let json = /.*\.txt$/.test(this.jsonToRetrieve[jsonIndex].path)? await fch.text() : await fch.json();
          this.jsonRetrieved(json, this.jsonToRetrieve[jsonIndex].path);
        }
        else{
          return this.getJson(jsonIndex + 1);
        }
      }
      catch(e){
        console.log('ERROR: failed to retrieve resource ' + this.jsonToRetrieve[jsonIndex].path + ': ' + e.message);
        this.mapJsonRetrieved.set(this.jsonToRetrieve[jsonIndex].id, FAILED);
      }
      return this.getJson(jsonIndex + 1);
    }
    else{
      this.allJsonRetrieved = true;
    }
  }

*/
