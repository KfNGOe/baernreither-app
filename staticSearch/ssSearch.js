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

//var searchStr = 'die aus Gründen' ;
var searchStr = 'WahlreformDie drei' ;
var searchToken = {} ;
var searchTokens = [] ;
var token = {} ;
var tokens = [] ;
var i_char = 0 ;
var json_in = {} ;
var jsonJs_in = {} ;
var hits = [] ;
var hits_start = [] ;
var hit_start_test = {} ;
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

function getHitStart(hit, i_tok) {
    if (i_tok <= 0) {
        let hits_prev = getInstances(searchTokens[0].token + '.json') ;
        let hit_prev = hits_prev.find((hit_prev, index, array) => {
            let flag = false ;
            flag = (hit_prev.docId === hit.docId && hit_prev.pos === hit.pos && hit_prev.index === (hit.index - tokens_N + 1)) ? true : false ;
            return flag ;
        }) ;
        if (hit_prev !== undefined) {
            hit_start_test = hit_prev ;
            console.log('hit_start_test = ', hit_start_test) ;            
        }
    } else {
        let hits_prev_12 = getInstances(searchTokens[i_tok].token + '.json') ;
        let hit_prev_12 = hits_prev_12.find((hit_prev_12, index, array) => {
            let flag = false ;
            flag = (hit_prev_12.docId === hit.docId && hit_prev_12.pos_nxt === hit.pos) ? true : false ;
            return flag ;        
        }) ;
        if (hit_prev_12 !== undefined) {
            //get privous index from last token of previous pos
            i_tok = i_tok - 2 ;
            let hits_prev = getInstances(searchTokens[i_tok].token + '.json') ;
            let hit_prev = hits_prev.find((hit_prev, index, array) => {
                let flag = false ;
                flag = (hit_prev.docId === hit_prev_12.docId && hit_prev.pos === hit_prev_12.pos_pr && hit_prev.index === (hit_prev.chN - 3)) ? true : false ;
                return flag ;
            }) ;
            if (hit_prev !== undefined) {
                if (i_tok - (hit_prev.index + 1) < 0) {                
                    let hits_start = getInstances(searchTokens[0].token + '.json') ;
                    let hit_start = hits_start.find((hit_start, index, array) => {
                        let flag = false ;
                        flag = (hit_start.docId === hit_prev.docId && hit_start.pos === hit_prev.pos && hit_start.index === (hit_prev.index - i_tok)) ? true : false ;
                        return flag ;
                    }) ;
                    if (hit_start !== undefined) {
                        hit_start_test = hit_start ;
                    }
                } else {
                    i_tok = i_tok - (hit_prev.index + 1) ;
                    getHitStart(hit_prev, i_tok) ;
                }            
            }
        }
    }    
    
}

function checkHitsNext(hit, hits_next) {
    let hit_next = hits_next.find((hit_next, index, array) => {
        let flag = false ;
        //find next hit which has same docId as current hit
        if (hit_next.docId === hit.docId) {
            //check if index of next hit is index + 1 of curent hit
            if (hit_next.index === hit.index + 1) {
                //check if prev pos of next hit exists
                if (hit_next.pos_pr !== undefined) {
                    //find next hit which prev pos is same as next pos of current hit
                    flag = (hit_next.pos_nxt === hit.pos_nxt) ? true : false ;
                } else {
                    //find next hit which pos is same as pos of current hit
                    flag = (hit_next.pos === hit.pos) ? true : false ;                                        
                }
            } else {
                //check if index of current hit is last token of current hit position and prev pos of next hit exists
                if (hit.index + 3 === hit.chN && hit_next.pos_pr !== undefined) {                                    
                    //find next hit which index is 0 and prev pos is same as pos of current hit
                    flag = (hit_next.index === 0 && hit_next.pos_pr === hit.pos) ? true : false ;                                        
                } else {
                    //find next hit which index is index - 1 of current hit and pos is same as next pos of current hit
                    flag = (hit_next.index === hit.index - 1 && hit_next.pos === hit.pos_nxt) ? true : false ;                                        
                }    
            }
        }
        return flag ;
    }) ;
    return hit_next ;
}

