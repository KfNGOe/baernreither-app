// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
const TokenizeThis = require('tokenize-this');
const { groupBy } = require('core-js/actual/array/group-by') ;

var convert = require('xml-js');
const { exit } = require("process");
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
const filepath_in_json_xlsx=process.env.filepath_in_json_xlsx ;
const filepath_out_tei=process.env.filepath_out_tei ;

function camelCase2Normal(key) {
   //search key in xlsx2jsonJs_in
   for (let i = 0; i < xlsx2jsonJs_in.Tabelle1.length; i++) {
      if (xlsx2jsonJs_in.Tabelle1[i].C === key) {
         return xlsx2jsonJs_in.Tabelle1[i].A.substr(xlsx2jsonJs_in.Tabelle1[i].A.lastIndexOf('/')+1) ;
         //break
      }
   }  
} ;

function buildOrg(obj) {     
   
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
         case 'declaration':
            //console.log('declaration = ', obj[key]) ;
            break ;
         case 'instruction':
            //console.log('instruction = ', obj[key]) ;
            break ;
         case 'elements':
            //console.log('elements = ',obj[key]) ;
            if(Array.isArray(obj[key])) {               
               //level + 1
               obj[key].forEach((item, index, array) => {
                  if (typeof item === 'object') {
                     //console.log('item = ', item, ', index = ', index) ;          
                     buildOrg(item) ;
                  }
               }) ;
               //level - 1               
            } else {
               //console.log(obj.constructor.name, 'property is not an array: ', key) ;
            }
            break ;            
         case 'attributes':
            //console.log('attributes =  ', obj[key]) ;            
            break ;         
         case 'type':
            //console.log('result: ',obj[key]) ;
            break ;
         case 'name':
            if(obj[key] === 'list') {
               let itemDataTemp = [] ;
               let itemDataTempSub = [] ;
               let itemDataTempPos = [] ;
               let temp = [] ;
               //init templates               
               itemDataTemp.push(obj.elements[0]) ;               
               obj.elements = [] ;               
               itemDataTempSub.push(itemDataTemp[0].elements[1]) ;               
               itemDataTempPos.push(itemDataTemp[0].elements[2]) ;               
               itemDataTemp[0].elements.pop(itemDataTempSub[0]) ;
               itemDataTemp[0].elements.pop(itemDataTempPos[0]) ;               
               //group by key                
               const groupedByMain = jsonJs_in.results.bindings.groupBy( item => {
                  return item.o_key_org.value ;
               }) ;               
               //iterate over main
               Object.keys(groupedByMain).forEach((key) => {                  
                  let termMain = camelCase2Normal(key) ;                   
                  itemDataTemp[0].elements[0].elements[0].text = termMain ;
                  //check if sub exists
                  if (groupedByMain[key].some(item => item.o_pid_org)) {
                     //filter and group by sub
                     const groupedBySub = groupedByMain[key].filter(item => item.o_pid_org).groupBy( item => {
                        return item.o_pid_org.value ;                        
                     }) ;                     
                     //iterate over sub       
                     Object.keys(groupedBySub).forEach((key) => {                        
                        let termSub = key ;                        
                        itemDataTempSub[0].elements[0].text = termSub ;
                        //push sub to main (JSON.parse(JSON.stringify()) is used to copy by value)
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[0]))) ;
                        //check if pos exists
                        if (groupedBySub[key].some(item => item.o_pos_org)) {
                           //iterate over pos
                           groupedBySub[key].forEach((item) => {
                              let termPos = item.o_pos_org.value ;
                              itemDataTempPos[0].elements[0].text = termPos ;                           
                              itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempPos[0]))) ;                              
                           }) ;
                        } else {
                           console.log('error: no pos') ;
                        }                        
                     }) ;
                  //no sub                     
                  } else {
                     //check if pos exists
                     if (groupedByMain[key].some(item => item.o_pos_org)) {                        
                        //iterate over pos
                        groupedByMain[key].forEach((item) => {
                           let termPos = item.o_pos_org.value ;
                           itemDataTempPos[0].elements[0].text = termPos ;                           
                           itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempPos[0]))) ;                           
                        }) ;
                     } else {
                        console.log('error: no pos') ;                        
                     }
                  }
                  //push item to temp (JSON.parse(JSON.stringify()) is used to copy by value)
                  temp.push(JSON.parse(JSON.stringify(itemDataTemp[0]))) ;                  
                  //delete all elements except first
                  let delCount = itemDataTemp[0].elements.length-1 ;
                  itemDataTemp[0].elements.splice(1,delCount) ;                  
               }) ;
               //copy temp to obj
               obj.elements = temp.slice() ;               
            }            
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
/*
var tokenizer = new TokenizeThis();
var str = filepath_in_json_xlsx ;
var tokens = [];
tokenizer.tokenize(str, function(token) {
    tokens.push(token);
});
console.log(tokens) ;
*/

//read org template tei file
let tei_in = fs.readFileSync(filepath_in_tei, 'utf8'); //./data/tei/register/register_org_template.xml
console.log('tei data read: ', tei_in.length, ' bytes') ;

//convert tei to js object
var teiJs_in = convert.xml2js(tei_in, {compact: false, spaces: 2}) ;

//read org json file
let json_in = fs.readFileSync(filepath_in_json, 'utf8'); //./data/json/register/register_org.json
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

//read org xlsx to json file
json_in = fs.readFileSync(filepath_in_json_xlsx, 'utf8'); //./data/json_xlsx/org_xlsx.json
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var xlsx2jsonJs_in = JSON.parse(json_in) ;

buildOrg(teiJs_in) ;

let teiJs_out = teiJs_in ;

//convert js object to tei
var tei_out = convert.js2xml(teiJs_out, {compact: false, spaces: 2}) ;
//write tei file
fs.writeFileSync(filepath_out_tei, tei_out ) ;  //./data/tei/register/register_org.xml
console.log('tei data written: ', tei_out.length, ' bytes')