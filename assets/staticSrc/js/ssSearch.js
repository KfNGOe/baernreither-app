//import groupBy from "https://cdn.jsdelivr.net/npm/core-js-bundle@3.36.0/minified.js";
//import { Octokit } from "https://cdn.skypack.dev/@octokit/core" ;
const separator = '|' ;
const threeDots = '...' ;
const tokenOffset = 3 ;
const spaceMax = 5 ;

var text_in ;
var textData_in ;
var fullTextAll = {} ;
var diplTexts = {} ;
var fullTexts = {} ;
var jsonJs_in = {} ;
var input_search ;
var result_arr = [] ;
var markedHits_arr = [] ;
var flag_index = true;
var flag_searchDone = false;
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
      flag_searchDone = true ;
      console.log('input_search =', input_search) ;
      console.log('result_arr =', result_arr) ;
      console.log('search done') ;
      showResults() ;
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
      //get text data
      filepath = './data/json/textData.json' ;
      textData_in = await fetchData(filepath) ;
      //get dipl texts
      let textData_arr = textData_in.results.bindings
      textData_arr.forEach(async function(result, index) {          
        filepath = './data/json/dipl/' + result.fileName ;
        diplTexts[result.fileName] = await fetchData(filepath) ;
      });
      //get full texts
      textData_arr.forEach(async function(result, index) {
        let fileName_full = result.fileName.replace('_dipl', '_full') ;          
        filepath = './data/json/full/' + fileName_full ;
        fullTexts[fileName_full] = await fetchData(filepath) ;
      });
      //filepath = './data/json/full/fullTextAll_tmp.json' ;
      //fullTextAll = await fetchData(filepath) ;      
      searchFinishedHook(1);
  })() ;
}) ;


window.checkHitsNext = function(hit, hits_next) {
  let flag = false ;           
  //only one hit in hits_next
  let hit_next = hits_next.instances.find((hit_next, index, array) => {
    
    if(hit.pos === "Bae_TB_8_175" && hit.index === 1) {
      console.log('hit =', hit) ;
      console.log('hit_next =', hit_next) ;
    }
    //build source from hit.pos or hit.pos_pr
    let pos_tmp = (hit.pos_pr !== undefined) ? hit.pos_pr : hit.pos ;
    let source = pos_tmp.substring(0, pos_tmp.lastIndexOf('_')) ;
    //build source from hit_next.pos or hit_next.pos_pr
    let pos_tmp_next = (hit_next.pos_pr !== undefined) ? hit_next.pos_pr : hit_next.pos ;
    let source_next = pos_tmp_next.substring(0, pos_tmp_next.lastIndexOf('_')) ;
    
    //find next hit which has same source as current hit
    if (source_next === source) {    
      //check if index of next hit is index + 1 of curent hit
      if (hit_next.index === hit.index + 1) {
          //check if prev pos of next hit exists
          if (hit_next.pos_pr !== undefined) {                  
              //find next hit which prev pos is same as next pos of current hit
              flag = (hit_next.pos_nxt === (hit.pos_nxt !== undefined ? hit.pos_nxt : "NaN")) ? true : false ;
          } else {                  
              //find next hit which pos is same as pos of current hit
              flag = (hit_next.pos === (hit.pos !== undefined ? hit.pos : "NaN")) ? true : false ;
          }
      } else {
          //check if index of current hit is last token of current hit position and prev pos of next hit exists
          if (hit.index + 3 === hit.chN && hit_next.pos_pr !== undefined) {                                    
              //find next hit which index is 0 and prev pos is same as pos of current hit
              flag = (hit_next.index === 0 && hit_next.pos_pr === (hit.pos !== undefined ? hit.pos : "NaN")) ? true : false ;                                        
          } else {
            //check if pos of next hit exists
            if (hit_next.pos !== undefined) {
              //find next hit which index is index - 1 of current hit and pos is same as next pos of current hit
              flag = (hit_next.index === hit.index - 1 && hit_next.pos === (hit.pos_nxt !== undefined ? hit.pos_nxt : "NaN")) ? true : false ;
            }              
          }    
      }
    }
    return flag ;
  }) ;
  return hit_next ;
}

