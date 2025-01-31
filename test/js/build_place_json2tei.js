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
const filepath_in_json_temp=process.env.filepath_in_json_temp ;
const filepath_out_tei=process.env.filepath_out_tei ;

function buildPlace(obj) {     
   
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
                     buildPlace(item) ;
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
               //const groupedByMain = [] ;
               //const groupedByMain_tmp = [] ;
               let itemDataTemp = [] ;
               let itemDataTempMain = [] ;
               let itemDataTempSub = [] ;
               let itemDataTempPos = [] ;
               let temp = [] ;
               //init templates               
               itemDataTemp.push(obj.elements[0]) ; 
               obj.elements = [] ;
               itemDataTempMain.push(itemDataTemp[0].elements[0]) ;  //lemma = o_key_place               
               itemDataTempSub.push(itemDataTemp[0].elements[1]) ;  //desc = .D
               itemDataTempSub.push(itemDataTemp[0].elements[2]) ;  //pid = o_pid_place               
               itemDataTempSub.push(itemDataTemp[0].elements[3]) ;  //lat = .G
               itemDataTempSub.push(itemDataTemp[0].elements[4]) ;  //long = .H
               itemDataTempPos.push(itemDataTemp[0].elements[5]) ;  //pos = o_pos_place 
               //delete templates
               itemDataTemp[0].elements.shift(itemDataTempMain) ;   //delete lemma template
               itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete desc template
               itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete pid template
               itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete lat template
               itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete long template
               itemDataTemp[0].elements.shift(itemDataTempPos) ;   //delete pos template
               //check if keys exists
               if (jsonJs_in.results.bindings.some(item => item.o_key_place)) {
                    //group by key                
                    groupedByMain = jsonJs_in.results.bindings.groupBy( item => {  //register_place.json
                    return item.o_key_place.value ;
                }) ;
               } else {
                    console.log('error: no keys') ;
               }
                //check if keys temp exists
               if (jsonJs_in_temp.Tabelle1.some(item => item.B)) {
                    //group by key temp
                    groupedByMain_tmp = jsonJs_in_temp.Tabelle1.groupBy( item => {  //register_place_temp.json
                    return item.B ;
                 }) ;         
               } else {
                    console.log('error: no keys temp') ;
               }                              
               //iterate over main
                Object.keys(groupedByMain).forEach((key) => {                    
                    let termLemma = key ;
                    console.log('termLemma = ', termLemma) ;
                    itemDataTempMain[0].elements[0].text = termLemma ;
                    itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempMain[0]))) ;
                    //check if desc exists
                    if (groupedByMain_tmp[key].some(item => item.D)) {
                        let termDesc = groupedByMain_tmp[key][0].D ;
                        itemDataTempSub[0].elements[0].text = termDesc ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[0]))) ;
                    } else {
                        console.log('no desc') ;
                    }
                    //check if pid exists                    
                    if (groupedByMain[key].some(item => item.o_pid_place)) {
                        let termPid = groupedByMain[key][0].o_pid_place.value ;
                        itemDataTempSub[1].elements[0].text = termPid ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[1]))) ;
                    } else {
                        console.log('no pid') ;
                    }
                    //check if lat exists
                    if (groupedByMain_tmp[key].some(item => item.Lat)) {
                        let termLat = groupedByMain_tmp[key][0].Lat ;
                        itemDataTempSub[2].elements[0].text = termLat ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[2]))) ;
                    } else {
                        console.log('no lat') ;
                    }
                    //check if long exists
                    if (groupedByMain_tmp[key].some(item => item.Long)) {
                        let termLong = groupedByMain_tmp[key][0].Long ;
                        itemDataTempSub[3].elements[0].text = termLong ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[3]))) ;
                    } else {
                        console.log('no long') ;
                    }                    
                    //check if pos exists
                    if (groupedByMain[key].some(item => item.o_pos_place)) {
                        //iterate over pos
                        groupedByMain[key].forEach((item) => {
                            let termPos = item.o_pos_place.value ;
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

//read place template tei file
let tei_in = fs.readFileSync(filepath_in_tei, 'utf8'); //./data/tei/anno/register/register_place_temp.xml

//convert tei to js object
var teiJs_in = convert.xml2js(tei_in, {compact: false, spaces: 2}) ;

//read place json file
let json_in = fs.readFileSync(filepath_in_json, 'utf8'); //./data/json/anno/register/register_place.json

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

//read place json file
json_in = fs.readFileSync(filepath_in_json_temp, 'utf8'); //./data/json/anno/register/register_place_temp.json

//convert json to js object
var jsonJs_in_temp = JSON.parse(json_in) ;

buildPlace(teiJs_in) ;

let teiJs_out = teiJs_in ;

//convert js object to tei
var tei_out = convert.js2xml(teiJs_out, {compact: false, spaces: 2}) ;
//write tei file
fs.writeFileSync(filepath_out_tei, tei_out ) ;  //./data/tei/anno/register/register_place.xml
