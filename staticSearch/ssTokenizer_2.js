//import { TEST } from './assets/staticSrc/js/constants.js';
// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const { characterMap } = require('../assets/staticSrc/js/constants.js');
const { entityMap } = require('../assets/staticSrc/js/constants.js');
const tokenOffset = 3 ;

var Tokenizer = require('tokenize-text');
var tokenize = new Tokenizer();

var tokens_tmp = [] ;
var tokens12_tmp = [] ;
var token_tmp = {} ;
var token12_tmp = {} ;
var poss_tmp = [] ;
var pos_tmp = {} ;
var poss12_tmp = [] ;
var pos12_tmp = {} ;
var tokens = [] ;
var i_char = 0 ;
var i_text = 0 ;
var countTextN = 0 ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);

//templates
const fullTextAll_temp = {
    "head": {
        "vars": [
            "id", 
            "type",
            "cont",
            "pos"
        ]
    },
    "results": {
        "bindings": [] 
    }
}
var tokenAll_tmp = {
    "tokenAll": []
 } ;

//function to escape html entities
function escapeHtmlEntities(text) {
    return text.replace(/[äÄöÖüÜß!"§$%&/()=?`'<>.,;:~^°@€µ[\]{}\\|]/g, function(match) {
        return characterMap[match] || match;
    });
}

var splitIn = tokenize.split(function(text, currentToken, prevToken, nextToken) {
    return [
        text.slice(i_char, tokenOffset + i_char)                    
    ]
});

function countText(obj) {
    return obj.results.bindings.length ;    
} ;

function buildTokens(fullTextAll,textFull_files) {
    let tokensPoss_tmp = {} ;
    let tokensPoss12_tmp = {} ;
    //iterate over full text files
    fullTextAll.results.bindings.forEach((item, index) => {
        i_text = index + 1 ;
        console.log('i_text = ', i_text) ;
        //iterate over keys
        Object.keys(item).forEach((key) => {
            //console.log('key = ', key, ', value = ', item[key]) ;
            switch(key) {
                case 'cont':
                    let text_in = item[key].value ;
                    let textLength_in = text_in.length ;
                    //check if text has a &quot;
                    if (text_in.includes('&quot;')) {
                        text = text_in.replaceAll('&quot;','"') ; //utf8 code for "
                    } else {
                        text = text_in ;
                    }
                    let textLength = text.length ;
                    let N_char = textLength - 2 ;            
                    if (i_text > 1) {                        
                        tokens12_tmp = [] ;                
                        text_prev = fullTextAll.results.bindings[i_text - 2].cont.value ;                
                        let text12 = text_prev + text ;                
                        for (i_char = text_prev.length - 2; i_char < text_prev.length; i_char++) {
                            tokens = splitIn(text12);
                            token12_tmp = {
                                "token": tokens[0].value
                            } ;
                            //escape html entities '.','/','"' in token
                            token12_tmp.token = escapeHtmlEntities(token12_tmp.token) ;
                            /*
                            //check if token has a /
                            if (token12_tmp.token.includes('/')) {
                                
                                token12_tmp.token = token12_tmp.token.replaceAll('/','0x2F') ; //utf8 code for /
                            }
                            //check if token has a "
                            if (token12_tmp.token.includes('"')) {
                                token12_tmp.token = token12_tmp.token.replaceAll('"','&quot;') ; //utf8 code for 
                            }
                            */                    
                            tokens12_tmp.push(token12_tmp) ;                
                        }
                        tokensPoss12_tmp['tokens'] = tokens12_tmp ;
                    }
                    tokens_tmp = [] ;            
                    for (i_char = 0; i_char < N_char; i_char++) {
                        tokens = splitIn(text);
                        token_tmp = {
                            "token": tokens[0].value
                        } ;
                        //token_tmp.token = '. / "' ;
                        //escape html entities '.','/','"' in token
                        token_tmp.token = escapeHtmlEntities(token_tmp.token) ;
                        /*
                        //check if token has a /
                        if (token_tmp.token.includes('/')) {
                            token_tmp.token = token_tmp.token.replaceAll('/','0x2F') ; //utf8 code for /
                        }
                        //check if token has a "
                        if (token_tmp.token.includes('"')) {
                            token_tmp.token = token_tmp.token.replaceAll('"','&quot;') ; //utf8 code for "
                        }
                        */                        
                        tokens_tmp.push(token_tmp) ;                
                    }                    
                    tokensPoss_tmp['tokens'] = tokens_tmp ;
                    index = 0 ;
                    break ;
                case 'pos':
                    const pos = item[key].value ;
                    if (i_text > 1) {
                        poss12_tmp = [] ;
                        pos_prev = fullTextAll.results.bindings[i_text - 2].pos.value ;
                        pos12_tmp = {
                            "pos": pos_prev            
                        } ;
                        poss12_tmp.push(pos12_tmp) ;
                        pos12_tmp = {
                            "pos": pos
                        } ;            
                        poss12_tmp.push(pos12_tmp) ;                        
                        tokensPoss12_tmp['poss'] = poss12_tmp ;
                        tokenAll_tmp.tokenAll.push(tokensPoss12_tmp) ;
                    }
                    poss_tmp = [] ;
                    pos_tmp = {
                    "pos": pos
                    } ;            
                    poss_tmp.push(pos_tmp) ;                    
                    tokensPoss_tmp['poss'] = poss_tmp ;
                    break ;                
                default:
                    break ;
            }
        }) ;
        //add token to tokens        
        tokenAll_tmp.tokenAll.push(tokensPoss_tmp) ;
        //clear tokens
        tokensPoss12_tmp = {} ;            
        tokensPoss_tmp = {} ;        
    }) ;    
} ; 