window.checkHitsPrevious = function(hit, hits_prev) {
  //only one hit in hits_prev
  let hit_prev = hits_prev.instances[0] ;
  let flag = false ;
      
  //build source from hit.pos or hit.pos_pr
  let pos_tmp = (hit.pos_pr !== undefined) ? hit.pos_pr : hit.pos ;
  let source = pos_tmp.substring(0, pos_tmp.lastIndexOf('_')) ;
  //build source from hit_next.pos or hit_next.pos_pr
  let pos_tmp_prev = (hit_prev.pos_pr !== undefined) ? hit_prev.pos_pr : hit_prev.pos ;
  let source_prev = pos_tmp_prev.substring(0, pos_tmp_prev.lastIndexOf('_')) ;

  //find prev hit which has same source as current hit
  if (source_prev === source) {
    //check if index of prev hit is index - 1 of curent hit
    if (hit_prev.index === hit.index - 1) {
        //check if prev pos of prev hit exists
        if (hit_prev.pos_nxt !== undefined) {
            //find prev hit which prev pos is same as next pos of current hit
            flag = (hit_prev.pos_pr === (hit.pos_pr !== undefined ? hit.pos_pr : "NaN")) ? true : false ;                                            
        } else {
            //find prev hit which pos is same as pos of current hit
            flag = (hit_prev.pos === (hit.pos !== undefined ? hit.pos : "NaN")) ? true : false ;                                            
        }
    } else {
        //check if index of current hit is first token of current hit position and next pos of prev hit exists
        if (hit.index === 0 && hit_prev.pos_nxt !== undefined) {
            //find prev hit which index is index + 1 of current hit and pos is same as prev pos of current hit
            flag = (hit_prev.index === hit.index + 1 && hit_prev.pos === (hit.pos_pr !== undefined ? hit.pos_pr : "NaN")) ? true : false ;                                            
        } else {
          //check if pos of prev hit exists
          if (hit_prev.pos !== undefined) {
            //find prev hit which index is chN - 3 and pos is same as prev pos of current hit
            flag = (hit_prev.index === hit_prev.chN - 3 && hit_prev.pos === (hit.pos_pr !== undefined ? hit.pos_pr : "NaN")) ? true : false ;
          }
        }
      }
      if (flag) {
        return hit_prev ;
      } else {
        return undefined ;
      }
  } 
}

