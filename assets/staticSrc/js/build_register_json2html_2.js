// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const ShortUniqueId = require('short-unique-id');
const { exit } = require("process") ;
var convert = require('xml-js') ;
const { group } = require("console");

const spaceMax = 5 ;
const threeDots = '...' ;
var pos_body = 0 ;
var title_short = '' ;
//var groupedByPos = {} ;
var html_str = '' ;

// Creating a window with a document
const dom = new jsdom.JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>

//read register item text template
let reg_item_str = fs.readFileSync('./assets/txt/partials/register/register_item.txt', 'utf8') ;

//build template for full text item
let text_full_temp = {
   "head" : {
     "vars" : [ "id", "type", "cont", "pos" ]
   },
   "results" : {
       "bindings" : []
   }
}   

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_txt=process.env.filepath_out_txt ;

function posStr2Nr(posStr) {
   let pos_tmp = posStr.substring(title_short.length + 1) ;   
   return +pos_tmp ;
}

function posNr2Str(posNr) {
   let pos_tmp = title_short + '_' + posNr.toString() ;   
   return pos_tmp ;
}

function contextBefore(index_hit,sourceFile) {
   let countSpace = 0 ;
   let contextBefore = '' ;
   let item_before = {} ;
   let index_before = index_hit - 1 ;
   let contextBefore_arr = [] ;   
   while (countSpace < spaceMax && index_before >= 0) {
      item_before = sourceFile.results.bindings[index_before] ;
      contextBefore = item_before.cont.value + contextBefore ;
      countSpace = (contextBefore.match(/\s/g) || []).length ;
      index_before-- ;
      //console.log('countSpace = ', countSpace) ;      
   }
   if (countSpace > spaceMax) {      
      contextBefore_arr = contextBefore.split(" ") ;
      contextBefore_arr = contextBefore_arr.slice(-(spaceMax + 1)) ;
      contextBefore = contextBefore_arr.join(" ") ;      
   }
   return contextBefore ;
}

function contextAfter(index_hit,sourceFile) {
   let countSpace = 0 ;
   let contextAfter = '' ;
   let item_after = {} ;
   let index_after = index_hit + 1 ;
   let contextAfter_arr = [] ;   
   while (countSpace < spaceMax && index_after >= 0) {
      item_after = sourceFile.results.bindings[index_after] ;
      contextAfter =  contextAfter + item_after.cont.value ;
      countSpace = (contextAfter.match(/\s/g) || []).length ;
      index_after++ ;
      //console.log('countSpace = ', countSpace) ;      
   }
   if (countSpace > spaceMax) {      
      contextAfter_arr = contextAfter.split(" ") ;
      contextAfter_arr = contextAfter_arr.slice(0, spaceMax + 1) ;
      contextAfter = contextAfter_arr.join(" ") ;      
   }
   return contextAfter ;
}

function entryContext(pos,source,sourceFile,annoFile) {
   title_short = source ;
   let startNr = posStr2Nr(pos) ;
   let endNr = 0 ;   
   let pos_arr = annoFile[startNr] ;
   if (pos_arr !== undefined) {
      endNr = pos_arr[0].end_target.value ;      
   } else {
      console.log('pos ' + pos + ' undefined') ;
      endNr = startNr ;
   }   
   let index_hit = 0 ;
   let context_arr = [] ;
   //find text pos in sourceFile
   if (sourceFile !== undefined) {      
      if(sourceFile.results.bindings.find((item, index, array) => {         
         index_hit = index ; 
         return (startNr < posStr2Nr(item.pos.value)) && (posStr2Nr(item.pos.value) < endNr) ;      
      })) {
         context_arr[0] = contextBefore(index_hit,sourceFile) ;
         context_arr[1] = sourceFile.results.bindings[index_hit].cont.value ;         
         context_arr[2] = contextAfter(index_hit,sourceFile) ;         
         return context_arr ;
      } else {
         console.log('pos ' + pos + ' not found') ;
         context_arr[0] = '' ;
         context_arr[1] = '' ;
         context_arr[2] = '' ;
      }                  
   } else {
      console.log('sourceFile undefined') ;
      context_arr[0] = '' ;
      context_arr[1] = '' ;
      context_arr[2] = '' ;      
   }
   return context_arr ;   
}

