//import groupBy from "https://cdn.jsdelivr.net/npm/core-js-bundle@3.36.0/minified.js";
//import { Octokit } from "https://cdn.skypack.dev/@octokit/core" ;
var text_in ;
var json_in = {} ;
var flag_index = true;
var flag_search = false;

searchFinishedHook = function(num){} ;

window.addEventListener('load', function() {
  searchFinishedHook = function(num) {
    //console.log('hook nr: ', num) ;    
    if (num == 1) {
      flag_index = true ;
      console.log('get search index done') ;      
    }
    if (num == 2) {
      flag_search = true ;
      console.log('get search token done') ;      
    }    
  }
}) ;

$(document).ready(function() {
    console.log("ready!");    
/*
    (async () => {
        //get search index
        console.log('get search index start') ;
        let filepath = './staticSearch/ssTokenString.txt' ;
        text_in = await fetchData(filepath) ;        
        searchFinishedHook(1);
    })() ;    
    */    
}) ; 



$('button#ssDoSearch').click(function(event) {
  event.preventDefault() ;
  let click = $(this);
  //console.log('text_in: ', text_in) ;    
  console.log('click =', click.text()) ;
  if (click.text() == 'Absenden') {
    if (flag_index) {
      console.log('start search') ;
      let input_search = $("input#ssQuery").val(); //get the search query
      console.log('input_search =', input_search) ;      
      //let searchTokenFilePath = './staticSearch/stems/' + searchTokens[0] + '.json' ;//staticSearch/stems                      
      let searchTokenFilePath = './staticSearch/stems/die.json' ;//staticSearch/stems/die.json            
      (async () => {
        json_in = await fetchData(searchTokenFilePath) ;        
        //hits_start = json_in ;
        searchFinishedHook(2);                    
      })() ;            
      //ssSearch(input_search, text_in) ;
    }
    else {
      console.log('search not ready') ;
    }    
  }  
}) ;

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
