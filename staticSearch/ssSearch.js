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
var startInsts = [] ;
var hits = [] ;
var hits_start = [] ;
var hitsFileName_filtered = [] ;
var hits_curr = [] ;
var insts_curr = [] ;
var startTokens_tmp = [] ;

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
    let searchTokenFileName = searchTokens[0].token + '.json' ;
    hits_start = getInstances(searchTokenFileName) ;
    //find other tokens of search string in tokens
    hits = hits_start ;
    for (i_tok = 1; i_tok < N_triple; i_tok++) {
        hits.forEach((hit, index, array) => {
            let hit_next = getInstances(hit.token_next_uri) ;
            let hit_prev = getInstances(hit.token_prev_uri) ;
            console.log('hit_next = ', hit_next) ;
            console.log('hit_prev = ', hit_prev) ;
            if (hit.token_next_uri === searchTokens[i_tok].token + '.json') {
                if (i_tok-2 >= 0) {
                    if (hit.token_prev_uri === searchTokens[i_tok-2].token + '.json') {
                        hits_curr.push(hit) ;
                    }                    
                } else {
                    hits_curr.push(hit) ;
                }                
            }
        }) ;
        hits = hits_curr ;
        hits_curr = [] ;        
        console.log('hits = ', hits) ;        
        //remove duplicates from hits
        hitsFileName_filtered = hitsFilter(hits) ;
        console.log('hits_filtered = ', hitsFileName_filtered) ;
        //get instances of next token
        hitsFileName_filtered.forEach((hitFileName, index, array) => {
            hits_curr = hits_curr.concat(getInstances(hitFileName)) ;            
        }) ;
        hits = hits_curr ;
        hits_curr = [] ;
    }
    console.log('hits = ', JSON.stringify(hits)) ;    
} else {
    console.log('search string not found') ; 
}