/*
// Beispielnutzung
let text = 'Das ist ein Test: Äpfel, Öfen und Überflüssig! Hier sind einige Symbole: /, ., "';
let escapedText = escapeHtmlEntities(text);
console.log(escapedText);

// Beispielnutzung
//let escapedText = 'Das ist ein Test: &Auml;pfel, &Ouml;fen und &Uuml;berfl&uuml;ssig! Hier sind einige Symbole: &sect;, &euro;, &#181;, &#64;, &lt;&gt;';
let originalText = unescapeHtmlEntities(escapedText);
console.log(originalText);
*/

//get full texts
//read json full directory
let jsonFiles = fs.readdirSync('data/json/full/') ;
console.log('json files: ', jsonFiles) ;
//build full text from dipl text json files
let textFull_files = {} ;
//iterate over dipl files
jsonFiles.forEach((file) => {
    //exclude _tmp.json files
    if (!file.includes('_tmp.json')) {
        //read full text json files
        let fileNamePath = 'data/json/full/' + file ;   
        let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
        console.log('json data read: ', json_in.length, ' bytes') ;
        let jsonJs_in_full = JSON.parse(json_in) ;   
        //read full text to files
        let fileName = file.replace('.json','') ;
        textFull_files[fileName] = jsonJs_in_full ;        
    }
}) ;
//
//tokenize all full text files
//init template for all tokens
let fullTextAll = JSON.parse(JSON.stringify(fullTextAll_temp)) ;
//iterate over full text files
Object.keys(textFull_files).forEach((key_source) => {
    fullTextAll.results.bindings = fullTextAll.results.bindings.concat(textFull_files[key_source].results.bindings) ;
}) ;
buildTokens(fullTextAll,textFull_files) ;
let jsonJs_out = tokenAll_tmp ;
//convert js object to json
var json_out = JSON.stringify(jsonJs_out, null, 2) ;
//write json file
fs.writeFileSync('./staticSearch/tokens/ssTokens_tmp.json', json_out ) ;
console.log('json data written: ', json_out.length, ' bytes') ;
