// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
//const ShortUniqueId = require('short-unique-id');
const { exit } = require("process") ;
var convert = require('xml-js') ;
const { group } = require("console");

// Creating a window with a document
const dom = new jsdom.JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>
//Instantiate ShortUniqueId
//const uid = new ShortUniqueId({ length: 10 });

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_txt=process.env.filepath_out_txt ;

function posStr2Nr(posStr) {
   //let pos_tmp = posStr.substring(title_short.length + 1) ;   
   let pos_tmp = +posStr.substring(posStr.lastIndexOf('_')+1) ;
   return +pos_tmp ;
}

function posNr2Str(posNr, posStr) {
   //let pos_tmp = title_short + '_' + posNr.toString() ;
   let pos_tmp = posStr.substring(0, posStr.lastIndexOf('_')) + '_' + posNr.toString() ;   
   return pos_tmp ;
}

//read compare data json file
let json_in = fs.readFileSync('data/json/annoCompData_temp.json', 'utf8') ;
console.log('json data read: ', json_in.length, ' bytes') ;
let jsonJs_in = JSON.parse(json_in) ;
let annoCompData_results = jsonJs_in ;
let annoCompData_temp = jsonJs_in.results.bindings[0] ;
//delete template object
delete annoCompData_results.results.bindings[0] ;   //after delete first object is null
annoCompData_results.results.bindings.shift() ;
//read anno compare json file
//get compare data
json_in = fs.readFileSync('data/json/anno/annoTextComp.json', 'utf8') ;
console.log('json data read: ', json_in.length, ' bytes') ;
let annoCompTexts = JSON.parse(json_in) ;
//group anno compare data by source_target
let groupedBySourceTarget = annoCompTexts.results.bindings.groupBy( item => {
    return item.source_target.value ;    
} ) ;
console.log('groupedBySourceTarget') ;
Object.keys(groupedBySourceTarget).forEach((key, index) => {
    console.log(key) ;
    //add to data object
    annoCompData_temp.source_target = key ;  

    let groupedBySourceBody = groupedBySourceTarget[key].groupBy( item => {
        return item.source_body.value ;        
    }) ;
    Object.keys(groupedBySourceBody).forEach((key, index) => {
        annoCompData_temp.source_body.push(JSON.parse(JSON.stringify(key))) ;
    }) ;    
    annoCompData_results.results.bindings.push(JSON.parse(JSON.stringify(annoCompData_temp))) ;
    //reset temp object
    annoCompData_temp.source_body = [] ;    
}) ;
//write compare data json file
let json_out = JSON.stringify(annoCompData_results) ;
fs.writeFileSync('data/json/annoCompData.json', json_out) ;
console.log('json data written: ', json_out.length, ' bytes') ;