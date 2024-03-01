//import groupBy from "https://cdn.jsdelivr.net/npm/core-js-bundle@3.36.0/minified.js";
//import { Octokit } from "https://cdn.skypack.dev/@octokit/core" ;
var text_in ;
var json_in = {} ;
var flag_index = true;
var flag_search = false;

searchFinishedHook = function(num){} ;

window.fetchData = async function(filepath) {
  try {        
      const response = await fetch(filepath) ;
      //response.ok;     
      //response.status; 
      if (filepath.includes('.json')) {            
          const json_in = await response.json();
          return json_in ;            
      } else {
          const text_in = await response.text();
          return text_in ;
      }        
  } catch (error) {        
      console.error('Error:', error);        
  }
} ;

window.addEventListener('load', function() {
  searchFinishedHook = function(num) {
    //console.log('hook nr: ', num) ;    
    if (num == 1) {
      flag_index = true ;
      console.log('get search index done') ;      
    }
    if (num == 2) {
      flag_search = true ;
      console.log('get first search token done') ;
    }
    if (num == 3) {
      console.log('get next search token done') ;
    }
    if (num == 4) {
      console.log('get last search token done') ;
    }    
  }
}) ;

$(document).ready(function() {
    console.log("ready!");    
    (async () => {
        //get search index
        console.log('get search index start') ;
        let filepath = './staticSearch/ssTokenString.txt' ;
        text_in = await fetchData(filepath) ;        
        searchFinishedHook(1);
    })() ;
}) ;

$('button#ssDoSearch').click(function(event) {
  event.preventDefault() ; //ATTENTION: this is important to prevent the form from being submitted; fetch will not work otherwise
  let click = $(this);
  //console.log('text_in: ', text_in) ;    
  console.log('click =', click.text()) ;
  if (click.text() == 'Absenden') {
    if (flag_index) {
      console.log('start search') ;
      let input_search = $("input#ssQuery").val(); //get the search query
      console.log('input_search =', input_search) ;
      //check input search string
    if (input_search.length < tokenOffset) {        
      alert('Suchbegriff zu kurz! Mindestens 3 Zeichen eingeben!') ;      
    }    
    //tokenize search string
    searchTokens = [] ;
    searchTokens = tokenize(input_search, searchTokens) ;    
    console.log('searchTokens =', searchTokens) ;
    //find first token of search string in tokens string
    let searchToken = separator + searchTokens[0] + separator ;
    if (text_in.includes(searchToken)) {
        console.log('search token found') ;
        let searchStrLength = input_search.length ;    
        let tokens_N = searchStrLength - 2 ;        
        for (i_tok = 0; i_tok < tokens_N; i_tok++) {            
            //check if token is first token of tokens string
            if(i_tok === 0) {
                console.log('i_tok = ', i_tok) ;                
                let searchTokenFilePath = './staticSearch/stems/' + searchTokens[0] + '.json' ;//staticSearch/stems      
                (async () => {
                  json_in = await fetchData(searchTokenFilePath) ;    
                  searchFinishedHook(2) ;
                })() ;
            } else {
                //check if token is between first and last token of tokens string
                if(0 < i_tok && i_tok < tokens_N-1) {
                    console.log('i_tok = ', i_tok) ;
                    let searchTokenFilePath = './staticSearch/stems/' + searchTokens[0] + '.json' ;//staticSearch/stems      
                    (async () => {
                      json_in = await fetchData(searchTokenFilePath) ;    
                      searchFinishedHook(3) ;
                    })() ;            
                } else {
                    //check if token is last token of tokens string
                    if(i_tok === tokens_N-1) {
                        console.log('i_tok = ', i_tok) ;
                        let searchTokenFilePath = './staticSearch/stems/' + searchTokens[0] + '.json' ;//staticSearch/stems      
                        (async () => {
                          json_in = await fetchData(searchTokenFilePath) ;    
                          searchFinishedHook(4) ;
                        })() ;            
                    }
                }
            }            
        }
    } else {
        console.log('search token not found') ;
        return ;
    }
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