function pos_str(key_arr,annoFile,textFull_files) {
   //console.log('key_arr = ', key_arr) ;
   let html_pos_str = '' ;
   let context_arr = [] ;
   groupedByPos = key_arr.groupBy( item => { //key_arr = one key of group register by key/main
      return item.pos ;
   }) ;
   //table cell for pos
   html_pos_str = html_pos_str.concat('<td>' + '<div class="accordion" id="accordionSource">') ;   
   //iterate over sources
   Object.keys(textFull_files).forEach((key_source) => {
      //console.log('index = ', index) ;
      let sourceFile = textFull_files[key_source] ;
      //load template for register item into dom 
      $('html').find('body').append(reg_item_str) ;      
      let source = key_source.replace('_full','') ;
      let flag_source = false ;
      //iterate over pos
      Object.keys(groupedByPos).forEach((key_pos) => {
         if (key_pos.includes(source)) {
            flag_source = true ;
            //get person name in text and context
            context_arr = entryContext(key_pos, source, sourceFile, annoFile) ;
            let contextBefore = context_arr[0] ;
            let contextAfter = context_arr[2] ;            
            let entry = '<a href="synoptik.html#person_' + key_pos + '" id="person_' + key_pos + '">'+ context_arr[1] +'</a>' ;
            //append pos to dom
            $('html').find('body').find('div.accordion-item:last-child div.accordion-body').append('<p>' + threeDots + contextBefore + entry + contextAfter + threeDots + '</p>') ;            
         }
      }) ;
      if (flag_source === false) {
         //no pos in source
         $('html').find('body').find('div.accordion-item:last-child').remove() ;         
      } else {
         flag_source = false ;
         //append source to dom
         $('html').find('body').find('div.accordion-item:last-child .accordion-button').append(source) ;
      }
   }) ;
   //fetch html from dom and append to html_pos_str         
   html_pos_str = html_pos_str.concat($('html').find('body').html()) ;
   //remove appended html from dom
   $('html').find('body *').remove() ;
   //close table cell for pos   
   html_pos_str = html_pos_str.concat('</div>' + '</td>') ;
   //console.log('html_pos_str = ', html_pos_str) ;
   return html_pos_str ;   
}

function buildReg(jsonJs_reg_file,jsonJs_anno_file,textFull_files) {   //obj = register_person.json //obj_1 = annoPerson.json
   html_str = '' ;
   //group register by key/main      
   groupedByKey = jsonJs_reg_file.results.bindings.groupBy( item => {   
      //filter index    
      if (jsonJs_reg_file.head.vars[0] === 'key') {
         return item.key ;
     } else {
         return item.main ;
     }
   }) ;
   //group anno by target source
   groupedBySourceTarget = jsonJs_anno_file.results.bindings.groupBy( item => {
      return item.source_target.value ;
   }) ;
   //group anno by target start
   groupedByStart = jsonJs_anno_file.results.bindings.groupBy( item => {  //obj_1 = annoPerson.json
      return item.start_target.value ;
   }) ;
   let source_arr = [] ;
   let sourceFile_arr = [] ;
   let annoFile = groupedByStart ;   
   //iterate over register keys
   Object.keys(groupedByKey).forEach((key) => {
      console.log('key = ', key) ;
      //console.log('groupedByKey[key] = ', groupedByKey[key]) ;
      let key_arr = groupedByKey[key] ;
      //index
      if (key_arr[0].id.toLowerCase().includes('index')) {
         //start new row
         html_str = html_str.concat('<tr>') ;      
         //id
         let id = key_arr[0].id ;
         html_str = html_str.concat('<td style="display: none">' + id + '</td>') ;
         //main
         let main = key_arr[0].main ;
         html_str = html_str.concat('<td>' + main + '</td>') ;         
         //pos         
         html_str = html_str.concat(pos_str(key_arr,annoFile,textFull_files)) ;
         //end row
         html_str = html_str.concat('</tr>') ;   
      }
      //org
      if (key_arr[0].id.toLowerCase().includes('org')) {
         //start new row
         html_str = html_str.concat('<tr>') ;      
         //id
         let id = key_arr[0].id ;
         html_str = html_str.concat('<td style="display: none">' + id + '</td>') ;
         //name
         let name = key_arr[0].name ;
         html_str = html_str.concat('<td>' + name + '</td>') ;         
         //pid
         let pid = key_arr[0].pid ;
         html_str = html_str.concat('<td>' + '<a href="' + pid + '" target="blank">GND</a></td>') ;
         //pos         
         html_str = html_str.concat(pos_str(key_arr,annoFile,textFull_files)) ;
         //end row
         html_str = html_str.concat('</tr>') ;   
      }
      //person
      if (key_arr[0].id.toLowerCase().includes('person')) {
         //start new row
         html_str = html_str.concat('<tr>') ;      
         //id
         let id = key_arr[0].id ;
         html_str = html_str.concat('<td style="display: none">' + id + '</td>') ;
         //entry
         let entry = key_arr[0].surname + ', ' + key_arr[0].forename + ' ' + key_arr[0].addName ;
         html_str = html_str.concat('<td>' + entry + '</td>') ;
         //life dates
         let birth = key_arr[0].birth ;
         let death = key_arr[0].death ;
         let birthPlace = key_arr[0].birthPlace ;
         let deathPlace = key_arr[0].deathPlace ;
         html_str = html_str.concat('<td>' + '∗ ' + birth +', ' + birthPlace +'<br>' + '† ' + death + ', ' + deathPlace + '</td>') ;
         //description
         let desc = key_arr[0].desc ;
         html_str = html_str.concat('<td>' + desc + '</td>') ;
         //pid
         let pid = key_arr[0].pid ;
         html_str = html_str.concat('<td>' + '<a href="' + pid + '" target="blank">GND</a></td>') ;      
         //pos         
         html_str = html_str.concat(pos_str(key_arr,annoFile,textFull_files)) ;
         //end row
         html_str = html_str.concat('</tr>') ;   
      }
      //place
      if (key_arr[0].id.toLowerCase().includes('place')) {
         //start new row
         html_str = html_str.concat('<tr>') ;      
         //id
         let id = key_arr[0].id ;
         html_str = html_str.concat('<td style="display: none">' + id + '</td>') ;
         //name
         let name = key_arr[0].name ;
         html_str = html_str.concat('<td>' + name + '</td>') ;
         //name today
         let nameToday = key_arr[0].name_today ;
         html_str = html_str.concat('<td>' + name_today + '</td>') ;
         //lat
         let lat = key_arr[0].lat ;
         html_str = html_str.concat('<td>' + lat + '</td>') ;
         //long
         let long = key_arr[0].long ;
         html_str = html_str.concat('<td>' + long + '</td>') ;
         //pid
         let pid = key_arr[0].pid ;
         html_str = html_str.concat('<td>' + '<a href="' + pid + '" target="blank">GND</a></td>') ;
         //pos         
         html_str = html_str.concat(pos_str(key_arr,annoFile,textFull_files)) ;
         //end row
         html_str = html_str.concat('</tr>') ;   
      }      
   }) ;
} ; 

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
//read json dipl directory
let jsonFiles = fs.readdirSync('data/json/dipl/') ;
console.log('json files: ', jsonFiles) ;
//build full text from dipl text json files
let textFull_files = {} ;
//iterate over dipl files
jsonFiles.forEach((file) => {
   //get title_short
   title_short = file.replace('_dipl.json','') ;
   //init text full
   let text_full = JSON.parse(JSON.stringify(text_full_temp)) ;
   //read dipl text json files
   let fileNamePath = 'data/json/dipl/' + file ;   
   let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
   console.log('json data read: ', json_in.length, ' bytes') ;
   let jsonJs_in_dipl = JSON.parse(json_in) ;
   //get only text items
   //group by Text
   groupedByText_text = jsonJs_in_dipl.results.bindings.groupBy( item => {
      return item.type.value === 'https://github.com/KfNGOe/kfngoeo#Text' ;      
   }) ;
   //group Text by pos
   groupedByPos_text = groupedByText_text['true'].groupBy( item => {
      return item.pos.value ;
   }) ;   
   let groupedByPos_full = {} ;
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
   textFull_files[title_short + '_full'] = text_full ;   
}) ;
//console.log('textFull_files = ', textFull_files) ;
//

