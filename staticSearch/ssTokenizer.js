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
var tokens_tmp = [] ;
var token_tmp = {} ;
var poss_tmp = [] ;
var pos_tmp = {} ;
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


function buildSearchTest(obj) {   
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
        case 'results':
            if (typeof obj[key] === 'object') {
                //console.log('item = ', item, ', index = ', index) ;          
                buildSearchTest(obj[key]) ;
            }
            break ;
         case 'bindings':
            //console.log('results = ', obj[key]) ;
            if(Array.isArray(obj[key])) {               
                //level + 1
                obj[key].forEach((item, index, array) => {
                   if (typeof item === 'object') {
                      //console.log('item = ', item, ', index = ', index) ;          
                      buildSearchTest(item) ;
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
            console.log('text = ', text) ;
            let textLength = text.length ;
            let N_char = textLength - 2 ;
            tokens_tmp = [] ;            
            i_text++ ;
            if (i_text > 1) {               
                pos_prev = jsonJs_in.results.bindings[i_text - 2].pos_txt_nr.value ;
                text_prev = jsonJs_in.results.bindings[i_text - 2].o_txt.value ;
                console.log('pos_prev = ', pos_prev) ;
                console.log('text_prev = ', text_prev) ;
                let text12 = text_prev + text ;
                console.log('text12 = ', text12) ;
                for (i_char = text_prev.length - 2; i_char < text_prev.length; i_char++) {
                    tokens = splitIn(text12);
                    token_tmp = {
                         "token": tokens[0].value
                     } ;
                     console.log('token_tmp = ', token_tmp) ;
                    tokens_tmp.push(token_tmp) ;                
                }
                console.log('tokens = ', tokens_tmp) ;
                poss_tmp = [] ;
                pos_tmp = {
                    "pos": pos_prev
                } ;
                poss_tmp.push(pos_tmp) ;
                pos_tmp = {
                    "pos": obj.pos_txt_nr.value
                } ;
                poss_tmp.push(pos_tmp) ;
                console.log('poss = ', poss_tmp) ;
                tokensPoss_tmp = {
                    "tokens": tokens_tmp,
                    "poss": poss_tmp
                } ;
                console.log('tokensPoss_tmp = ', tokensPoss_tmp) ;
            } else {
                console.log('i_text = ', i_text) ;
            }            
            for (i_char = 0; i_char < N_char; i_char++) {
                tokens = splitIn(text);
                token_tmp = {
                     "token": tokens[0].value
                 } ;
                tokens_tmp.push(token_tmp) ;                
            }
            tokensPoss_tmp = {
                "tokens": tokens_tmp,
                "poss": poss_tmp
                } ;
            tokenAll_tmp.tokenAll.push(tokensPoss_tmp) ;            
            console.log('tokens = ', tokens_tmp) ;
            console.log('tokenAll = ', JSON.stringify(tokenAll_tmp)) ;
            break ;
         case 'pos_txt_nr':            
            const pos = obj[key] ;
            console.log('pos = ', pos.value) ;
            pos_tmp = {
               "pos": pos.value
            } ;
            poss_tmp = [] ;
            poss_tmp.push(pos_tmp) ;                        
            console.log('poss = ', poss_tmp) ;
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

buildSearchTest(jsonJs_in) ;

let jsonJs_out = tokenAll ;

//convert js object to tei
//var json_out = convert.js2json(jsonJs_out, {compact: false, spaces: 2}) ;
//var json_out = JSON.stringify(jsonJs_out, null, 2) ;
//write tei file
//fs.writeFileSync('./staticSearch/tokens/tokenAll.json', json_out ) ;  
console.log('json data written: ', json_out.length, ' bytes')