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

//Instantiate ShortUniqueId
const uid = new ShortUniqueId({ length: 10 });

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
      contextBefore = item_before.o_txt.value + contextBefore ;
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
      contextAfter =  contextAfter + item_after.o_txt.value ;
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
      endNr = pos_arr[0].end.value ;      
   } else {
      console.log('pos ' + pos + ' undefined') ;
      endNr = startNr ;
   }   
   let index_hit = 0 ;
   let context_arr = [] ;
   if (sourceFile !== undefined) {
      let item_hit = sourceFile.results.bindings.find((item, index, array) => {
         //find pos in sourceFile between start and end, return item
         //console.log('index = ', index) ;
         index_hit = index ; 
         return (startNr < item.pos_txt_nr.value) && (item.pos_txt_nr.value < endNr) ;      
      }) ;
      if (item_hit !== undefined) {
         context_arr[0] = contextBefore(index_hit,sourceFile) ;
         context_arr[1] = item_hit.o_txt.value;
         context_arr[2] = contextAfter(index_hit,sourceFile) ;         
         return context_arr ;
      } else {
         console.log('item of pos ' + pos + ' not found') ;
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

function pos_str(key_arr,source_arr,sourceFile_arr,annoFile) {
   //console.log('key_arr = ', key_arr) ;
   let html_pos_str = '' ;
   let context_arr = [] ;
   groupedByPos = key_arr.groupBy( item => {
      return item.pos ;
   }) ;
   //table cell for pos
   html_pos_str = html_pos_str.concat('<td>' + '<div class="accordion" id="accordionSource">') ;   
   //iterate over sources
   source_arr.forEach((source,index) => {
      //console.log('index = ', index) ;
      let sourceFile = sourceFile_arr[index] ;
      //load template for register item into dom 
      $('html').find('body').append(reg_item_str) ;      
      //iterate over pos
      let flag_source = false ;
      Object.keys(groupedByPos).forEach((key) => {
         if (key.includes(source)) {
            flag_source = true ;
            //get person name in text and context
            context_arr = entryContext(key, source, sourceFile, annoFile) ;
            let contextBefore = context_arr[0] ;
            let contextAfter = context_arr[2] ;            
            let entry = '<a href="synoptik.html#person_' + key + '" id="person_' + key + '">'+ context_arr[1] +'</a>' ;
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

function buildReg(jsonJs_reg_file, jsonJs_anno_file, groupedByTextFull_files) {   //obj = register_person.json //obj_1 = annoPerson.json
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
   //iterate over anno target sources
   Object.keys(groupedBySourceTarget).forEach((key, index) => {
      source_arr.push(key) ;      
      let fileNamePath = 'data/json/' + key + '_full.json' ;    //data/json/Bae_TB_8_full.json
      
      if(fs.existsSync(fileNamePath)) {
         console.log('file exists') ;
         let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
         let jsonJs_in = JSON.parse(json_in) ;
         sourceFile_arr[index] = jsonJs_in ;
      } else {
         console.log('file does not exist') ;
      }      
   }) ;   
   //iterate over register keys
   Object.keys(groupedByKey).forEach((key) => {
      console.log('key = ', key) ;
      //console.log('groupedByKey[key] = ', groupedByKey[key]) ;
      let key_arr = groupedByKey[key] ;
      //start new row
      html_str = html_str.concat('<tr>') ;      
      //table data 1 = id
      let id = key_arr[0].id ;
      html_str = html_str.concat('<td style="display: none">' + id + '</td>') ;
      //tabel data 2
      let entry = key_arr[0].surname + ', ' + key_arr[0].forename + ' ' + key_arr[0].addName ;
      html_str = html_str.concat('<td>' + entry + '</td>') ;
      //life dates
      let birth = key_arr[0].birth ;
      let death = key_arr[0].death ;
      html_str = html_str.concat('<td>' + '∗ ' + birth +'<br>' + '† ' + death + '</td>') ;
      //description
      let desc = key_arr[0].desc ;
      html_str = html_str.concat('<td>' + desc + '</td>') ;
      //pid
      let pid = key_arr[0].pid ;
      html_str = html_str.concat('<td>' + '<a href="' + pid + '" target="blank">GND</a></td>') ;      
      //pos
      let pos = key_arr[0].pos ;
      html_str = html_str.concat(pos_str(key_arr,source_arr,sourceFile_arr,annoFile)) ;
      //end row
      html_str = html_str.concat('</tr>') ;
   }) ;
} ; 

//build full texts
//read anno text full json file
json_in = fs.readFileSync('./data/json/anno/annoTextFull.json', 'utf8') ; //data/json/annoTextFull.json
console.log('json data read: ', json_in.length, ' bytes') ;
//convert json to js object
let jsonJs_in_annoFull = JSON.parse(json_in) ;
//group by type anno text full
groupedByType_annoFull = jsonJs_in_annoFull.results.bindings.groupBy( item => {
   return item.type_anno.value ;
}) ;
//read json dipl directory
jsonFiles = fs.readdirSync('data/json/dipl/') ;
console.log('json files: ', jsonFiles) ;
//build full text from dipl text json files
let groupedByTextFull_files = {} ;
//iterate over dipl files
jsonFiles.forEach((file) => {
   //get title_short
   title_short = file.replace('_dipl.json','') ;
   //read dipl text json files
   let fileNamePath = 'data/json/dipl/' + file ;   
   let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
   console.log('json data read: ', json_in.length, ' bytes') ;
   let jsonJs_in_dipl = JSON.parse(json_in) ;
   //get only text items
   //group text by Text
   groupedByText_text = jsonJs_in_dipl.results.bindings.groupBy( item => {
      return item.type.value === 'https://github.com/KfNGOe/kfngoeo#Text' ;      
   }) ;
   //group text by pos
   groupedByPos_text = groupedByText_text['true'].groupBy( item => {
      return item.pos.value ;
   }) ;   
   let groupedByPos_full = {} ;
   //iterate over pos
   Object.keys(groupedByPos_text).forEach((key) => {
      let hit_flag = false ;               
      //iterate over type
      Object.keys(groupedByType_annoFull).forEach((type) => {
         //group specific type by source         
         groupedByTypeSource_annoFull = groupedByType_annoFull[type].groupBy( item => {
            return item.source_target.value ;
         }) ;
         //check if key in anno full text
         if (groupedByTypeSource_annoFull[title_short] !== undefined) {
            if (groupedByTypeSource_annoFull[title_short].find(item => (+item.start_target.value < posStr2Nr(key)) && (posStr2Nr(key) < +item.end_target.value)) === undefined) {
               //console.log('key not found in anno full text: ', key) ;               
            } else {
               //console.log('key found in anno full text: ', key) ;
               hit_flag = true ;
            }
         }         
      }) ;
      //check hit_flag
      if (hit_flag === false) {
         //console.log('no hit of', key, ' in anno full text: ', title_short) ;
         groupedByPos_full[key] = groupedByPos_text[key] ;
      }
   }) ;
   //write full text to files
   groupedByTextFull_files[title_short + '_full'] = groupedByPos_full ;
   //console.log('groupedByTextFull_files = ', groupedByTextFull_files) ;
}) ;

//read json register directory
let jsonFiles = fs.readdirSync('data/json/register/') ;
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
         if (file_anno.toLowerCase().includes(file_tmp)) {          
            console.log('file_anno = ', file_anno) ;
            json_in = fs.readFileSync('data/json/anno/' + file_anno, 'utf8') ;
            jsonJs_anno_file = JSON.parse(json_in) ;
         }            
      }) ;
      //build html string
      buildReg(jsonJs_reg_file, jsonJs_anno_file, groupedByTextFull_files) ;
      //write html strings to file
      fileNamePath = 'assets/txt/partials/register/register_table.txt' ;    //assets/txt/partials/register/register_table.txt
      fs.writeFileSync(fileNamePath, html_str ) ;
      console.log('html data written: ', html_str.length, ' bytes') ;  
   } ;      
}) ;

//read register item text template
let reg_item_str = fs.readFileSync('./assets/txt/partials/register/register_item.txt', 'utf8') ;
//parse register data text template
var reg_item_html = $.parseHTML(reg_item_str) ;



   