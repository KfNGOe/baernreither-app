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
var type = '' ;

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

function buildReg(teiJsFile, jsonJs_reg_files) {     
    //iterate over tei template file
    Object.keys(teiJsFile).forEach((key) => {
        console.log('key = ', key) ;
        console.log('value = ', teiJsFile[key]) ;
        //switch
        switch(key) {
            case 'declaration':
                console.log('declaration = ', teiJsFile[key]) ;
                break ;
            case 'instruction':
                console.log('instruction = ', teiJsFile[key]) ;
                break ;
            case 'elements':
                console.log('elements = ',teiJsFile[key]) ;
                if(Array.isArray(teiJsFile[key])) {
                    //level + 1
                    teiJsFile[key].forEach((item, index, array) => {
                        if (typeof item === 'object') {
                            console.log('item = ', item, ', index = ', index) ;
                            buildReg(item, jsonJs_reg_files) ;
                        }
                    }) ;
                    //level - 1
                } else {
                    console.log(teiJsFile.constructor.name, 'property is not an array: ', key) ;
                }
                break ;
            case 'attributes':                
                console.log('attributes =  ', teiJsFile[key]) ;
                //console.log('attributes =  ', teiJsFile[key].type) ;
                if (teiJsFile[key].type) {
                    if (teiJsFile[key].type.includes('person')) {
                        type = 'person' ;
                    } ;
                    if (teiJsFile[key].type.includes('place')) {
                        type = 'place' ;
                    } ;
                    if (teiJsFile[key].type.includes('org')) {
                        type = 'org' ;
                    } ;
                    if (teiJsFile[key].type.includes('index')) {
                        type = 'index' ;
                    } ;
                }            
                break ;         
            case 'type':
                //console.log('result: ',teiJsFile[key]) ;                                
                break ;
            case 'name':
                if(teiJsFile[key] === 'list') {
                    //const groupedByMain = [] ;               
                    let itemDataTemp = [] ;
                    let itemDataTempMain = [] ;
                    let itemDataTempSub = [] ;
                    let itemDataTempPos = [] ;
                    let temp = [] ;
                    //init templates               
                    itemDataTemp.push(teiJsFile.elements[0]) ; 
                    //console.log('itemDataTemp = ', JSON.stringify(itemDataTemp)) ;
                    teiJsFile.elements = [] ;
                    let item_length = itemDataTemp[0].elements.length ;
                    //iterate over item
                    for (let i = 0; i < item_length; i++) {
                        if (i === 0) {
                            itemDataTempMain.push(itemDataTemp[0].elements[0]) ; //.key/.main                                                       
                        } else {
                            if (i === item_length - 1) {
                                itemDataTempPos.push(itemDataTemp[0].elements[i]) ;  //.pos                                
                            } else {
                                itemDataTempSub.push(itemDataTemp[0].elements[i]) ;  //else                                
                            }
                        }
                    }
                    itemDataTemp[0].elements.shift(itemDataTempMain) ;   //delete key template
                    for (let i = 1; i < item_length - 1; i++) {                        
                            itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete sub template                        
                    }
                    itemDataTemp[0].elements.shift(itemDataTempPos) ;   //delete pos template

                    //iterate over register tmp files
                    Object.keys(jsonJs_reg_files).forEach((key) => {
                        console.log('key = ', key) ;
                        console.log('value = ', jsonJs_reg_files[key]) ;
                        if(key.includes(type)) {
                            jsonJs_in = jsonJs_reg_files[key] ;
                            //group by key
                            groupedByMain = jsonJs_in.results.bindings.groupBy( item => {
                                if (!type === 'index') {
                                    return item.key ;
                                } else {
                                    return item.main ;
                                }
                            } ) ;
                        }                        
                    }) ;          
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
                    //copy temp to teiJsFile
                    teiJsFile.elements = temp.slice() ;               
                }            
                break ;
            case 'text':
                //test if key is number
                if(!isNaN(teiJsFile[key])) {               
                    //to string
                    teiJsFile[key] = teiJsFile[key].toString() ;               
                }            
                teiJsFile[key] = teiJsFile[key].replace(/\n\s+$/g, '') ;            
                //console.log('result: ',teiJsFile[key]) ;
                break ;
            case 'comment':
                //console.log('comment = ', teiJsFile[key]) ;            
                break ;
            default:
                //console.log('no case') ;
                break ;
        }
    }) ;       
} ; 

//read json register directory
let jsonFiles = fs.readdirSync('data/json/register/') ;
console.log('json files: ', jsonFiles) ;
//iterate over json files
let jsonJs_reg_files = {} ;
jsonFiles.forEach((file) => {
   if(file.includes('_tmp.json')) {
      let jsonFile = fs.readFileSync('data/json/register/' + file, 'utf8') ;
      jsonJs_reg_files[file] = JSON.parse(jsonFile) ;
   }
}) ;
//read tei register directory
let teiFiles = fs.readdirSync('data/tei/register/') ;
console.log('tei files: ', teiFiles) ;
//iterate over tei files
teiFiles.forEach((file) => {
   if(file.includes('_template.xml')) {
      let teiFile = fs.readFileSync('data/tei/register/' + file, 'utf8') ;
      let teiJsFile = convert.xml2js(teiFile, {compact: false, spaces: 2}) ;      
      buildReg(teiJsFile, jsonJs_reg_files) ;
   }
}) ;



let teiJs_out = teiJs_in ;

//convert js object to tei
var tei_out = convert.js2xml(teiJs_out, {compact: false, spaces: 2}) ;
//write tei file
fs.writeFileSync('./data/tei/register/register_person.xml', tei_out ) ;  //./data/tei/register/register_person.xml
console.log('tei data written: ', tei_out.length, ' bytes')