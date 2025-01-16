// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const ShortUniqueId = require('short-unique-id');
const { exit } = require("process") ;
var convert = require('xml-js') ;
//const { group } = require("console");
//const { includes } = require("core-js/core/array");
var i_N = 0 ;
var N = 0 ;
var i_level = 0 ;
var i_startTag = 0 ; 
var i_endTag = 0 ;
var fullText = '' ;
var pos_body = 0 ;
var title_short = '' ;
var groupedBySource = {} ;
var allPos = [] ;
var html = '' ;
var html_str = '<div id="content"></div>' ;
var appStack = {
   'start': '',
   'end': ''
} ;

// Creating a window with a document
const dom = new jsdom.JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>
//$('div[id="content"]').append('<div>test</div>') ;
//html = $('div[id="content"]').html() ;

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

function generateId(item) {
   //random number + pos   
   return uid.rnd() + '_' + item.pos.value ;
}

function setRefValue(anchorSource, anchorRefSource, anchorId_pos_nr, anchorRef_pos_nr) {
   
   $('html').find('body').children('div').each(function() {      
      let attrId = $(this).find('a').attr('id') ;
      if (attrId.includes(anchorSource)) {
         $(this).find('a').each(function() {
            //console.log('this = ', $(this).attr('id').length) ;
            if ($(this).attr('id').includes('comp_') && $(this).attr('id').includes(anchorId_pos_nr) ) {
               let anchorId = 'comp_' + anchorSource + '_' + anchorId_pos_nr ;
               //console.log('anchorId = ', anchorId.length) ;
               if (anchorId.length === $(this).attr('id').length) {
                  let anchorRef = '#comp_' + anchorRefSource + '_' + anchorRef_pos_nr ;
                  $(this).attr('href', anchorRef) ;   
               }               
            }
            console.log('this = ', $(this).attr('id')) ;            
         }) ;
      }            
   }) ; 
} ;   

//read text comparison data
let json_in = fs.readFileSync('./data/json/annoTextComp_1-2.json', 'utf8');
//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

groupedBySource = jsonJs_in.results.bindings.groupBy( item => {        
    return item.source_target.value ;
 }) ;
 //collect the html partials of the works into one html dom
 Object.keys(groupedBySource).forEach((key) => {
      console.log('key = ', key) ;
      let fileNamePath = 'data/txt/' + key + '_all_html.txt' ;    //data/txt/Bae_TB_8_all_html.txt  
      console.log('filename = ', fileNamePath) ;
      let html_str = fs.readFileSync(fileNamePath, 'utf8') ;
      //let html_str = '<div><a href="" id="comp_Bae_TB_8_130">test</a>test<a href="" id="comp_Bae_TB_8_140">test</a></div>';
      let html = $.parseHTML(html_str) ;      
      $('html').find('body').append('<div></div>') ;
      $('html').find('body').children('div:last-child').append(html) ;      
 }) ;
//console.log('html = ', dom.serialize()) ;

//iterate over text compare annotations
jsonJs_in.results.bindings.forEach((item, index, array) => {   
   let sourceBody = item.source_body.value ;   
   groupedById = jsonJs_in.results.bindings.groupBy( item => {        
      return item.id.value ;
   }) ;   
   if (groupedById[sourceBody] !== undefined) {
      let anchorSource = item.source_target.value ;
      let anchorRefSource = groupedById[sourceBody][0].source_target.value ;
      let anchorId_pos_nr = item.start.value ;
      let anchorRef_pos_nr = groupedById[sourceBody][0].start.value ; 
      setRefValue(anchorSource, anchorRefSource, anchorId_pos_nr, anchorRef_pos_nr) ;   
   }

} ) ; 

let test_html = dom.serialize() ;

//write tei file
//fs.writeFileSync('data/html/synoptik.html', synoptik_html ) ;
fs.writeFileSync('data/html/test.html', test_html ) ;  