function checkHitsPrevious(hit, hits_prev) {
    let hit_prev = hits_prev.find((hit_prev, index, array) => {
        let flag = false ;
        //find prev hit which has same docId as current hit
        if (hit_prev.docId === hit.docId) {
            //check if index of prev hit is index - 1 of curent hit
            if (hit_prev.index === hit.index - 1) {
                //check if prev pos of prev hit exists
                if (hit_prev.pos_nxt !== undefined) {
                    //find prev hit which prev pos is same as next pos of current hit
                    flag = (hit_prev.pos_pr === hit.pos_pr) ? true : false ;                                            
                } else {
                    //find prev hit which pos is same as pos of current hit
                    flag = (hit_prev.pos === hit.pos) ? true : false ;                                            
                }
            } else {
                //check if index of current hit is first token of current hit position and next pos of prev hit exists
                if (hit.index === 0 && hit_prev.pos_nxt !== undefined) {
                    //find prev hit which index is index + 1 of current hit and pos is same as prev pos of current hit
                    flag = (hit_prev.index === hit.index + 1 && hit_prev.pos === hit.pos_pr) ? true : false ;                                            
                } else {
                    //find prev hit which index is chN - 3 and pos is same as prev pos of current hit
                    flag = (hit_prev.index === hit_prev.chN - 3 && hit_prev.pos === hit.pos_pr) ? true : false ;
                }    
            }
        }
        return flag ;                                
    }) ;
    return hit_prev ;
}

//read file with tokens as string
let text_in = fs.readFileSync('./staticSearch/ssTokenString.txt', 'utf8');
console.log('text data read: ', text_in.length, ' bytes') ;

//tokenize search string
let searchStrLength = searchStr.length ;
console.log('searchStrLength = ', searchStrLength) ;
let tokens_N = searchStrLength - 2 ;
searchTokens = [] ;            
for (i_char = 0; i_char < tokens_N; i_char++) {
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
    for (i_tok = 0; i_tok < tokens_N; i_tok++) {
        console.log('i_tok = ', i_tok) ;
//tokens of search string
        if(0 < i_tok && i_tok < tokens_N-1) {            
            hits.forEach((hit, index, array) => {
            //compare current hit with next hits
                if (hit.token_next_uri === searchTokens[i_tok+1].token + '.json') {
                    let hits_next = getInstances(hit.token_next_uri) ;
                    console.log('hits next = ', hits_next) ;
                    let hit_next = checkHitsNext(hit, hits_next) ;                    
                    if (hit_next !== undefined) {                    
//compare current hit with previous hits                        
                        if (hit.token_prev_uri === searchTokens[i_tok-1].token + '.json') {
                            let hits_prev = getInstances(hit.token_prev_uri) ;
                            console.log('hits prev = ', hits_prev) ;
                            let hit_prev = checkHitsPrevious(hit, hits_prev) ;
                            if (hit_prev !== undefined) {                    
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
                        let hit_next = checkHitsNext(hit, hits_next) ;
                        if (hit_next !== undefined) {                    
                            hits_curr.push(hit_next) ;   
                        }                    
                    }                
                }) ;
                hits = hits_curr ;
                hits_curr = [] ;
            } else {
//last token of search string                
                if(i_tok === tokens_N - 1) {
                    hits.forEach((hit, index, array) => {
                        //compare current hit with previous hits                        
                        if (hit.token_prev_uri === searchTokens[i_tok-1].token + '.json') {
                            let hits_prev = getInstances(hit.token_prev_uri) ;
                            console.log('hits prev = ', hits_prev) ;
                            let hit_prev = checkHitsPrevious(hit, hits_prev) ;                            
                            if (hit_prev !== undefined) {                    
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
    console.log('hits start = ', JSON.stringify(hits_start)) ;
    console.log('hits end = ', JSON.stringify(hits_end)) ;
    //find for each end hit the start hit
    if(!(hits_start.length === 1 && hits_end.length === 1)) {
        hits_end.forEach((hit_end, index, array) => {
            //get start hit for each end hit        
            let i_tok = 0 ;        
            i_tok = (tokens_N - 1) - (hit_end.index + 1) ;
            getHitStart(hit_end, i_tok) ;
            console.log('hit_start_test = ', hit_start_test) ;                
            let hit_start = hits_start.find((hit_start, index, array) => {
                let flag = false ;
                flag = (JSON.stringify(hit_start) === JSON.stringify(hit_start_test)) ? true : false ;            
                return flag ;
            }) ;
            if (hit_start !== undefined) {
                hits_curr.push(hit_start) ;
            }                 
        }) ;
        hits_start = hits_curr ;
    } else {        
        console.log('hits_start.length = hits_end.length = 1') ;
    }
    //make a JsonJs object    
    let hitsObj = {} ;
    let hitsArr = [] ;
    let hitsObj_tmp = {} ;
    if(hits_start.length === hits_end.length) {
        for (i_hit = 0; i_hit < hits_start.length; i_hit++) {
            hitsObj_tmp.start = hits_start[i_hit] ;
            hitsObj_tmp.end = hits_end[i_hit] ;
            hitsArr.push(hitsObj_tmp) ;
            hitsObj_tmp = {} ;
        }
        hitsObj.hits = hitsArr ;
        console.log('hitsObj = ', JSON.stringify(hitsObj)) ;
    } else {
        console.log('hits_start.length !== hits_end.length') ;
    }
} else {
    console.log('search string not found: first token missing') ; 
}

