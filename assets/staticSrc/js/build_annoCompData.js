// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
//const ShortUniqueId = require('short-unique-id');
const { exit } = require("process") ;
var convert = require('xml-js') ;
const { group } = require("console");

// Creating a window with a document
const dom = new JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>

//read compare data json file
let json_in = fs.readFileSync('data/json/temp/textComp_mdata_temp.json', 'utf8') ;
let jsonJs_in = JSON.parse(json_in) ;
let textComp_mdata_results = jsonJs_in ;
let textComp_mdata_temp = jsonJs_in.results.bindings[0] ;
//delete template object
delete textComp_mdata_results.results.bindings[0] ;   //after delete first object is null
textComp_mdata_results.results.bindings.shift() ;
//read anno compare json file
//get compare data
json_in = fs.readFileSync('data/json/anno/anno_web/annoTextComp.json', 'utf8') ;
let annoCompTexts = JSON.parse(json_in) ;
//group anno compare data by source_target
let groupedBySourceTarget = annoCompTexts.results.bindings.groupBy( item => {
    return item.source_target.value ;    
} ) ;
Object.keys(groupedBySourceTarget).forEach((key, index) => {    
    //add to data object
    textComp_mdata_temp.source_target = key ;  

    let groupedBySourceBody = groupedBySourceTarget[key].groupBy( item => {
        return item.source_body.value ;        
    }) ;
    Object.keys(groupedBySourceBody).forEach((key, index) => {
        textComp_mdata_temp.source_body.push(JSON.parse(JSON.stringify(key))) ;
    }) ;    
    textComp_mdata_results.results.bindings.push(JSON.parse(JSON.stringify(textComp_mdata_temp))) ;
    //reset temp object
    textComp_mdata_temp.source_body = [] ;    
}) ;
//write compare data json file
let json_out = JSON.stringify(textComp_mdata_results) ;
fs.writeFileSync('data/json/text/mdata/textComp_mdata.json', json_out) ;
