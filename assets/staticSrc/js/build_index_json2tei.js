// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
const normalize = require('normalize-space') ;

var convert = require('xml-js');
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
const filepath_out_tei = process.env.filepath_out_tei ;

console.log(filepath_in_tei) ;
console.log(filepath_in_json) ;
console.log(filepath_out_tei) ;

function getObject(obj) {
   let length = Object.keys(obj).length ;
   ////console.log('object length =', length) ;
   //console.log('first object key  =', Object.keys(obj)[0]) ;

   //start tag + 1
   //no declaration or instruction
   if(Object.keys(obj)[0] !== 'declaration' && obj['type'] !== 'instruction') {
      if('attributes' in obj) {      
      } else {
         obj['attributes'] = {} ;      
      }
      i_startTag++ ;
      obj['attributes']['startTagNr'] = i_startTag ;
      obj['attributes']['level'] = i_level ;
   }


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
                     getObject(item) ;
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
            //console.log('result: ',obj[key]) ;
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
   
   //end tag + 1 if level = level of start tag and if elements exist
   //no declaration or instruction
   if(Object.keys(obj)[0] !== 'declaration' && obj['type'] !== 'instruction') {
      if(obj['attributes']['level'] === i_level) {
         if('elements' in obj) {
            i_endTag = i_startTag ;            
            i_endTag++ ;
            i_startTag = i_endTag ;
            obj['attributes']['endTagNr'] = i_endTag ;      
         } else {
            if('endTagNr' in obj['attributes']) {
               delete obj['attributes']['endTagNr'] ;
            }
         }
      }
   }      
} ; 

//read index template tei file
var tei_in = fs.readFileSync(filepath_in_tei, 'utf8');
console.log('tei data read: ', tei_in.length, ' bytes') ;

//convert tei to js object
var teiJs_in = convert.xml2js(tei_in, {compact: false, spaces: 2}) ;

//read index json file
var json_in = fs.readFileSync(filepath_in_json, 'utf8');
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;
/*var jsonJsString = JSON.stringify(jsonJs_in);
fs.writeFileSync('./data/json_xmlJs/test.json', jsonJsString ) ;
console.log('json data written: ', jsonJsString.length, ' bytes')
*/



getObject(xmlJs) ;
if (i_startTag > i_endTag) {
   N = i_startTag ;
} else {
   N = i_endTag ;
}
console.log('N = ', N) ;
i_startTag, i_endTag = 0 ;

//write json file
filepath = path_out_json + filename + ext_json ;
console.log(filepath);
var xmlJsString = JSON.stringify(xmlJs);
fs.writeFileSync(filepath, xmlJsString ) ;
console.log('json data written: ', xmlJsString.length, ' bytes')


