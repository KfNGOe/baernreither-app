// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { findIndex } = require('core-js/actual/array/find-index') ;
const { sort } = require('core-js/actual/array/sort') ;
const { exit } = require("process");

const separator = '|' ;
const tokenOffset = 3 ;
const title_short = 'Bae_TB_8' ;

var searchStr = 'die aus Gründen' ;
var searchToken = {} ;
var searchTokens = [] ;
var token = {} ;
var tokens = [] ;
var i_char = 0 ;
var json_in = {} ;
var jsonJs_in = {} ;
var hits = [] ;
var hits_start = [] ;
var hits_end = [] ;
var hits_curr = [] ;

var Tokenizer = require('tokenize-text');
const { get } = require("jquery");
var tokenize = new Tokenizer();

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);

const filepath_in_tei=process.env.filepath_in_tei ;
const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_tei=process.env.filepath_out_tei ;

var splitIn = tokenize.split(function(text, currentToken, prevToken, nextToken) {
    return [
        text.slice(i_char, tokenOffset + i_char)                    
    ]
}); 

function hitsFilter(hits) {
    let hitsFileName_filtered = [] ;
    let hitsFileName = [] ;
    hits.forEach((hit, index, array) => {
        hitsFileName.push(hit.token_next_uri) ;
    }) ;
    hitsFileName_filtered = hitsFileName.filter((item, index, array) => {
        return hitsFileName.indexOf(item) === index ;
    }) ;
    return hitsFileName_filtered ;
}

function getInstances(hitFileName) {
    let searchTokenFilePath = './staticSearch/stems/' + hitFileName ;
    json_in = fs.readFileSync(searchTokenFilePath, 'utf8');
    jsonJs_in = JSON.parse(json_in) ;    
    return jsonJs_in.instances ;
}

//read file with tokens as string
let text_in = fs.readFileSync('./staticSearch/ssTokenString.txt', 'utf8');
console.log('text data read: ', text_in.length, ' bytes') ;

//tokenize search string
let searchStrLength = searchStr.length ;
console.log('searchStrLength = ', searchStrLength) ;
let N_triple = searchStrLength - 2 ;
searchTokens = [] ;            
for (i_char = 0; i_char < N_triple; i_char++) {
    tokens = splitIn(searchStr);
    token = {
            "token": tokens[0].value
        } ;
    searchTokens.push(token) ;                
}
console.log('searchTokens =', searchTokens) ;

