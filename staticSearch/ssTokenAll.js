// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
//const { groupBy } = require('core-js/actual/object/group-by') ;
const { exit } = require("process");
var convert = require('xml-js');

var groupedByToken = {} ;
var tokenAll = {
   "tokenAll": []
} ;
var tokenPos = [] ;
var tokensLength = 0 ;
var i_N = 0 ;
var N = 0 ;
var i_level = 0 ;
var i_startTag = 0 ; 
var i_endTag = 0 ;

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

function myCallback({ token, index }) {
   console.log('token = ', token, ', index = ', index) ;
   return token ;
 }

function buildSearchTokenAll(obj) {   
   Object.keys(obj).forEach((key) => {
      switch(key) {
         case 'tokenAll':
            if(Array.isArray(obj[key])) {               
                //level + 1
                obj[key].forEach((item, index, array) => {
                   if (typeof item === 'object') {
                     buildSearchTokenAll(item) ;
                   }
                }) ;
                //level - 1               
             } else {
             }
            break ;
         case 'tokens':
            let index_token = 0 ;
            let tokens = obj[key] ;
            tokensLength = tokens.length ;
            tokens.forEach((item, index, array) => {
               item['index'] = index_token ;               
               index_token++ ;
               tokenPos.push(item) ;
            }) ;
            break ;
         case 'poss':            
            let pos = obj[key] ;
            tokenPos.forEach((item, index, array) => {
               if (pos.length > 1) {                  
                  item['pos_pr'] = pos[0].pos ;
                  item['pos_nxt'] = pos[1].pos ;
                  item['chN'] = tokensLength + 2 ;
                  tokenAll.tokenAll.push(item) ; 
               } else {                  
                  item['pos'] = pos[0].pos ;
                  item['chN'] = tokensLength + 2 ;
                  tokenAll.tokenAll.push(item) ; 
               }
            }) ;
            tokenPos = [] ;            
            break ;
         case 'name':
            break ;
         case 'text':
            obj[key] = obj[key].replace(/\n\s+$/g, '') ;            
            break ;
         case 'comment':
            break ;
         default:
            break ;
      } 
   }) ;
} ; 

//read test json file
let json_in = fs.readFileSync('./staticSearch/ssTokens_tmp.json', 'utf8');
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

buildSearchTokenAll(jsonJs_in) ;

let jsonJs_out = tokenAll ;

//convert js object to tei
//var json_out = convert.js2json(jsonJs_out, {compact: false, spaces: 2}) ;
var json_out = JSON.stringify(jsonJs_out, null, 2) ;
//write tei file
fs.writeFileSync('./staticSearch/tokens/tokenAll_tmp.json', json_out ) ;  
console.log('json data written: ', json_out.length, ' bytes')