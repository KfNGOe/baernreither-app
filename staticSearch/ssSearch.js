// Importing the jsdom module
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
var hits = {} ;
var hits_start = {} ;
var hit_start_test = {} ;
var hits_end = {} ;
var hits_curr = {
    "token": "",
    "instances": []
} ;
/*
var splitIn = tokenize.split(function(text, currentToken, prevToken, nextToken) {
    return [
        text.slice(i_char, tokenOffset + i_char)                    
    ]
}); 
*/
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
/*
function getInstances(hitFileName) {
    let searchTokenFilePath = './staticSearch/stems/' + hitFileName ;
    json_in = fs.readFileSync(searchTokenFilePath, 'utf8');
    jsonJs_in = JSON.parse(json_in) ;    
    return jsonJs_in.instances ;
}
*/
function getHits(hitFileName) {
    let searchTokenFilePath = './staticSearch/stems/' + hitFileName ;
    json_in = fs.readFileSync(searchTokenFilePath, 'utf8');
    jsonJs_in = JSON.parse(json_in) ;    
    return jsonJs_in ;
}

function getHitStart(hit, i_tok) {
    if (i_tok <= 0) {
        let hits_prev = getHits(searchTokens[0].token + '.json') ;
        let hit_prev = hits_prev.instances.find((hit_prev, index, array) => {
            let flag = false ;
            flag = (hit_prev.docId === hit.docId && hit_prev.pos === hit.pos && hit_prev.index === (hit.index - tokens_N + 1)) ? true : false ;
            return flag ;
        }) ;
        if (hit_prev !== undefined) {
            hit_start_test = hit_prev ;
            console.log('hit_start_test = ', hit_start_test) ;            
        }
    } else {
        let hits_prev_12 = getHits(searchTokens[i_tok].token + '.json') ;
        let hit_prev_12 = hits_prev_12.instances.find((hit_prev_12, index, array) => {
            let flag = false ;
            flag = (hit_prev_12.docId === hit.docId && hit_prev_12.pos_nxt === hit.pos) ? true : false ;
            return flag ;        
        }) ;
        if (hit_prev_12 !== undefined) {
            //get privous index from last token of previous pos
            i_tok = i_tok - 2 ;
            let hits_prev = getHits(searchTokens[i_tok].token + '.json') ;
            let hit_prev = hits_prev.instances.find((hit_prev, index, array) => {
                let flag = false ;
                flag = (hit_prev.docId === hit_prev_12.docId && hit_prev.pos === hit_prev_12.pos_pr && hit_prev.index === (hit_prev.chN - 3)) ? true : false ;
                return flag ;
            }) ;
            if (hit_prev !== undefined) {
                if (i_tok - (hit_prev.index + 1) < 0) {                
                    let hits_start = getHits(searchTokens[0].token + '.json') ;
                    let hit_start = hits_start.instances.find((hit_start, index, array) => {
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
    let hit_next = hits_next.instances.find((hit_next, index, array) => {
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
    let hit_prev = hits_prev.instances.find((hit_prev, index, array) => {
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

function ssSearch(input_search, text_in) {    
    console.log('input_search =', input_search) ;
    console.log('text_in =', text_in) ;
}
