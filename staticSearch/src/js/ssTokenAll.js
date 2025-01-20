// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
//const { groupBy } = require('core-js/actual/object/group-by') ;
const { exit } = require("process");

var convert = require('xml-js');
var tokenAll = {
   "tokenAll": []
} ;
var tokenPos = [] ;
var tokensLength = 0 ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

function buildSearchTokenAll(tokenAll_tmp) {   
   tokenAll_tmp.tokenAll.forEach((item, index, array) => {      
      Object.keys(item).forEach((key) => {
            console.log('key = ', key) ;
            switch(key) {
                case 'tokens':
                    let index_token = 0 ;
                    let tokens = item[key] ;
                    tokensLength = tokens.length ;
                    tokens.forEach((item, index, array) => {
                        //add index to token
                        item['index'] = index_token ;               
                        index_token++ ;
                        tokenPos.push(item) ;
                    }) ;
                    break ;
                case 'poss':
                    let pos = item[key] ;
                    tokenPos.forEach((item, index, array) => {
                        if (pos.length > 1) {                  
                            item['pos_pr'] = pos[0].pos ;
                            item['pos_nxt'] = pos[1].pos ;                            
                        } else {                  
                            item['pos'] = pos[0].pos ;                            
                        }
                        item['chN'] = tokensLength + 2 ;
                        tokenAll.tokenAll.push(item) ; 
                    }) ;
                    tokenPos = [] ;            
                    break ;
                default:
                    break ;
            }
      }) ;
   }) ;
} ; 

//read test json file
let json_in = fs.readFileSync('./staticSearch/data/json/tokens/ssTokens_tmp.json', 'utf8');
//convert json to js object
let tokenAll_tmp = JSON.parse(json_in) ;
buildSearchTokenAll(tokenAll_tmp) ;
let jsonJs_out = tokenAll ;
//convert js object to tei
var json_out = JSON.stringify(jsonJs_out, null, 2) ;
//write tei file
fs.writeFileSync('./staticSearch/data/json/tokens/tokenAll_tmp.json', json_out ) ;  
