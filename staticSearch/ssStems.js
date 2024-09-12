// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { findIndex } = require('core-js/actual/array/find-index') ;
const { sort } = require('core-js/actual/array/sort') ;
const { exit } = require("process");

const separator = '|' ;
var groupedByToken = {} ;
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

function buildStems(tokenAll_tmp) {   //obj -> tokenAll_tmp    
    ssTokenStr = separator + ssTokenStr ;
    //group by token
    groupedByToken = tokenAll_tmp.tokenAll.groupBy( item => {        
        return item.token ;
    }) ;
    //get index of token in tokenAll_tmp
    let tokenAll_tmp_index = {} ;
    tokenAll_tmp_index['tokenAll'] = [] ;
    let item_tmp_index = {} ;
    tokenAll_tmp.tokenAll.forEach((item, index, array) => {
        item_tmp_index['token'] = item.token ;
        item_tmp_index['index_tok_all'] = index ;
        tokenAll_tmp_index.tokenAll.push(item_tmp_index) ;
        item_tmp_index = {} ;
    }) ;
    //group index by token
    let groupedByToken_index = {} ;
    groupedByToken_index = tokenAll_tmp_index.tokenAll.groupBy( item => {
        return item.token ;
    }) ;
    let allKeys = Object.keys(groupedByToken) ;
    allKeys.sort() ;
    allKeys.forEach((key) => {        
        ssTokenStr = ssTokenStr + key + separator + separator ;        
        console.log('key = ', key) ;
        instances_tmp = [] ;
        instance_tmp = {} ;
        //build instances
        groupedByToken[key].forEach((item, index, array) => {
            //console.log('item = ', item) ;                        
            instance_tmp.index = item.index ;                        
            if (item.pos_nxt !== undefined) {
                instance_tmp.pos_pr = item.pos_pr ;
                instance_tmp.pos_nxt = item.pos_nxt ;
                //get token next and previous uri
                let flag_tok_index = false ;
                groupedByToken_index[item.token].forEach((item, index, array) => {
                    let token_tmp = tokenAll_tmp.tokenAll[item.index_tok_all] ;
                    if (token_tmp.index === instance_tmp.index && token_tmp.pos_pr === instance_tmp.pos_pr && token_tmp.pos_nxt === instance_tmp.pos_nxt) {
                        flag_tok_index = true ;
                        if (item.index_tok_all + 1 < countArrNr) {
                            instance_tmp.token_next_uri = tokenAll_tmp.tokenAll[item.index_tok_all + 1].token + '.json' ;                            
                        }
                        if (item.index_tok_all > 0) {
                            instance_tmp.token_prev_uri = tokenAll_tmp.tokenAll[item.index_tok_all - 1].token + '.json' ;                            
                        }                        
                    }                    
                }) ;
                if (!flag_tok_index) {
                    console.log('index of token not found') ;
                }                                
            } else {                
                instance_tmp.pos = item.pos ;
                //get token next and previous uri
                let flag_tok_index = false ;
                groupedByToken_index[item.token].forEach((item, index, array) => {
                    let token_tmp = tokenAll_tmp.tokenAll[item.index_tok_all] ;
                    if (token_tmp.index === instance_tmp.index && token_tmp.pos === instance_tmp.pos) {
                        flag_tok_index = true ;
                        if (item.index_tok_all + 1 < countArrNr) {
                            instance_tmp.token_next_uri = tokenAll_tmp.tokenAll[item.index_tok_all + 1].token + '.json' ;
                        }
                        if (item.index_tok_all > 0) {
                            instance_tmp.token_prev_uri = tokenAll_tmp.tokenAll[item.index_tok_all - 1].token + '.json' ;
                        }
                    }                    
                }) ;
                if (!flag_tok_index) {
                    console.log('index of token not found') ;
                }               
            }
            instance_tmp.chN = item.chN ;            
            instances_tmp.push(instance_tmp) ;
            instance_tmp = {} ;
        }) ;
        ssStem_tmp.token = key ;
        ssStem_tmp.instances = instances_tmp ;        
        let ssStem_filePath = './staticSearch/stems/' + key + '.json' ;
        json_out = JSON.stringify(ssStem_tmp, null, 2) ;
        fs.writeFileSync(ssStem_filePath, json_out ) ;
        //console.log(key,': json data written: ', json_out.length, ' bytes')
    }) ;
    ssTokenStr = ssTokenStr.endsWith(separator) ? ssTokenStr.slice(0, -1) : ssTokenStr ;
} ; 

console.time('buildStems') ;
//read test json file
let json_in = fs.readFileSync('./staticSearch/tokens/tokenAll_tmp.json', 'utf8');
console.log('json data read: ', json_in.length, ' bytes') ;
//convert json to js object
let tokenAll_tmp = JSON.parse(json_in) ;
countArrNr = tokenAll_tmp.tokenAll.length ;
buildStems(tokenAll_tmp) ;
//write text file
fs.writeFileSync('./staticSearch/ssTokenString.txt', ssTokenStr ) ;
console.log('text data written: ', ssTokenStr.length, ' bytes') ;
console.timeEnd('buildStems') ;