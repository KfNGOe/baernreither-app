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

var i_char = 0 ;


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
var tokenTextAll_tmp = {
    "tokenTextAll": []
 } ;

const filepath_in_tei=process.env.filepath_in_tei ;
const filepath_in_json='./data/json/Bae_MF_6-2_full.json' ;
const filepath_out_tei=process.env.filepath_out_tei ;

var splitIn = tokenize.split(function(text, currentToken, prevToken, nextToken) {
    return [
        text.slice(i_char, tokenOffset + i_char)                    
    ]
});

function countText(obj) {
    return obj.results.bindings.length ;    
} ;

function buildTokensText(fullTextAll,textFull_files) {
    //iterate over full text files
    fullTextAll.results.bindings.forEach((item, index) => {
        let tokenPosText_tmp = {} ;
        //tokenize text
        let text = item.cont.value ;
        tokenPosText_tmp['tokenText'] = text ;        
        //tokenize pos
        let pos = item.pos.value ;
        tokenPosText_tmp['posText'] = pos ;
        tokenTextAll_tmp.tokenTextAll.push(tokenPosText_tmp) ;
    }) ;    
} ; 

//get full texts
//read json full directory
let jsonFiles = fs.readdirSync('data/json/full/') ;
console.log('json files: ', jsonFiles) ;
//build full text from dipl text json files
let textFull_files = {} ;
//iterate over dipl files
jsonFiles.forEach((file) => {   
   //read full text json files
   let fileNamePath = 'data/json/full/' + file ;   
   let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
   console.log('json data read: ', json_in.length, ' bytes') ;
   let jsonJs_in_full = JSON.parse(json_in) ;   
   //read full text to files
   let fileName = file.replace('.json','') ;
   textFull_files[fileName] = jsonJs_in_full ;   
}) ;
//
//tokenize all full text files
//init template for all tokens
let fullTextAll = JSON.parse(JSON.stringify(fullTextAll_temp)) ;
//iterate over full text files
Object.keys(textFull_files).forEach((key_source) => {
    fullTextAll.results.bindings = fullTextAll.results.bindings.concat(textFull_files[key_source].results.bindings) ;
}) ;

buildTokensText(fullTextAll,textFull_files) ;

let jsonJs_out = tokenTextAll_tmp ;
//convert js object to json
var json_out = JSON.stringify(jsonJs_out, null, 2) ;
//write json file
fs.writeFileSync('./staticSearch/tokensText/ssTokensText_tmp.json', json_out ) ;
console.log('json data written: ', json_out.length, ' bytes')