//find first token of search string in tokens
searchToken = separator + searchTokens[0].token + separator ;
if (text_in.includes(searchToken)) {
    console.log('search string found') ;
    for (i_tok = 0; i_tok < N_triple; i_tok++) {
//tokens of search string
        if(0 < i_tok < N_triple-1) {            
            hits.forEach((hit, index, array) => {
//compare current hit with next hits
                            if (hit.token_next_uri === searchTokens[i_tok+1].token + '.json') {
                                let hits_next = getInstances(hit.token_next_uri) ;
                                console.log('hits next = ', hits_next) ;
                                let hit_next = hits_next.find((hit_next, index, array) => {
                                    //find next hit which has same doc_Id as current hit
                                    hit_next.doc_Id === hit.doc_Id ;
                                    //check if index of next hit is index + 1 of curent hit
                                    if (hit_next.index === hit.index + 1) {
                                        //check if prev pos of next hit exists
                                        if (hit_next.pos_pr !== undefined) {
                                            //find next hit which prev pos is same as next pos of current hit
                                            hit_next.pos_pr === hit.pos_nxt ;
                                        } else {
                                            //find next hit which pos is same as pos of current hit
                                            hit_next.pos === hit.pos ;
                                        }
                                    } else {
                                        //check if index of current hit is last token of current hit position
                                        if (hit.index + 3 === hit.chN) {
                                            //find next hit which index is 0 and prev pos is same as pos of current hit
                                            hit_next.index === 0 ;
                                            hit_next.pos_pr === hit.pos ;                    
                                        } else {
                                            //find next hit which index is index - 1 of current hit and pos is same as next pos of current hit
                                            hit_next.index === hit.index - 1 ;
                                            hit_next.pos === hit.pos_nxt ;
                                        }    
                                    }
                                }) ;
                                if (hit_next !== null) {                    
//compare current hit with previous hits                        
                                    if (hit.token_prev_uri === searchTokens[i_tok-1].token + '.json') {
                                        let hits_prev = getInstances(hit.token_prev_uri) ;
                                        console.log('hits prev = ', hits_prev) ;
                                        let hit_prev = hits_prev.find((hit_prev, index, array) => {
                                            //find prev hit which has same doc_Id as current hit
                                            hit_prev.doc_Id === hit.doc_Id ;
                                            //check if index of prev hit is index - 1 of curent hit
                                            if (hit_prev.index === hit.index - 1) {
                                                //check if prev pos of prev hit exists
                                                if (hit_prev.pos_pr !== undefined) {
                                                    //find prev hit which prev pos is same as next pos of current hit
                                                    hit_prev.pos_pr === hit.pos ;                                        
                                                } else {
                                                    //find prev hit which pos is same as pos of current hit
                                                    hit_prev.pos === hit.pos_pr ;
                                                }
                                            } else {
                                                //check if index of current hit is first token of current hit position
                                                if (hit.index === 0) {
                                                    //find prev hit which index is chN - 3 and pos is same as prev pos of current hit
                                                    hit_prev.index === hit.chN - 3 ;
                                                    hit_prev.pos === hit.pos_pr ;                    
                                                } else {
                                                    //find prev hit which index is index + 1 of current hit and pos is same as prev pos of current hit
                                                    hit_prev.index === hit.index + 1 ;
                                                    hit_prev.pos === hit.pos_pr ;
                                                }    
                                            }
                                        }) ;
                                        if (hit_prev !== null) {                    
                                            hits_curr.push(hit_next) ;   
                                        }
                                    }                            
                                }
                            }                
                        }) ;
                        hits = hits_curr ;
                        hits_curr = [] ;        

        } else {
//first token of search string
            if(i_tok === 0) {
                let searchTokenFileName = searchTokens[0].token + '.json' ;
//get start hits
                hits_start = getInstances(searchTokenFileName) ;
                console.log('hits start = ', hits_start) ;
                hits = hits_start ;
                hits.forEach((hit, index, array) => {
        //compare current hit with next hits
                    if (hit.token_next_uri === searchTokens[i_tok+1].token + '.json') {
                        let hits_next = getInstances(hit.token_next_uri) ;
                        console.log('hits next = ', hits_next) ;
                        let hit_next = hits_next.find((hit_next, index, array) => {
                            //find next hit which has same doc_Id as current hit
                            hit_next.doc_Id === hit.doc_Id ;
                            //check if index of next hit is index + 1 of curent hit
                            if (hit_next.index === hit.index + 1) {
                                //check if prev pos of next hit exists
                                if (hit_next.pos_pr !== undefined) {
                                    //find next hit which prev pos is same as next pos of current hit
                                    hit_next.pos_pr === hit.pos_nxt ;
                                } else {
                                    //find next hit which pos is same as pos of current hit
                                    hit_next.pos === hit.pos ;
                                }
                            } else {
                                //check if index of current hit is last token of current hit position
                                if (hit.index + 3 === hit.chN) {
                                    //find next hit which index is 0 and prev pos is same as pos of current hit
                                    hit_next.index === 0 ;
                                    hit_next.pos_pr === hit.pos ;                    
                                } else {
                                    //find next hit which index is index - 1 of current hit and pos is same as next pos of current hit
                                    hit_next.index === hit.index - 1 ;
                                    hit_next.pos === hit.pos_nxt ;
                                }    
                            }
                        }) ;
                        if (hit_next !== null) {                    
                            hits_curr.push(hit_next) ;   
                        }                    
                    }                
                }) ;
                hits = hits_curr ;
                hits_curr = [] ;
            } else {
//last token of search string                
                if(i_tok === N_triple - 1) {
                    hits.forEach((hit, index, array) => {
                        //compare current hit with previous hits                        
                        if (hit.token_prev_uri === searchTokens[i_tok-1].token + '.json') {
                            let hits_prev = getInstances(hit.token_prev_uri) ;
                            console.log('hits prev = ', hits_prev) ;
                            let hit_prev = hits_prev.find((hit_prev, index, array) => {
                                //find prev hit which has same doc_Id as current hit
                                hit_prev.doc_Id === hit.doc_Id ;
                                //check if index of prev hit is index - 1 of curent hit
                                if (hit_prev.index === hit.index - 1) {
                                    //check if prev pos of prev hit exists
                                    if (hit_prev.pos_pr !== undefined) {
                                        //find prev hit which prev pos is same as next pos of current hit
                                        hit_prev.pos_pr === hit.pos ;                                        
                                    } else {
                                        //find prev hit which pos is same as pos of current hit
                                        hit_prev.pos === hit.pos_pr ;
                                    }
                                } else {
                                    //check if index of current hit is first token of current hit position
                                    if (hit.index === 0) {
                                        //find prev hit which index is chN - 3 and pos is same as prev pos of current hit
                                        hit_prev.index === hit.chN - 3 ;
                                        hit_prev.pos === hit.pos_pr ;                    
                                    } else {
                                        //find prev hit which index is index + 1 of current hit and pos is same as prev pos of current hit
                                        hit_prev.index === hit.index + 1 ;
                                        hit_prev.pos === hit.pos_pr ;
                                    }    
                                }
                            }) ;
                            if (hit_prev !== null) {                    
                                hits_curr.push(hit) ;   
                            }
                        }                            
                    }) ;
                    hits = hits_curr ;
                    hits_curr = [] ;
                }
            }
        }    
    }
    //get end hits
    hits_end = hits ;    
    hits = [] ;
    console.log('hits end = ', JSON.stringify(hits_end)) ;
    //find for each end hit the start hit
    hits_end.forEach((hit_end, index, array) => {
        let hit_start = hits_start.find((hit_start, index, array) => {
            hit_end.doc_Id === hit_start.doc_Id ;
            if(hit_end.pos >= hit_start.pos) {
                if(hit_end.pos === hit_start.pos) {
                    hit_start.index === hit_end.index - N_triple + 1 ;
                } else {
                    let i_tok = 0 ; 
                    let tokensN = searchTokens.length ; //e.g. 16
                    let chN_offset = hit_end.index + 3 ; //e.g. 4
                    chN_offset = tokensN + 2 - chN_offset ; //e.g. 14
                    i_tok = (tokensN - 1) - (chN_offset - 3) - 3 ; //e.g. 11                    
                    let hits_prev = getInstances(searchTokens[i_tok].token + '.json') ;
                    let hit_prev = hits_prev.find((hit_prev, index, array) => {
                        hit_prev.doc_Id === hit_end.doc_Id ;
                        hit_prev.pos_nxt === hit_end.pos ;
                    }) ;
                    if (hit_prev !== null) {
                        if (hit_prev.pos_pr === hit_start.pos) {
                            hit_start.index === hit_start.chN - chN_offset  ; //e.g. 4 === 14 - 10
                        } else {
                            i_tok = i_tok - 2 ; //e.g. 11
                            hits_prev = getInstances(searchTokens[i_tok].token + '.json') ;
                            hit_prev = hits_prev.find((hit_prev, index, array) => {
                                hit_prev.doc_Id === hit_end.doc_Id ;
                                hit_prev.pos === hit.pos ; // -> chN, 
                            }) ;
                        } 
                    }
                    


                    
                    

                }
            }
        }) ;
        if (hit_start !== null) {
            hits.push(hit_start) ;
        }
        
        
        
        
        hits_start.forEach((hit_start, index, array) => {
            if (hit_end.doc_Id === hit_start.doc_Id) {
                
            }
        }) ;
    }) ;    
} else {
    console.log('search string not found: first token missing') ; 
}

