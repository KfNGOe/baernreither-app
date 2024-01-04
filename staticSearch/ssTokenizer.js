// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
//const { groupBy } = require('core-js/actual/object/group-by') ;
const { exit } = require("process");
var convert = require('xml-js');

var Tokenizer = require('tokenize-text');
var tokenize = new Tokenizer();

const tokenOffset = 3 ;

var tokenAll_tmp = {
   "tokenAll": []
} ;
var tokensPoss_tmp = {} ;
var tokensPoss12_tmp = {} ;
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

const filepath_in_tei=process.env.filepath_in_tei ;
const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_tei=process.env.filepath_out_tei ;

var splitIn = tokenize.split(function(text, currentToken, prevToken, nextToken) {
    return [
        text.slice(i_char, tokenOffset + i_char)                    
    ]
});

function countText(obj) {
    return obj.results.bindings.length ;    
} ;


function buildSearchTokens(obj) {   
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
        case 'results':
            if (typeof obj[key] === 'object') {
                //console.log('item = ', item, ', index = ', index) ;          
                buildSearchTokens(obj[key]) ;
            }
            break ;
         case 'bindings':
            //console.log('results = ', obj[key]) ;
            if(Array.isArray(obj[key])) {               
                //level + 1
                obj[key].forEach((item, index, array) => {
                   if (typeof item === 'object') {
                      //console.log('item = ', item, ', index = ', index) ;          
                      buildSearchTokens(item) ;
                   }
                }) ;
                //level - 1               
             } else {
                //console.log(obj[key].bindings) ;
                //console.log(obj.constructor.name, 'property is not an array: ', key) ;
             }
            //console.log('tokenAll ready') ;
            break ;
         case 'o_txt':
            let text = obj[key].value ;
            let textLength = text.length ;
            let N_char = textLength - 2 ;            
            if (i_text > 1) {
                tokens12_tmp = [] ;                
                text_prev = jsonJs_in.results.bindings[i_text - 2].o_txt.value ;                
                let text12 = text_prev + text ;                
                for (i_char = text_prev.length - 2; i_char < text_prev.length; i_char++) {
                    tokens = splitIn(text12);
                    token12_tmp = {
                         "token": tokens[0].value
                     } ;                    
                    tokens12_tmp.push(token12_tmp) ;                
                }                
                tokensPoss12_tmp = {
                    "tokens": tokens12_tmp ,
                    "poss": poss12_tmp
                } ;             
                tokenAll_tmp.tokenAll.push(tokensPoss12_tmp) ;
            } else {
                console.log('i_text = ', i_text) ;
            }
            tokens_tmp = [] ;            
            for (i_char = 0; i_char < N_char; i_char++) {
                tokens = splitIn(text);
                token_tmp = {
                     "token": tokens[0].value
                 } ;
                tokens_tmp.push(token_tmp) ;                
            }
            tokensPoss_tmp = {
                "tokens": tokens_tmp ,
                "poss": poss_tmp
            }             
            tokenAll_tmp.tokenAll.push(tokensPoss_tmp) ;
            //console.log('tokenAll_tmp = ', JSON.stringify(tokenAll_tmp)) ;
            break ;
         case 'pos_txt_nr':            
            const pos = obj[key] ;
            tokensPoss_tmp = {} ;
            tokensPoss12_tmp = {} ;            
            i_text++ ;
            if (i_text > 1) {
                poss12_tmp = [] ;
                pos_prev = jsonJs_in.results.bindings[i_text - 2].pos_txt_nr ;
                pos12_tmp = {
                    "pos": pos_prev.value
                } ;
                poss12_tmp.push(pos12_tmp) ;
                pos12_tmp = {
                    "pos": pos.value
                 } ;            
                 poss12_tmp.push(pos12_tmp) ;            
            }
            poss_tmp = [] ;
            pos_tmp = {
               "pos": pos.value
            } ;            
            poss_tmp.push(pos_tmp) ;            
            break ;
         case 'name':
            //console.log('name = ', obj[key]) ;            
            break ;
         case 'text':
            obj[key] = obj[key].replace(/\n\s+$/g, '') ;            
            //console.log('result: ',obj[key]) ;
            break ;
         case 'comment':
            //console.log('comment = ', obj[key]) ;            
            break ;
         default:
            //console.log('no case') ;
            break ;
      } 
   }) ;
} ; 

//read test json file
let json_in = fs.readFileSync('./data/json/fullText.json', 'utf8'); 
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

countTextN = countText(jsonJs_in) ;
console.log('countTextN = ', countTextN) ;

buildSearchTokens(jsonJs_in) ;

let jsonJs_out = tokenAll_tmp ;

//convert js object to tei
//var json_out = convert.js2json(jsonJs_out, {compact: false, spaces: 2}) ;
var json_out = JSON.stringify(jsonJs_out, null, 2) ;
//write tei file
fs.writeFileSync('./staticSearch/ssTokens_tmp.json', json_out ) ;
console.log('json data written: ', json_out.length, ' bytes')