// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;

var convert = require('xml-js') ;
var typeReg = '' ;

function buildReg(teiJsFile, jsonJs_reg_files) {     
    //iterate over tei template file
    Object.keys(teiJsFile).forEach((key) => {
        console.log('key = ', key) ;
        //console.log('value = ', teiJsFile[key]) ;
        //switch
        switch(key) {
            case 'declaration':
                //console.log('declaration = ', teiJsFile[key]) ;
                break ;
            case 'instruction':
                //console.log('instruction = ', teiJsFile[key]) ;
                break ;
            case 'elements':
                //console.log('elements = ',teiJsFile[key]) ;
                if(Array.isArray(teiJsFile[key])) {
                    //level + 1
                    teiJsFile[key].forEach((item, index, array) => {
                        if (typeof item === 'object') {
                            //console.log('item = ', item, ', index = ', index) ;
                            buildReg(item, jsonJs_reg_files) ;
                        }
                    }) ;
                    //level - 1
                } else {
                    //console.log(teiJsFile.constructor.name, 'property is not an array: ', key) ;
                }
                break ;
            case 'attributes':                
                //console.log('attributes =  ', teiJsFile[key]) ;
                //console.log('attributes =  ', teiJsFile[key].type) ;
                if (teiJsFile[key].type) {
                    if (teiJsFile[key].type.includes('person')) {
                        typeReg = 'person' ;
                    } ;
                    if (teiJsFile[key].type.includes('place')) {
                        typeReg = 'place' ;
                    } ;
                    if (teiJsFile[key].type.includes('org')) {
                        typeReg = 'org' ;
                    } ;
                    if (teiJsFile[key].type.includes('index')) {
                        typeReg = 'index' ;
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
                    //delete templates
                    itemDataTemp[0].elements.shift(itemDataTempMain) ;   //delete key template
                    for (let i = 1; i < item_length - 1; i++) {                        
                            itemDataTemp[0].elements.shift(itemDataTempSub) ;   //delete sub template                        
                    }
                    itemDataTemp[0].elements.shift(itemDataTempPos) ;   //delete pos template

                    //iterate over register tmp files
                    Object.keys(jsonJs_reg_files).forEach((key) => {
                        //console.log('key = ', key) ;
                        //console.log('value = ', jsonJs_reg_files[key]) ;
                        if(key.includes(typeReg)) {
                            //get register tmp file
                            jsonJs_in = jsonJs_reg_files[key] ;
                            //group by key
                            groupedByMain = jsonJs_in.results.bindings.groupBy( item => {
                                //check if typeReg is index
                                if (typeReg !== 'index') {
                                    return item.key ;
                                } else {
                                    return item.main ;
                                }
                            }) ;
                            //get terms from header of register tmp file
                            let terms = jsonJs_in.head.vars ;
                            let termsLength = terms.length ;                            
                            //iterate over register tmp items
                            Object.keys(groupedByMain).forEach((key) => {                    
                                let termKey = key ;
                                //console.log('termKey = ', termKey) ;
                                //key
                                itemDataTempMain[0].elements[0].text = termKey ;
                                itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempMain[0]))) ;
                                //check if typeReg is index
                                if (typeReg === 'index') {
                                    //check if item without sub exists
                                    if (groupedByMain[key].some(item => item.sub === '')) {
                                        //filter and group by empty sub
                                        const groupedByNoSub = groupedByMain[key].filter(item => item.sub === '').groupBy( item => {
                                            return item.main ;                        
                                        }) ;
                                        //console.log('groupedByNoSub = ', groupedByNoSub) ;
                                        //iterate over empty sub
                                        groupedByNoSub[key].forEach((item) => {
                                            let termPos = item.pos ;
                                            itemDataTempPos[0].elements[0].text = termPos ;                           
                                            itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempPos[0]))) ;                           
                                        }) ;                                       
                                    } 
                                    //check if item with sub exists
                                    if (groupedByMain[key].some(item => item.sub)) {
                                        //filter and group by sub
                                        const groupedBySub = groupedByMain[key].filter(item => item.sub).groupBy( item => {
                                            return item.sub ;                        
                                        }) ;                     
                                        //iterate over sub       
                                        Object.keys(groupedBySub).forEach((key) => {                        
                                            let termSub = key ;                        
                                            itemDataTempSub[0].elements[0].text = termSub ;
                                            //push sub to main (JSON.parse(JSON.stringify()) is used to copy by value)
                                            itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[0]))) ;                        
                                            if (groupedBySub[key].some(item => item.pos)) {
                                                groupedBySub[key].forEach((item) => {
                                                    let termPos = item.pos ;
                                                    itemDataTempPos[0].elements[0].text = termPos ;                           
                                                    itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempPos[0]))) ;                              
                                                }) ;
                                            } else {
                                                console.log('error: no pos') ;
                                            }                        
                                        }) ;                     
                                    }
                                } else {
                                    //typeReg is not index
                                    console.log('typeReg', typeReg) ;
                                    //iterate over terms
                                    for (let i = 1; i < termsLength; i++) {
                                        //check if term exists
                                        if (groupedByMain[key].some(item => item[terms[i]])) {
                                            if (terms[i] === 'pos') {
                                                //iterate over pos
                                                groupedByMain[key].forEach((item) => {
                                                    let termPos = item.pos ;
                                                    itemDataTempPos[0].elements[0].text = termPos ;
                                                    itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempPos[0]))) ;
                                                }) ;
                                            } else {
                                                //get term
                                                let term = groupedByMain[key][0][terms[i]] ;                                                
                                                itemDataTempSub[i-1].elements[0].text = term ;
                                                itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[i-1]))) ;
                                            }                                            
                                        } else {
                                            let term = '' ;                                                
                                            itemDataTempSub[i-1].elements[0].text = term ;
                                            itemDataTemp[0].elements.push(JSON.parse(JSON.stringify(itemDataTempSub[i-1]))) ;
                                            console.log('no term') ;
                                        }
                                    }
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
                    }) ;
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
//iterate over tei files
teiFiles.forEach((file) => {
    //filter template files
    if(file.includes('_template.xml')) {
        let teiFile = fs.readFileSync('data/tei/register/' + file, 'utf8') ;
        let teiJsFile = convert.xml2js(teiFile, {compact: false, spaces: 2}) ;      
        buildReg(teiJsFile, jsonJs_reg_files) ;
        let teiJs_out = teiJsFile ;
        //convert js object to tei
        let tei_out = convert.js2xml(teiJs_out, {compact: false, spaces: 2}) ;
        //write tei file
        //data/tei/register
        fs.writeFileSync('./data/tei/register/' + file.replace('_template', ''), tei_out ) ;  //./data/tei/register/register_person.xml
        console.log('tei data written: ', tei_out.length, ' bytes')        
   }
}) ;