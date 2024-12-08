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

function buildSearchTest(obj) {   
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
         case 'tokenAll':
            //console.log('tokenAll = ', obj[key]) ;
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
                //console.log(obj.constructor.name, 'property is not an array: ', key) ;
             }
            console.log('tokenAll ready') ;
            break ;
         case 'tokens':
            console.log('tokens = ', obj[key]) ;
            let index_token = 0 ;            
            //const groupedByToken = Object.groupBy(obj[key], myCallback);
            groupedByToken = obj[key].groupBy( item => {
               item['index'] = index_token ;
               console.log('item = ', item) ;
               index_token++ ;
               return item.token ;
            }) ;            
            console.log('groupedByToken = ', groupedByToken) ;               
            break ;
         case 'poss':            
            const pos = obj[key] ;
            console.log('pos = ', pos) ;
            Object.keys(groupedByToken).forEach((key) => {
               //console.log('key = ', key) ;
               //console.log('groupedByToken[key] = ', groupedByToken[key]) ;
               groupedByToken[key].forEach((item) => {                  
                  if (pos.length > 1) {
                     item['pos'] = pos[0].pos ;
                     item['pos_next'] = pos[1].pos ;
                     console.log('item = ', item) ;                  
                     tokenAll.tokenAll.push(item) ; 
                  } else {
                     item['pos'] = pos[0].pos ;
                     console.log('item = ', item) ;                     
                     tokenAll.tokenAll.push(item) ; 
                  }
               }) ;                
            }) ;            
            //console.log('tokenAll = ', tokenAll) ;
            console.log('tokenAll = ', JSON.stringify(tokenAll)) ;
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
let json_in = fs.readFileSync('./staticSearch/ssTokens_template.json', 'utf8'); 

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

buildSearchTest(jsonJs_in) ;

let jsonJs_out = tokenAll ;

//convert js object to tei
//var json_out = convert.js2json(jsonJs_out, {compact: false, spaces: 2}) ;
var json_out = JSON.stringify(jsonJs_out, null, 2) ;
//write tei file
fs.writeFileSync('./staticSearch/tokens/tokenAll.json', json_out ) ;  
