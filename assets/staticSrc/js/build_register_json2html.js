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
var title_short = '' ;
var html_str = '' ;

// Creating a window with a document
const dom = new jsdom.JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>

//read register item text template
let reg_item_str = fs.readFileSync('./assets/txt/partials/register/register_item.txt', 'utf8') ; 

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
   let sourceMax = sourceFile.results.bindings.length - 1 ;   
   while (countSpace < spaceMax && index_after <= sourceMax) {
      item_after = sourceFile.results.bindings[index_after] ;
      //console.log('item_after = ', item_after.pos.value) ;      
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
            //check register type
            let entry = '' ;
            if (key_arr[0].id.toLowerCase().includes('index')) {
               entry = '<a href="synoptik.html#index_' + key_pos + '" id="index_' + key_pos + '">'+ context_arr[1] +'</a>' ;
            } ;
            if (key_arr[0].id.toLowerCase().includes('org')) {
               entry = '<a href="synoptik.html#org_' + key_pos + '" id="org_' + key_pos + '">'+ context_arr[1] +'</a>' ;
            } ;
            if (key_arr[0].id.toLowerCase().includes('person')) {
               entry = '<a href="synoptik.html#person_' + key_pos + '" id="person_' + key_pos + '">'+ context_arr[1] +'</a>' ;
            }
            if (key_arr[0].id.toLowerCase().includes('place')) {
               entry = '<a href="synoptik.html#place_' + key_pos + '" id="place_' + key_pos + '">'+ context_arr[1] +'</a>' ;
            }
            //append button data target + aria controls to dom
            $('html').find('body').find('div.accordion-item:last-child .accordion-button').attr('data-bs-target','#acc_' + key_pos).attr('aria-controls','acc_' + key_pos) ;
            //append collapse data parent to dom
            $('html').find('body').find('div.accordion-item:last-child div.accordion-collapse').attr('id','acc_' + key_pos) ;
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
   //console.log('html_pos_str = ', html_pos_str) ;
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
         html_str = html_str.concat('<td style="display: none"><span id="' + id + '">' + id + '</span></td>') ;
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
         html_str = html_str.concat('<td style="display: none"><span id="' + id + '">' + id + '</span></td>') ;
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
         html_str = html_str.concat('<td style="display: none"><span id="' + id + '">' + id + '</span></td>') ;
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
         //build pid
         let pid = key_arr[0].pid ;
         let pid_name = '';
         if(pid.includes('geonames')) {
            pid_name = 'GN' ;
            pid_nr = pid.replace('http://www.geonames.org/','') ;
            pid_nr = pid_nr.replace(pid_nr.substring(pid_nr.lastIndexOf('/')),'') ;            
         } ;
         //start new row
         html_str = html_str.concat('<tr>') ;      
         //id
         let id = key_arr[0].id ;
         html_str = html_str.concat('<td style="display: none"><span id="' + id + '">' + id + '</span></td>') ;
         //name
         let name = key_arr[0].name ;
         //<a class="org" href="#reg_Bae_REG_Org_416">
         html_str = html_str.concat('<td>' + '<a href="karte.html#' + pid_nr + '">' + name + '</a>' + '</td>') ;
         //name today
         let name_today = key_arr[0].name_today ;
         html_str = html_str.concat('<td>' + name_today + '</td>') ;
         //lat
         let lat = key_arr[0].lat ;
         html_str = html_str.concat('<td style="display: none">' + lat + '</td>') ;
         //long
         let long = key_arr[0].long ;
         html_str = html_str.concat('<td style="display: none">' + long + '</td>') ;
         //pid         
         html_str = html_str.concat('<td>' + '<a href="' + pid + '" target="blank">' + pid_name + '</a></td>') ;
         //pos         
         html_str = html_str.concat(pos_str(key_arr,annoFile,textFull_files)) ;
         //end row
         html_str = html_str.concat('</tr>') ;   
      }      
   }) ;
} ; 

//get full texts
//read json full directory
let jsonFiles = fs.readdirSync('data/json/full/') ;
console.log('json files: ', jsonFiles) ;
//build full text from dipl text json files
let textFull_files = {} ;
//iterate over dipl files
jsonFiles.forEach((file) => {   
   //read full text json files
   let fileNamePath = 'data/json/full/' + file ;   
   let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
   console.log('json data read: ', json_in.length, ' bytes') ;
   let jsonJs_in_full = JSON.parse(json_in) ;   
   //read full text to files
   let fileName = file.replace('.json','') ;
   textFull_files[fileName] = jsonJs_in_full ;   
}) ;
//

//get register
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
      let fileName = file.replace('.json','').replace('register_','') ;      
      //iterate over anno files
      let jsonJs_anno_file = {} ;
      jsonFiles_anno.forEach((file_anno) => {
         if (file_anno.toLowerCase().includes(fileName) && !(file_anno.toLocaleLowerCase().includes('sub'))) {          
            console.log('file_anno = ', file_anno) ;            
            json_in = fs.readFileSync('data/json/anno/' + file_anno, 'utf8') ;
            jsonJs_anno_file = JSON.parse(json_in) ;
         }            
      }) ;
      //build html string
      buildReg(jsonJs_reg_file,jsonJs_anno_file,textFull_files) ;
      //write html strings to file
      //exclude indexsub
      if (!fileName.toLowerCase().includes('indexsub')) {   
         let fileNamePath = 'data/txt/register/register_table_' + fileName + '.txt' ;    
         fs.writeFileSync(fileNamePath, html_str ) ;
         console.log('html data written: ', html_str.length, ' bytes') ;  
      }      
   } ;      
}) ;   