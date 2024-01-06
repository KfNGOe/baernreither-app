// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { findIndex } = require('core-js/actual/array/find-index') ;
const { sort } = require('core-js/actual/array/sort') ;
const { exit } = require("process");

const separator = '|' ;
const escChar = '\\' ;
const title_short = 'Bae_TB_8' ;
var groupedByToken = {} ;
var tokenAll = {
   "tokenAll": []
} ;
var ssTokenStr = '' ;
var ssStem_tmp = {
    "token": "",
    "instances": []
} ;
var instances_tmp = [] ;
var instance_tmp = {
    "docId": "",
    "index": NaN,
    "pos": "",
    "token_next_uri": ""
} ;
var json_out = '' ;
var countArrNr = 0 ;

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

function buildSearchStems(obj) {   
   Object.keys(obj).forEach((key) => {
      switch(key) {
         case 'tokenAll':
            if(Array.isArray(obj[key])) {
                ssTokenStr = separator + ssTokenStr ;
                groupedByToken = obj[key].groupBy( item => {
                    //item['index'] = index_token ;
                    return item.token ;
                }) ;
                let allKeys = Object.keys(groupedByToken) ;
                allKeys.sort() ;
                allKeys.forEach((key) => {
                    console.log('key = ', key) ;
                    ssTokenStr = ssTokenStr + key + separator + separator ;
                    console.log('obj[key] = ', groupedByToken[key]) ;
                    instances_tmp = [] ;
                    instance_tmp = {} ;
                    groupedByToken[key].forEach((item, index, array) => {
                        console.log('item = ', item) ;
                        instance_tmp.docId = title_short ;
                        instance_tmp.index = item.index ;
                        instance_tmp.pos = item.pos ;
                        let index_tokenAll = jsonJs_in.tokenAll.findIndex(item => item.token === key && item.index === instance_tmp.index && item.pos === instance_tmp.pos) ;
                        console.log('index_tokenAll = ', index_tokenAll) ;
                        if (index_tokenAll > -1) {
                            if (index_tokenAll + 1 < countArrNr) {
                                instance_tmp.token_next_uri = jsonJs_in.tokenAll[index_tokenAll + 1].token + '.json' ;
                                console.log('instance_tmp = ', instance_tmp.token_next_uri) ;
                            } else {
                                console.log('instance_tmp = ', instance_tmp.token_next_uri) ;
                            }                       
                        } else {
                            console.log('index of token not found') ;                            
                        }
                        instances_tmp.push(instance_tmp) ;
                        instance_tmp = {} ;
                    }) ;
                    ssStem_tmp.token = key ;
                    ssStem_tmp.instances = instances_tmp ;
                    console.log('ssStem_tmp = ', ssStem_tmp) ;
                    let ssStem_filePath = './staticSearch/stems/' + key + '.json' ;
                    json_out = JSON.stringify(ssStem_tmp, null, 2) ;
                    fs.writeFileSync(ssStem_filePath, json_out ) ;
                    console.log('json data written: ', json_out.length, ' bytes')
                }) ;                               
             } else {
             }
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
let json_in = fs.readFileSync('./staticSearch/tokens/tokenAll_test.json', 'utf8');
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

countArrNr = jsonJs_in.tokenAll.length ;    

buildSearchStems(jsonJs_in) ;

let jsonJs_out = groupedByToken ;

//convert js object to tei
//var json_out = convert.js2json(jsonJs_out, {compact: false, spaces: 2}) ;
json_out = JSON.stringify(jsonJs_out, null, 2) ;
//write tei file
fs.writeFileSync('./staticSearch/ssStems_tmp.json', json_out ) ;
console.log('json data written: ', json_out.length, ' bytes')