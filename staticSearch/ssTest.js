// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;
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
const filepath_out_tei=process.env.filepath_out_tei ;

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
            const groupedByToken = obj[key].groupBy( item, index => {
                item['index'] = index ;
                console.log('item = ', item) ;
                return item.token ;
             }) ;
             console.log('groupedByToken = ', groupedByToken) ;               
            break ;
         case 'poss':
            console.log('poss = ', obj[key]) ;
            break ;
         case 'name':
            if(obj[key] === 'list') {
               let indexDataTemp = [] ;
               let indexDataTempSub = [] ;
               let indexDataTempPos = [] ;
               let temp = [] ;
               //init templates               
               indexDataTemp.push(obj.elements[0]) ;               
               obj.elements = [] ;               
               indexDataTempSub.push(indexDataTemp[0].elements[1]) ;               
               indexDataTempPos.push(indexDataTemp[0].elements[2]) ;               
               indexDataTemp[0].elements.pop(indexDataTempSub[0]) ;
               indexDataTemp[0].elements.pop(indexDataTempPos[0]) ;               
               //group by main                
               const groupedByMain = jsonJs_in.results.bindings.groupBy( item => {
                  return item.o_main.value ;
               }) ;
               //iterate over main
               Object.keys(groupedByMain).forEach((key) => {                  
                  let termMain = key ;
                  indexDataTemp[0].elements[0].elements[0].text = termMain ;
                  //check if sub exists
                  if (groupedByMain[key].some(item => item.o_sub)) {
                     //filter and group by sub
                     const groupedBySub = groupedByMain[key].filter(item => item.o_sub).groupBy( item => {
                        return item.o_sub.value ;                        
                     }) ;                     
                     //iterate over sub       
                     Object.keys(groupedBySub).forEach((key) => {                        
                        let termSub = key ;                        
                        indexDataTempSub[0].elements[0].text = termSub ;
                        //push sub to main (JSON.parse(JSON.stringify()) is used to copy by value)
                        indexDataTemp[0].elements.push(JSON.parse(JSON.stringify(indexDataTempSub[0]))) ;                        
                        if (groupedBySub[key].some(item => item.o_pos_main)) {
                           groupedBySub[key].forEach((item) => {
                              let termPos = item.o_pos_main.value ;
                              indexDataTempPos[0].elements[0].text = termPos ;                           
                              indexDataTemp[0].elements.push(JSON.parse(JSON.stringify(indexDataTempPos[0]))) ;                              
                           }) ;
                        } else {
                           console.log('error: no pos_main') ;
                        }                        
                     }) ;                     
                  } else {
                     if (groupedByMain[key].some(item => item.o_pos_main)) {
                        groupedByMain[key].forEach((item) => {
                           let termPos = item.o_pos_main.value ;
                           indexDataTempPos[0].elements[0].text = termPos ;                           
                           indexDataTemp[0].elements.push(JSON.parse(JSON.stringify(indexDataTempPos[0]))) ;                           
                        }) ;
                     } else {
                        console.log('error: no pos_main') ;                        
                     }
                  }
                  //push item to temp (JSON.parse(JSON.stringify()) is used to copy by value)
                  temp.push(JSON.parse(JSON.stringify(indexDataTemp[0]))) ;                  
                  //delete all elements except first
                  let delCount = indexDataTemp[0].elements.length-1 ;
                  indexDataTemp[0].elements.splice(1,delCount) ;                  
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

//read test json file
let json_in = fs.readFileSync('./staticSearch/ssTokens_template.json', 'utf8'); 
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

buildSearchTest(jsonJs_in) ;

let teiJs_out = teiJs_in ;

//convert js object to tei
var tei_out = convert.js2xml(teiJs_out, {compact: false, spaces: 2}) ;
//write tei file
fs.writeFileSync(filepath_out_tei, tei_out ) ;  //./data/tei/register/register_index.xml
console.log('tei data written: ', tei_out.length, ' bytes')