//import groupBy from "https://cdn.jsdelivr.net/npm/core-js-bundle@3.36.0/minified.js";
//import { Octokit } from "https://cdn.skypack.dev/@octokit/core" ;
const separator = '|' ;
const tokenOffset = 3 ;

var text_in ;
var jsonJs_in = {} ;
var searchTokens = [] ;
var hits_arr = [];
var flag_index = true;
var flag_searchFirst = false;
var flag_searchNext = false;
var flag_searchLast = false;
var test ;

function tokenize (input_search, searchTokens) {
  let searchStrLength = input_search.length ;    
  let tokens_N = searchStrLength - 2 ;    
  let tokens = [] ;
  for (i_char = 0; i_char < tokens_N; i_char++) {
      tokens = input_search.slice(i_char, tokenOffset + i_char) ;        
      searchTokens.push(tokens) ;                
  }
  return searchTokens ;
};

searchFinishedHook = function(num){} ;

window.fetchData = async function(filepath) {
  try {        
      const response = await fetch(filepath, {
        signal:  AbortSignal.timeout(3000)
      }) ;      
      if (filepath.includes('.json')) {            
          const json_in = await response.json();
          return json_in ;            
      } else {
          const text_in = await response.text();
          return text_in ;
      }        
  } catch (error) {        
      console.error('Error:', error);
      if (error.name === 'AbortError') {
          alert('fetch data: Timeout!') ;
      }        
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
      flag_searchFirst = true ;
      console.log('get first search token done') ;
    }
    if (num == 3) {
      flag_searchNext = true ;
      console.log('get next search token done') ;
    }
    if (num == 4) {
      flag_searchLast = true ;
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
  (async () => {
    event.preventDefault() ; //ATTENTION: this is important to prevent the form from being submitted; fetch will not work otherwise
    let click = $(this);
    console.log('click =', click.text()) ;
    if (click.text() == 'Absenden') {
      if (flag_index) {
        console.log('start search') ;
        hits_arr = [] ;
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
        //check search string
        let searchStrLength = input_search.length ;    
        let tokens_N = searchStrLength - 2 ;        
        for (i_tok = 0; i_tok < tokens_N; i_tok++) {        
          //find token of search string in tokens string        
          let searchToken = separator + searchTokens[i_tok] + separator ;
          if (text_in.includes(searchToken)) {          
            //if token found, fetch token file
            let searchTokenFilePath = './staticSearch/stems/' + searchTokens[i_tok] + '.json' ;            
            hits_arr.push(await fetchData(searchTokenFilePath)) ;
          } else {
              console.log('search token "' + searchTokens[i_tok] + '" in "' + input_search + '" not found') ;
              alert('Suchausdruck "' + input_search + '" nicht gefunden!') ;
              return ;
          }
        }
        console.log('hits_arr =', hits_arr) ;
        //build result array
        let hits_start = hits_arr[0] ;
        let hits_path_arr = new Array(hits_arr.length).fill(0) ;
        //hits_path_arr[0] = hits_start ;
        let result_arr = new Array(hits_start.instances.length).fill(0) ;
        result_arr.forEach(function(result, index) {
          let hit_start = {} ;
          hit_start.token = hits_start.token ;
          hit_start.instances = [] ;
          hit_start.instances.push(hits_start.instances[index]) ;
          hits_path_arr[0] = hit_start ;
          result_arr[index] = hits_path_arr ;
        } ) ;
        console.log('result_arr =', result_arr) ;
        //build search paths
        for (i_tok = 0; i_tok < tokens_N; i_tok++) {
          console.log('i_tok = ', i_tok) ;
          if(i_tok === 0) {
            //array.findIndex(function(currentValue, index, arr), thisValue)          
            //hits_arr[0].token
            let hits_arr_index = hits_arr.findIndex(function(hit) {
              return hit.token === searchTokens[i_tok] ;
            }) ;
            if (hits_arr_index === -1) {
              console.log('search token "' + searchTokens[i_tok] + '" not found') ;              
            } else {
              hits_arr[hits_arr_index].instances.forEach(function(instance) {

              } ) ;
            console.log('hits_arr_index = ', hits_arr_index) ;
          }
            if(0 < i_tok && i_tok < tokens_N-1) {
              let hits_arr_index = hits_arr.findIndex(function(hit,index) {
                return hits_arr[index].token === searchTokens[i_tok] ;
              }) ;
              if (hits_arr_index === -1) {
                console.log('search token "' + searchTokens[i_tok] + '" not found') ;              
              }
              console.log('hits_arr_index = ', hits_arr_index) ;
            } else {
              if(i_tok === tokens_N-1) {
                let hits_arr_index = hits_arr.findIndex(function(hit,index) {
                  return hits_arr[index].token === searchTokens[i_tok] ;
                }) ;
                if (hits_arr_index === -1) {
                  console.log('search token "' + searchTokens[i_tok] + '" not found') ;              
                }
                console.log('hits_arr_index = ', hits_arr_index) ;              
              }
            }
          }
        }

      }
      else {
        console.log('search not ready') ;
      }    
    }
  }) () ;  
}) ;

/*
//check if token is first token of tokens string
            if(i_tok === 0) {
                console.log('i_tok = ', i_tok) ;                
                let searchTokenFilePath = './staticSearch/stems/' + searchTokens[0] + '.json' ;//staticSearch/stems      
                (async () => {
                  json_in = await fetchData(searchTokenFilePath) ;    
                  searchFinishedHook(2) ;
                })() ;                
                flag_searchFirst = false ;
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
*/