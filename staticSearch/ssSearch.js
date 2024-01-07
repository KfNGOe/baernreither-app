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
var hits_filtered = [] ;
var hits_curr = [] ;
var insts_curr = [] ;
var startTokens_tmp = [] ;

var Tokenizer = require('tokenize-text');
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
    let hits_filtered = [] ;
    let hits_tmp = [] ;
    hits.forEach((hit, index, array) => {
        hits_tmp.push(hit.token_next_uri) ;
    }) ;
    hits_filtered = hits_tmp.filter((item, index, array) => {
        return hits_tmp.indexOf(item) === index ;
    }) ;
    return hits_filtered ;
}

function getInstances(hit) {
    let searchTokenFileName = './staticSearch/stems/' + hit ;
    json_in = fs.readFileSync(searchTokenFileName, 'utf8');
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
    let hit = searchTokens[0].token + '.json' ;
    hits_start = getInstances(hit) ;     
    //find other tokens of search string in tokens
    hits = hits_start ;
    for (i_tok = 1; i_tok < N_triple; i_tok++) {
        hits.forEach((hit, index, array) => {
            if (hit.token_next_uri === searchTokens[i_tok].token + '.json') {
                hits_curr.push(hit) ;                
            }            
        }) ;
        hits = hits_curr ;
        hits_curr = [] ;        
        console.log('hits = ', hits) ;        
        //remove duplicates from hits
        hits_filtered = hitsFilter(hits) ;
        console.log('hits_filtered = ', hits_filtered) ;
        //get instances of next token
        hits_filtered.forEach((hit, index, array) => {
            hits_curr = hits_curr.concat(getInstances(hit)) ;            
        }) ;
        hits = hits_curr ;
        hits_curr = [] ;
    }
    console.log('hits = ', JSON.stringify(hits)) ;    
} else {
    console.log('search string not found') ; 
}