//build register
//read json register directory
jsonFiles = fs.readdirSync('data/json/register/') ;
console.log('json files: ', jsonFiles) ;
//read json anno directory
let jsonFiles_anno = fs.readdirSync('data/json/anno/') ;
console.log('json files anno: ', jsonFiles_anno) ;
//iterate over json file names
jsonFiles.forEach((file) => {
   //choose ordinary register files
   //count number of '_' in file name
   let count = (file.match(/_/g) || []).length ;
   if (count < 2 && !file.includes('_id')) {
      json_in = fs.readFileSync('data/json/register/' + file, 'utf8') ;
      let jsonJs_reg_file = JSON.parse(json_in) ;
      //use register file name to find corresponding anno file
      let file_tmp = file.replace('.json','').replace('register_','') ;
      //iterate over anno files
      let jsonJs_anno_file = {} ;
      jsonFiles_anno.forEach((file_anno) => {
         if (file_anno.toLowerCase().includes(file_tmp) && !(file_anno.toLocaleLowerCase().includes('sub'))) {          
            console.log('file_anno = ', file_anno) ;
            json_in = fs.readFileSync('data/json/anno/' + file_anno, 'utf8') ;
            jsonJs_anno_file = JSON.parse(json_in) ;
         }            
      }) ;
      //build html string
      buildReg(jsonJs_reg_file,jsonJs_anno_file,textFull_files) ;
      //write html strings to file
      fileNamePath = 'assets/txt/partials/register/register_table.txt' ;    //assets/txt/partials/register/register_table.txt
      fs.writeFileSync(fileNamePath, html_str ) ;
      console.log('html data written: ', html_str.length, ' bytes') ;  
   } ;      
}) ;   