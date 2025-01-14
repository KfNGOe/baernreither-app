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

//function buildList(obj) {}

function buildPerson(obj) {   
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
                     buildPerson(item) ;
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
               let itemDataTemp = [] ;
               let itemDataTempMain = [] ;
               let itemDataTempSub = [] ;
               let itemDataTempPos = [] ;
               let temp = [] ;
               //init templates               
               itemDataTemp.push(obj.elements[0]) ; 
               //console.log('itemDataTemp = ', JSON.stringify(itemDataTemp)) ;
               obj.elements = [] ;
               itemDataTempMain.push(itemDataTemp[0].elements[0]) ; //.key = o_key_person
               itemDataTempSub.push(itemDataTemp[0].elements[1]) ;  //id = .id
               itemDataTempSub.push(itemDataTemp[0].elements[2]) ;  //.surname = .A
               itemDataTempSub.push(itemDataTemp[0].elements[3]) ;  //.forename = .C
               itemDataTempSub.push(itemDataTemp[0].elements[4]) ;  //.addName = .B
               itemDataTempSub.push(itemDataTemp[0].elements[5]) ;  //.birth = .D
               itemDataTempSub.push(itemDataTemp[0].elements[6]) ;  //.death = .E 
               itemDataTempSub.push(itemDataTemp[0].elements[7]) ;  //.desc = .F
               itemDataTempSub.push(itemDataTemp[0].elements[8]) ;  //.pid = o_pid_person               
               itemDataTempPos.push(itemDataTemp[0].elements[9]) ;  //.pos = o_pos_person 
               //delete templates
                itemDataTemp[0].elements.shift(itemDataTempMain) ;   //delete key template
                itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete id template
                itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete surname template
                itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete forname template
                itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete addname template
                itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete birth template
                itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete death template
                itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete desc template
                itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete pid template
                itemDataTemp[0].elements.shift(itemDataTempPos) ;   //delete pos template
                               
               //group by key                
               groupedByMain = jsonJs_in.results.bindings.groupBy( item => {  //register_person.json
               return item.key ;
               }) ; 
                              
                //check if keys temp exists
                /*
               if (jsonJs_in_xlsx.Tabelle1.some(item => item.H)) {
                    //group by key temp
                    groupedByMain_tmp = jsonJs_in_xlsx.Tabelle1.groupBy( item => {  //person_xlsx.json
                    return item.H ;
                 }) ;         
               } else {
                    console.log('error: no keys tmp') ;
               }
               */                              
               //iterate over persons
                Object.keys(groupedByMain).forEach((key) => {                    
                    let termKey = key ;
                    console.log('termKey = ', termKey) ;
                    //key
                    itemDataTempMain[0].elements[0].text = termKey ;
                    itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempMain[0]))) ;
                    //check if id exists
                     if (groupedByMain[key].some(item => item.id)) {
                        let termId = groupedByMain[key][0].id ;
                        itemDataTempSub[0].elements[0].text = termId ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[0]))) ;
                     } else {
                        console.log('no id') ;
                     }
                     //check if surname exists
                    if (groupedByMain[key].some(item => item.surname)) {
                        let termSur = groupedByMain[key][0].surname ;
                        itemDataTempSub[1].elements[0].text = termSur ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[1]))) ;
                    } else {
                        console.log('no surname') ;
                    }
                    //check if forname exists                    
                    if (groupedByMain[key].some(item => item.forename)) {
                        let termFor = groupedByMain[key][0].forename ;
                        itemDataTempSub[2].elements[0].text = termFor ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[2]))) ;
                    } else {
                        console.log('no forname') ;
                    }
                    //check if addname exists
                    if (groupedByMain[key].some(item => item.addName)) {
                        let termAdd = groupedByMain[key][0].addName ;
                        itemDataTempSub[3].elements[0].text = termAdd ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[3]))) ;
                    } else {
                        console.log('no addname') ;
                    }
                    //check if birth exists
                    if (groupedByMain[key].some(item => item.birth)) {
                        let termBirth = groupedByMain[key][0].birth ;
                        itemDataTempSub[4].elements[0].text = termBirth ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[4]))) ;
                    } else {
                        console.log('no birth') ;
                    }
                    //check if death exists
                    if (groupedByMain[key].some(item => item.death)) {
                     let termDeath = groupedByMain[key][0].death ;
                     itemDataTempSub[5].elements[0].text = termDeath ;
                     itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[5]))) ;
                     } else {
                           console.log('no death') ;
                     }
                     //check if desc exists
                     if (groupedByMain[key].some(item => item.desc)) {
                     let termDesc = groupedByMain[key][0].desc ;
                     itemDataTempSub[6].elements[0].text = termDesc ;
                     itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[6]))) ;
                     } else {
                           console.log('no description') ;
                     }
                     //check if pid exists
                     if (groupedByMain[key].some(item => item.pid)) {
                        let termPid = groupedByMain[key][0].pid ;
                        itemDataTempSub[7].elements[0].text = termPid ;
                        itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[7]))) ;
                        } else {
                              console.log('no pid') ;
                        }                    
                    //check if pos exists
                    if (groupedByMain[key].some(item => item.pos)) {
                        //iterate over pos
                        groupedByMain[key].forEach((item) => {
                            let termPos = item.pos ;
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
            //test if key is number
            if(!isNaN(obj[key])) {               
               //to string
               obj[key] = obj[key].toString() ;               
            }            
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

//read person template tei file
let tei_in = fs.readFileSync('./data/tei/register/register_person_template.xml', 'utf8'); //./data/tei/register/register_person_template.xml

//convert tei to js object
var teiJs_in = convert.xml2js(tei_in, {compact: false, spaces: 2}) ;

//read person json file
let json_in = fs.readFileSync('./data/json/register/register_person.json', 'utf8'); //./data/json/register/register_person.json

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

//read person json file
//json_in = fs.readFileSync(filepath_in_json_xlsx, 'utf8'); //./data/json_xlsx/person_xlsx.json
//console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
//var jsonJs_in_xlsx = JSON.parse(json_in) ;

buildPerson(teiJs_in) ;

let teiJs_out = teiJs_in ;

//convert js object to tei
var tei_out = convert.js2xml(teiJs_out, {compact: false, spaces: 2}) ;
//write tei file
fs.writeFileSync('./data/tei/register/register_person.xml', tei_out ) ;  //./data/tei/register/register_person.xml