//start search on button click
$('button#ssDoSearch').click(function(event) {
  (async () => {
    event.preventDefault() ; //ATTENTION: this is important to prevent the form from being submitted; fetch will not work otherwise
    let click = $(this);
    console.log('click =', click.text()) ;
    if (click.text() == 'Absenden') {
      if (flag_index) {
        console.log('start search') ;        
        let hits_arr = [] ;
        result_arr = [] ;
        input_search = $("input#ssQuery").val(); //get the search query
        console.log('input_search =', input_search) ;
        //check input search string
        if (input_search.length < tokenOffset) {        
          alert('Suchbegriff zu kurz! Mindestens 3 Zeichen eingeben!') ;      
        } else {
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
          let searchPathNr = hits_start.instances.length ;
          let result_arr_tmp = new Array(searchPathNr).fill(0) ;
          console.log('result_arr_tmp =', result_arr_tmp) ;
          result_arr_tmp.forEach(function(result, index) {
            let hit_start = {} ;
            hit_start.instances = [] ;
            hits_path_arr[0] = 0 ;
            hit_start.token = hits_start.token ;          
            hit_start.instances.push(hits_start.instances[index]) ;
            hits_path_arr[0] = hit_start ;
            result_arr_tmp[index] = JSON.parse(JSON.stringify(hits_path_arr)) ;
          }) ;
          //result_arr_test = JSON.parse(JSON.stringify(result_arr_tmp)) ;
          console.log('result_arr_tmp =', result_arr_tmp) ;
          
          //build search paths
          for (i_tok = 0; i_tok < tokens_N; i_tok++) {
            console.log('i_tok = ', i_tok) ;
            for (i_path = 0; i_path < searchPathNr; i_path++) {
              console.log('i_path = ', i_path) ;

              //check if token is first token of tokens string
              //and if token is not last token of tokens string
              if(i_tok === 0 && i_tok < tokens_N-1) {
                //compare current hit with next hits
                let hit = result_arr_tmp[i_path][i_tok].instances[0] ;
                if (hit.token_next_uri === searchTokens[i_tok+1] + '.json') {
                  let hits_next = hits_arr[i_tok + 1] ;
                  console.log('hits next = ', hits_next) ;
                  let hit_next = checkHitsNext(hit, hits_next) ;
                  if (hit_next !== undefined) {
                      console.log('hit next = ', hit_next) ;
                      //build current hit
                      let hit_curr = {} ;
                      hit_curr.instances = [] ;                            
                      hit_curr.token = hits_next.token ;
                      hit_curr.instances.push(hit_next) ;
                      //add current hit to result array
                      result_arr_tmp[i_path][i_tok+1] = hit_curr ;                    
                  } else {                    
                      //remove path from result array
                      result_arr_tmp.splice(i_path, 1) ;
                      searchPathNr-- ;
                      i_path-- ;
                      console.log('no next token', hit.token_next_uri.replace('.json',''),'found') ;
                    }
                } else {
                  //remove path from result array
                  result_arr_tmp.splice(i_path, 1) ;
                  searchPathNr-- ;
                  i_path-- ;
                  console.log('no next token', hit.token_next_uri.replace('.json',''),'in search string') ;
                }
              } else {

                //check if token is between first and last token of tokens string
                if(0 < i_tok && i_tok < tokens_N-1) {
                  //compare current hit with next hits
                  let hit = result_arr_tmp[i_path][i_tok].instances[0] ;
                  if (hit.token_next_uri === searchTokens[i_tok+1] + '.json') {
                    let hits_next = hits_arr[i_tok + 1] ;
                    console.log('hits next = ', hits_next) ;
                    let hit_next = checkHitsNext(hit, hits_next) ;
                    if (hit_next !== undefined) {
                      if (hit.token_prev_uri === searchTokens[i_tok-1] + '.json') {                    
                        //let hits_prev = hits_arr[i_tok - 1] ;
                        let hits_prev = result_arr_tmp[i_path][i_tok - 1] ;
                        console.log('hits prev = ', hits_prev) ;
                        hit_prev = checkHitsPrevious(hit, hits_prev) ;
                        if (hit_prev !== undefined) {
                          console.log('hit next = ', hit_next) ;
                          //build current hit
                          let hit_curr = {} ;
                          hit_curr.instances = [] ;                            
                          hit_curr.token = hits_next.token ;
                          hit_curr.instances.push(hit_next) ;
                          //add current hit to result array
                          result_arr_tmp[i_path][i_tok+1] = hit_curr ;
                          console.log('result_arr_tmp =', result_arr_tmp) ;
                        } else {
                          //remove path from result array
                          result_arr_tmp.splice(i_path, 1) ;
                          searchPathNr-- ;
                          i_path-- ;
                          console.log('no prev', hit.token_prev_uri.replace('.json',''),' token found') ;                        
                        }
                      } else {
                        //remove path from result array
                        result_arr_tmp.splice(i_path, 1) ;
                        searchPathNr-- ;
                        i_path-- ;
                        console.log('no prev token', hit.token_prev_uri.replace('.json',''),' in search string') ;
                      } 
                    } else {                      
                        //remove path from result array
                        result_arr_tmp.splice(i_path, 1) ;
                        searchPathNr-- ;
                        i_path-- ;
                        console.log('no next', hit.token_next_uri.replace('.json',''),' token found') ;
                      }
                  } else {
                    //remove path from result array
                    result_arr_tmp.splice(i_path, 1) ;
                    searchPathNr-- ;
                    i_path-- ;
                    console.log('no next token', hit.token_next_uri.replace('.json',''),' in search string') ;
                  }                
                } else {
                  
                  //check if token is last token of tokens string
                  //and if token is not first token of tokens string
                  if(i_tok === tokens_N-1 && i_tok > 0) {
                    //compare current hit with next hits
                    let hit = result_arr_tmp[i_path][i_tok].instances[0] ;
                    if (hit.token_prev_uri === searchTokens[i_tok - 1] + '.json') {
                      let hits_prev = result_arr_tmp[i_path][i_tok - 1] ;
                      console.log('hits prev = ', hits_prev) ;
                      hit_prev = checkHitsPrevious(hit, hits_prev) ;
                      if (hit_prev !== undefined) {                      
                        console.log('result_arr_tmp =', result_arr_tmp) ;
                      } else {
                        //remove path from result array
                        result_arr_tmp.splice(i_path, 1) ;
                        searchPathNr-- ;
                        i_path-- ;
                        console.log('no prev token', hit.token_prev_uri.replace('.json',''),' found') ;                        
                      }                                
                    } else {
                      //remove path from result array
                      result_arr_tmp.splice(i_path, 1) ;
                      searchPathNr-- ;
                      i_path-- ;
                      console.log('no prev token', hit.token_prev_uri.replace('.json',''),' in search string') ;
                    }
                  }
                }
              }
            }                 
          }
          console.log('result_arr_tmp =', result_arr_tmp) ;
          result_arr = result_arr_tmp ;
          //hook search finished
          searchFinishedHook(2);
        }
      }
      else {
        console.log('search not ready') ;
      }    
    }
  }) () ;  
}) ;