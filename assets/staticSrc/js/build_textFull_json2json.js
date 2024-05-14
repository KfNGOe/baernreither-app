// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { exit } = require("process") ;

var fullText = '' ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

//build template for full text item
let text_full_temp = {
    "head" : {
      "vars" : [ "id", "type", "cont", "pos" ]
    },
    "results" : {
        "bindings" : []
    }
 }

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_txt=process.env.filepath_out_txt ;

function posStr2Nr(posStr) {
    let pos_tmp = posStr.substring(title_short.length + 1) ;   
    return +pos_tmp ;
 }

//build full texts
//read anno text full json file
json_in = fs.readFileSync('./data/json/anno/annoTextFull.json', 'utf8') ; //data/json/annoTextFull.json
console.log('json data read: ', json_in.length, ' bytes') ;
//convert json to js object
let jsonJs_in_annoFull = JSON.parse(json_in) ;
//group by source target
groupedBySource_annoFull = jsonJs_in_annoFull.results.bindings.groupBy( item => {
   return item.source_target.value ;
} ) ;
//read json all directory
let jsonFiles = fs.readdirSync('data/json/all/') ;
console.log('json files: ', jsonFiles) ;
//build full text from all text json files
let textFull_files = {} ;
//iterate over *all files
jsonFiles.forEach((file) => {
   //get title_short
   title_short = file.replace('_all.json','') ;
   //init text full
   let text_full = JSON.parse(JSON.stringify(text_full_temp)) ;
   //read all text json files
   let fileNamePath = 'data/json/all/' + file ;   
   let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
   console.log('json data read: ', json_in.length, ' bytes') ;
   let jsonJs_in_all = JSON.parse(json_in) ;
   //get only text items
   //group by Text
   groupedByText_text = jsonJs_in_all.results.bindings.groupBy( item => {
      return item.type.value === 'https://github.com/KfNGOe/kfngoeo#Text' ;      
   }) ;
   //group Text by pos
   groupedByPos_text = groupedByText_text['true'].groupBy( item => {
      return item.pos.value ;
   }) ;
   let item_hit = {} ;
   let item_text_pos = '' ;
   if(jsonJs_in_all.results.bindings.find((item, index) => {
      item_hit = item ; 
      return item.type.value === 'https://github.com/KfNGOe/kfngoeo#StartTag' 
      && item.name.value === 'http://www.tei-c.org/ns/1.0/text'}) !== undefined) {
         item_text_pos = item_hit.pos.value ;
   } else {
      console.log('no text tag found in: ', title_short) ;      
   }
   //iterate over pos
   Object.keys(groupedByPos_text).forEach((key) => {
      let hit_flag = false ;
      let item_hit = {} ;
      //check if key in anno full text
      if (groupedBySource_annoFull[title_short] !== undefined) {
         if (groupedBySource_annoFull[title_short].find((item, index) => {
            item_hit = item ; 
            return (+item.start_target.value < posStr2Nr(key)) && (posStr2Nr(key) < +item.end_target.value)
         }) === undefined) {
            //console.log('key not found in anno full text: ', key) ;
            //check if key greater then text tag
            if (posStr2Nr(key) < posStr2Nr(item_text_pos)) {               
               hit_flag = true ;
            }
         } else {
            //console.log(key,' found in anno full text at start pos: ', item_hit.start_target.value) ;
            hit_flag = true ;
         }
      }      
      //check hit_flag
      if (hit_flag === false) {
         //console.log('no hit of', key, ' in anno full text: ', title_short) ;
         text_full.results.bindings.push(groupedByPos_text[key][0]) ;         
      }
   }) ;

   //write full text to files
   //textFull_files[title_short + '_full'] = text_full ;   
   let fileName = title_short + '_full' ;
   fileNamePath = 'data/json/full/' + fileName + '.json' ;
   let text_full_str = JSON.stringify(text_full) ; 
   fs.writeFileSync(fileNamePath, text_full_str, 'utf8') ;
   console.log('json data written: ', text_full_str.length, ' bytes') ;  
}) ;