// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { exit } = require("process") ;

var convert = require('xml-js') ;
var i_N = 0 ;
var N = 0 ;
var i_level = 0 ;
var i_startTag = 0 ; 
var i_endTag = 0 ;

// Creating a window with a document
const dom = new JSDOM(`
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
               let itemDataTempMain = [] ;
               let itemDataTempSub = [] ;
               let itemDataTempPos = [] ;
               let temp = [] ;
               //init templates               
               itemDataTemp.push(obj.elements[0]) ;
               obj.elements = [] ;
               itemDataTempMain.push(itemDataTemp[0].elements[0]) ;  //lemma = o_key_org
               itemDataTempSub.push(itemDataTemp[0].elements[1]) ; //o_pid_org
               itemDataTempPos.push(itemDataTemp[0].elements[2]) ; //o_pos_org
               //delete templates
               itemDataTemp[0].elements.shift(itemDataTempMain) ;   //delete lemma template   
               itemDataTemp[0].elements.shift(itemDataTempSub) ;  //delete pid template
               itemDataTemp[0].elements.pop(itemDataTempPos) ;  //delete pos template
               //check if keys exists
               if (jsonJs_in.results.bindings.some(item => item.o_key_org)) {
                  //group by key                
                  groupedByMain = jsonJs_in.results.bindings.groupBy( item => {  //register_org.json
                     return item.o_key_org.value ;
                  }) ;               
               } else {
                     console.log('error: no keys') ;
               }              
               //iterate over main
               Object.keys(groupedByMain).forEach((key) => {                  
                  let termLemma = camelCase2Normal(key) ;                   
                  console.log('termLemma = ', termLemma) ;
                  itemDataTempMain[0].elements[0].text = termLemma ;
                  itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempMain[0]))) ;
                  //check if pid exists                    
                  if (groupedByMain[key].some(item => item.o_pid_org)) {
                     let termPid = groupedByMain[key][0].o_pid_org.value ;
                     itemDataTempSub[0].elements[0].text = termPid ;
                     itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[0]))) ;
                  } else {
                      console.log('no pid') ;
                  }
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
                  //push item to temp (JSON.parse(JSON.stringify()) is used to copy by value)
                  temp.push(JSON.parse(JSON.stringify(itemDataTemp[0]))) ;                  
                  //delete all elements except first
                  let delCount = itemDataTemp[0].elements.length ;
                  itemDataTemp[0].elements.splice(0,delCount) ;                  
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

//read org template tei file
let tei_in = fs.readFileSync(filepath_in_tei, 'utf8'); //./data/tei/anno/register/register_org_temp.xml

//convert tei to js object
var teiJs_in = convert.xml2js(tei_in, {compact: false, spaces: 2}) ;

//read org json file
let json_in = fs.readFileSync(filepath_in_json, 'utf8'); //./data/json/anno/register/register_org.json

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

//read org xlsx to json file
json_in = fs.readFileSync(filepath_in_json_xlsx, 'utf8'); //./data/json_xlsx/org_xlsx.json

//convert json to js object
var xlsx2jsonJs_in = JSON.parse(json_in) ;

buildOrg(teiJs_in) ;

let teiJs_out = teiJs_in ;

//convert js object to tei
var tei_out = convert.js2xml(teiJs_out, {compact: false, spaces: 2}) ;
//write tei file
fs.writeFileSync(filepath_out_tei, tei_out ) ;  //./data/tei/anno/register/register_org.xml
