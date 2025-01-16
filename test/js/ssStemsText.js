// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { findIndex } = require('core-js/actual/array/find-index') ;
const { sort } = require('core-js/actual/array/sort') ;
const { exit } = require("process");

const separator = '|' ;
const title_short = 'Bae_TB_8' ;
var groupedByToken = {} ;
var tokenAll = {
   "tokenAll": []
} ;
var index_tokenAll = 0 ;
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

function buildStemsText(tokenTextAll_tmp) {
    groupedByPos = tokenTextAll_tmp.tokenTextAll.groupBy( item => {
        //item['index'] = index_token ;
        return item.posText ;
    }) ;
    let allKeys = Object.keys(groupedByPos) ;
    let keyLength = allKeys.length ;
    //allKeys.sort() ;
    allKeys.forEach((key,index_key) => {        
        let ssStemText_tmp = groupedByPos[key][0] ;        
        delete ssStemText_tmp['posText'] ;
        //get previous and next token text
        if(index_key > 0 && index_key < keyLength - 1) {
            let prevKey = allKeys[index_key - 1] ;
            let nextKey = allKeys[index_key + 1] ;
            ssStemText_tmp['pos_prev'] = prevKey ;
            ssStemText_tmp['pos_next'] = nextKey ;
        } else {
            if(index_key === 0) {
                let nextKey = allKeys[index_key + 1] ;
                ssStemText_tmp['pos_next'] = nextKey ;
            } else {
                let prevKey = allKeys[index_key - 1] ;
                ssStemText_tmp['pos_prev'] = prevKey ;
            } 
        }
        let ssStemText_filePath = './staticSearch/data/json/stemsText/' + key + '.json' ;
        json_out = JSON.stringify(ssStemText_tmp, null, 2) ;
        fs.writeFileSync(ssStemText_filePath, json_out ) ;
        console.log(key,' at', index_key,': json data written: ', json_out.length, ' bytes')
    }) ;
} ; 

//read test json file
let json_in = fs.readFileSync('./staticSearch/tokensText/ssTokensText_tmp.json', 'utf8');
//convert json to js object
let tokenTextAll_tmp = JSON.parse(json_in) ;
buildStemsText(tokenTextAll_tmp) ;
//write text file
fs.writeFileSync('./staticSearch/ssTokenString.txt', ssTokenStr ) ;
