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
var tokens_tmp = [] ;
var token_tmp = {} ;
var tokens = [] ;
var i_char = 0 ;
var json_in = {} ;
var jsonJs_in = {} ;
var startTokens = [] ;

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

//read file with tokens as string
let text_in = fs.readFileSync('./staticSearch/ssTokenString.txt', 'utf8');
console.log('text data read: ', text_in.length, ' bytes') ;

//tokenize search string
let searchStrLength = searchStr.length ;
console.log('searchStrLength = ', searchStrLength) ;
let N_triple = searchStrLength - 2 ;
tokens_tmp = [] ;            
for (i_char = 0; i_char < N_triple; i_char++) {
    tokens = splitIn(searchStr);
    token_tmp = {
            "token": tokens[0].value
        } ;
    tokens_tmp.push(token_tmp) ;                
}
console.log(tokens_tmp) ;

//find first token of search string in tokens
let searchToken = separator + tokens_tmp[0].token + separator ;
if (text_in.includes(searchToken)) {
    console.log('search string found') ;
    searchToken = tokens_tmp[0].token ;
    let searchTokenFileName = './staticSearch/stems/' + searchToken + '.json' ;
    json_in = fs.readFileSync(searchTokenFileName, 'utf8');
    jsonJs_in = JSON.parse(json_in) ;    
    startTokens = jsonJs_in.instances ;
    console.log('startTokens = ', startTokens) ;
    //find other tokens of search string in tokens
    for (i_tok = 1; i_tok < N_triple; i_tok++) {
        startTokens.forEach((item, index, array) => {
            item.token_next_uri === tokens_tmp[i_tok].token + '.json' ;
            console.log('item = ', item) ;
        }) ;
    }    
} else {
    console.log('search string not found') ; 
}

