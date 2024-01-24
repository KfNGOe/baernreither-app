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
var fullText = '' ;
var pos_body = 0 ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_txt=process.env.filepath_out_txt ;

function buildDiplText(obj) {   
    //find tei:body
    if (obj.head !== undefined) {        
        obj.results.bindings.forEach((item, index, array) => {
            if (typeof item === 'object') {                
                if (item.name !== undefined) {
                    if (item.name.value == 'http://www.tei-c.org/ns/1.0/body' 
                        && item.type.value == 'https://github.com/KfNGOe/kfngoeo#StartTag') {
                        pos_body = item.pos.value ;                        
                    }
                }                
            }
        }) ;
        console.log('pos_body = ', pos_body) ;        
    }
    const groupedByPos = obj.results.bindings.groupBy( item => {        
        return item.pos.value ;
     }) ;
     let allPos = Object.keys(groupedByPos) ;
        allPos.sort() ;
        console.log('allPos = ', allPos) ;
        allPos.forEach((key) => {
            groupedByToken[key].forEach((item, index, array) => {
                
            }) ;
        } ) ;
        
     //iterate over pos
     Object.keys(groupedByPos).forEach((key) => {
        console.log('key = ', key, ', value = ', grouprdByPos[key]) ;
     } ) ;
    /*
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key, ', value = ', obj[key]) ;       
      switch(key) {
         case 'results':
            console.log('results = ', key) ;
            let item = obj[key] ;
            buildDiplText(item) ;
            break ;
         case 'bindings':
            if(Array.isArray(obj[key])) {               
               //level + 1
               obj[key].forEach((item, index, array) => {
                  if (typeof item === 'object') {
                     //console.log('item = ', item, ', index = ', index) ;          
                     buildDiplText(item) ;
                  }
               }) ;
            } else {
               //console.log(obj.constructor.name, 'property is not an array: ', key) ;
            }
            //console.log('bindings = ', obj[key]) ;
            break ;
         case 'pos':
            console.log('pos = ', obj[key].value) ;
            if (obj[key].value > pos_body) {
                console.log('pos = ', obj[key].value) ;
                fullText = fullText.concat(obj[key].value) ;
            }
            
            break ;
         case 'o_txt':
            console.log('o_txt = ', obj[key]) ;
            fullText = fullText.concat(obj[key].value) ;
            console.log('fullText = ', fullText) ;            
            break ;
         case 'text':
            obj[key] = obj[key].replace(/\n\s+$/g, '') ;            
            //console.log('result: ',obj[key]) ;
            break ;         
         default:
            console.log('no case') ;
            break ;
      } 
   }) ;
   */
} ; 

//read full text json file
let json_in = fs.readFileSync('./data/json/textDipl.json', 'utf8'); // ./data/json/fullText.json
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;
//jsonJs_in = {} ;
buildDiplText(jsonJs_in) ;

//write tei file
fs.writeFileSync(filepath_out_txt, fullText ) ;  //./data/tei/register/register_place.xml
console.log('text data written: ', fullText.length, ' bytes')