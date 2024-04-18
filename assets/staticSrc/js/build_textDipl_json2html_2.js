// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
//const ShortUniqueId = require('short-unique-id');
const { exit } = require("process") ;
var convert = require('xml-js') ;
const { group } = require("console");

var pos_body = 0 ;
var title_short = '' ;
//var groupedByPos = {} ;
var html_str = '' ;

// Creating a window with a document
const dom = new jsdom.JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>
//Instantiate ShortUniqueId
//const uid = new ShortUniqueId({ length: 10 });

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
   //return uid.rnd() + '_' + item.pos.value ;
   return item.pos.value ;
}

function buildDiplText(jsonJs_in_dipl, jsonJs_anno_files) {   
   html_str = '' ;
   console.log('jsonJs_anno_files = ', jsonJs_anno_files) ; 
   //find tei:body
    if (jsonJs_in_dipl.head !== undefined) {        
        jsonJs_in_dipl.results.bindings.forEach((item, index, array) => {
            if (typeof item === 'object') {                
                if (item.name !== undefined) {
                    if (item.name.value == 'http://www.tei-c.org/ns/1.0/body' 
                        && item.type.value == 'https://github.com/KfNGOe/kfngoeo#StartTag') {
                        pos_body = item.pos.value ;                        
                    }
                    if (item.name.value == 'http://www.tei-c.org/ns/1.0/TEI' 
                        && item.type.value == 'https://github.com/KfNGOe/kfngoeo#StartTag'
                        && item.attr.value == 'xmlns') {
                        title_short = item.pos.value.substring(0, item.pos.value.length - 2) ;
                    }
                }                
            }
        }) ;
        console.log('pos_body = ', pos_body) ;
        console.log('title_short = ', title_short) ; 
        //BIND(xsd:integer(SUBSTR(?o_pos_ch_end,strlen(?title_short)+2)) AS ?end_nr_ch)       
    }
    groupedByPos = jsonJs_in_dipl.results.bindings.groupBy( item => {
      return item.pos.value ;
    }) ;
    groupedByStartPos = jsonJs_anno_files['annoTextComp'].results.bindings.groupBy( item => {
         return item.start_target.value ;
    }) ;
    groupedBySourceTarget = jsonJs_anno_files['annoTextComp'].results.bindings.groupBy( item => {
         return item.source_target.value ;
    }) ;
    groupedByStartPos_addSpan = jsonJs_anno_files['annoAddSpan'].results.bindings.groupBy( item => {
         return item.start_target.value ;
    }) ;
    groupedBySourceTarget_addSpan = jsonJs_anno_files['annoAddSpan'].results.bindings.groupBy( item => {
      return item.source_target.value ;
    }) ;
    groupedByKey_person = jsonJs_anno_files['annoPerson'].results.bindings.groupBy( item => {
      return item.key.value ;
    }) ;
    groupedByKey_place = jsonJs_anno_files['annoPlace'].results.bindings.groupBy( item => {
      return item.key.value ;
    } ) ;    
    groupedByStartPos_index = jsonJs_anno_files['annoIndex'].results.bindings.groupBy( item => {
      return item.start_target.value ;
    } ) ;
    groupedByKey_org = jsonJs_anno_files['annoOrg'].results.bindings.groupBy( item => {
      return item.key.value ;
    } ) ;

    //find first pos of index main term
      let index_main_item = [] ;
      Object.keys(groupedByStartPos_index).forEach((key) => {
         groupedByStartPos_index[key].forEach((item) => {
            if (item.source_target.value == title_short) {
               if(index_main_item.length == 0) {
               index_main_item.push(item) ;               
               }
            }
         }) ;
      } ) ;      
     
   //iterate over pos
   Object.keys(groupedByPos).forEach((key) => {
      //console.log('key = ', key) ;
      if (posStr2Nr(key) >= posStr2Nr(pos_body)) {
         //console.log('key = ', key) ;
         let item = groupedByPos[key] ;
         //console.log('item = ', item) ;
         let classNames = "" ;
         let href = "" ;
         let title = "" ;
         let id = "" ;
         let html_str_tmp = "" ;
         switch(item[0].type.value) {
            case 'https://github.com/KfNGOe/kfngoeo#StartTag':
               switch(item[0].name.value) {
                  case 'http://www.tei-c.org/ns/1.0/div':                     
                     item.forEach((item) => {                        
                        //console.log('item = ', item) ;
                        switch(item.attr.value) {
                           case 'type':
                              //set class
                              switch(item.val.value) {
                                 case 'diaryEntry':
                                    classNames = classNames.concat('diaryEntry ') ;
                                    break ;
                                 case 'chapter':
                                    classNames = classNames.concat('chapter ') ;
                                    break ;                                 
                                 default:
                                    break ;
                              }
                              break ;
                           case 'n':
                              //set title
                              title = item.val.value ;
                              break ;
                           default:
                              break ;
                        }
                     } ) ;
                     //remove last space from classNames
                     classNames = classNames.substring(0, classNames.length - 1) ;
                     //set id
                     id = 'div_' + key ;
                     //concatenate html string
                     html_str = html_str.concat('<div class="' + classNames + '" title="' + title + '" id="' + id + '">') ;                     
                     break ;                  
                  case 'http://www.tei-c.org/ns/1.0/head':
                     //set class
                     classNames = classNames.concat('head') ;
                     //set id
                     id = 'head_' + key ;
                     //concatenate html string
                     html_str = html_str.concat('<h5 class="' + classNames + '" id="' + id + '">') ;                     
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/p':                     
                     //set id
                     id = 'p_' + key ;
                     //concatenate html string
                     html_str = html_str.concat('<p id="' + id + '">') ;                     
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/pb':
                     classNames = classNames.concat('pb pageLocator') ;
                     item.forEach((item, index, array) => {                        
                        //console.log('item = ', item) ;
                        switch(item.attr.value) {
                           case 'facs':
                              //set href
                              href = item.val.value ;                              
                              break ;
                           case 'n':
                              //set 1st id
                              id = item.val.value ;
                              html_str = html_str.concat('<span class="' + classNames + '" id="' + id + '">') ;
                              //set html string for img with 1st id
                              html_str_tmp = html_str_tmp.concat('<img src="images/pageBreak.png" title="' + id + '" style="display: none">') ;
                              break ;
                           default:
                              break ;
                        }
                     } ) ;                     
                     //set 2nd id
                     id = 'pb_' + key ;
                     //concatenate html string
                     html_str = html_str.concat('<a href="#' + href + '" id="' + id + '">' + html_str_tmp + '</a>') ;
                     html_str = html_str.concat('</span>') ;
                     break ;                  
                  case 'http://www.tei-c.org/ns/1.0/anchor':                     
                     if (groupedByStartPos[posStr2Nr(key)] !== undefined) {                        
                        //check target source
                        let item_anno_arr = groupedByStartPos[posStr2Nr(key)] ;
                        let item_anno = {} ;                        
                        groupedBySourceTarget_pos = item_anno_arr.groupBy( item => {
                           return item.source_target.value ;
                        }) ;
                        //get right target
                        if (groupedBySourceTarget_pos[title_short] !== undefined) {
                           item_anno = groupedBySourceTarget_pos[title_short][0] ;                           
                           //check status and set class
                           switch(item_anno.status.value) {
                              case 'equal':
                                 classNames = classNames.concat('anchor comp-equal') ;                                  
                                 break ;
                              case 'notEqual':
                                 classNames = classNames.concat('anchor comp-inequal') ;                                 
                                 break ;
                              case 'missing':
                                 classNames = classNames.concat('anchor comp-not') ;                                 
                                 break ;
                              default:
                                 break ;
                           }
                           //set href
                           href = "comp_" + item_anno.source_body.value + '_' + item_anno.start_body.value ;
                           //set id
                           id = 'comp_' + key ;
                           //concatenate html string
                           html_str = html_str.concat('<a class="' + classNames + '" href="#' + href + '" id="' + id + '" style="display: none"><img src="images/anchor.png" title="click"></a>') ;                                                   
                        } else {
                           console.log('source target = ', title_short, ' not in anno items at pos = ', key) ; 
                        }                        
                     } else {
                        console.log('key = ', key, ' not in annoTextComp') ;
                        //html_str = html_str.concat('<a href="#" id="' + id + '"><img src="images/anchor.png" title="click" style="display: none"></a>') ;
                     }
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/index':                     
                     //check if pos is in index
                     if (!(index_main_item[0].start_target.value < posStr2Nr(key) && posStr2Nr(key) < index_main_item[0].end_target.value)) {
                        //set new index main term
                        index_main_item = [] ;
                        groupedByStartPos_index[posStr2Nr(key)].forEach((item) => {
                           if (item.source_target.value == title_short) {
                              if(index_main_item.length == 0) {
                              index_main_item.push(item) ;               
                              }
                           }
                        }) ;                        
                        //set class
                        classNames = classNames.concat('index') ;
                        //set href           
                        let pos_index = posStr2Nr(key) ;
                        href = "reg_" + groupedByStartPos_index[pos_index][0].id.value ;                     
                        //set id
                        id = 'index_' + key ;
                        //concatenate html string
                        html_str = html_str.concat('<a class="' + classNames + '" href="#' + href + '" id="' + id + '" style="display: none">')   
                     }
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/orgName':
                     //set class
                     classNames = classNames.concat('org') ;
                     //set href
                     let key_org = item[0].val.value ; 
                     if (groupedByKey_org[key_org] === undefined) {
                        console.log('key_org = ', key_org, ' not in annoOrg') ;
                     } else {
                        href = "reg_" + groupedByKey_org[key_org][0].id.value ;                     
                        //set id
                        id = 'org_' + key ;
                        //concatenate html string
                        html_str = html_str.concat('<a class="' + classNames + '" href="#' + href + '" id="' + id + '" style="display: none">')
                     }                     
                     break ;                     
                  case 'http://www.tei-c.org/ns/1.0/persName':
                     //set class
                     classNames = classNames.concat('person') ;
                     //set href
                     let key_person = item[0].val.value ;                  
                     href = "reg_" + groupedByKey_person[key_person][0].id.value ;                     
                     //set id
                     id = 'person_' + key ;
                     //concatenate html string
                     html_str = html_str.concat('<a class="' + classNames + '" href="#' + href + '" id="' + id + '" style="display: none">')
                     break ;   
                  case 'http://www.tei-c.org/ns/1.0/placeName':
                  //set class
                     classNames = classNames.concat('place') ;
                     //set href
                     let key_place = item[0].val.value ;
                     href = "reg_" + groupedByKey_place[key_place][0].id.value ;
                     //set id
                     id = 'place_' + key ;
                     //concatenate html string
                     html_str = html_str.concat('<a class="' + classNames + '" href="#' + href + '" id="' + id + '" style="display: none">')
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/note':                     
                     //set class
                     classNames = classNames.concat('note ') ;
                     item.forEach((item) => {                        
                        switch(item.attr.value) {
                           case 'type':
                              switch(item.val.value) {
                                 case 'editorial':
                                    classNames = classNames.concat('editorial ') ;
                                    break ;                                 
                                 default:
                                    break ;
                              }
                              break ;                           
                           default:
                              break ;
                        }
                     } ) ;
                     //remove last space from classNames
                     classNames = classNames.substring(0, classNames.length - 1) ;                     
                     //set id
                     id = 'note_' + key ;
                     html_str = html_str.concat('<a href="#' + key + '" style=""><img src="images/note.png" title="note" style="display: none"></a><div class="' + classNames + '" id="' + id + '" style="display: none">') ;
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/ref':
                     //set class
                     classNames = classNames.concat('ref') ;
                     //set href                     
                     item.forEach((item) => {                        
                        switch(item.attr.value) {
                           case 'target':
                              href = item.val.value ;                              
                              break ;                           
                           default:
                              break ;
                        }
                     } ) ;
                     //set id
                     id = 'ref_' + key ;
                     html_str = html_str.concat('<a class="' + classNames + '" href="' + href + '" id="' + id + '" style="" target="_blank">') ;
                     break
                     /*
                  case 'http://www.tei-c.org/ns/1.0/app':
                     break ;
                     */
                  default:
                     break ;
               }                        
               break ;
            case 'https://github.com/KfNGOe/kfngoeo#EndTag':
               switch(item[0].name.value) {
                  case 'http://www.tei-c.org/ns/1.0/div': 
                     html_str = html_str.concat('</div>') ;
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/head':
                     html_str = html_str.concat('</h5>') ;
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/p': 
                     html_str = html_str.concat('</p>') ;
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/index':
                     //check if end pos of index main term
                     if (index_main_item[0].end_target.value == posStr2Nr(key)) {                        
                        html_str = html_str.concat('</a>') ;
                     }
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/orgName': 
                     html_str = html_str.concat('</a>') ;
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/persName': 
                     html_str = html_str.concat('</a>') ;
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/placeName': 
                     html_str = html_str.concat('</a>') ;
                     break ;
                  case 'http://www.tei-c.org/ns/1.0/note':
                     html_str = html_str.concat('</div>') ;
                     break ;                  
                  case 'http://www.tei-c.org/ns/1.0/ref':
                     html_str = html_str.concat('</a>') ;
                     break ;
                     default:
                     break ;
               }
               break ;            
            case 'https://github.com/KfNGOe/kfngoeo#Text':
               let hit_flag = false ;               
               //check if text is between anchor and app pos
               if (groupedBySourceTarget[title_short] !== undefined) {
                  let item_anno = {} ;               
                  let item_hit = groupedBySourceTarget[title_short].find((item_source) => {
                     item_anno = item_source ;
                     return (+item_source.start_target.value < posStr2Nr(key)) && (posStr2Nr(key) < +item_source.end_target.value) ;
                  } ) ;
                  if (item_hit !== undefined) {
                     //text is between anchor and app pos
                     hit_flag = true ;
                     //check status and set class
                     switch(item_anno.status.value) {
                        case 'equal': 
                           classNames = classNames.concat('comp-equal ') ;                        
                           break ;
                        case 'notEqual':
                           classNames = classNames.concat('comp-inequal ') ;                        
                           break ;
                        case 'missing':
                           classNames = classNames.concat('comp-not ') ;                        
                           break ;
                        default:
                           break ;
                     }
                  } else {
                     //check if text is between app pos
                     let pos_tmp = posNr2Str(posStr2Nr(key) - 2) ;
                     let pos_arr = groupedByPos[pos_tmp] ;                     
                     if (pos_arr[0].name !== undefined && pos_arr[0].name.value == 'http://www.tei-c.org/ns/1.0/app' 
                        && pos_arr[0].type.value == 'https://github.com/KfNGOe/kfngoeo#StartTag') {
                        hit_flag = true ;
                        classNames = classNames.concat('rdg ') ;
                        item[0].cont.value = '' ;
                     }
                  }
               }               
               //check if text is between addSpan and anchor pos               
               if (groupedBySourceTarget_addSpan[title_short] !== undefined) {
                  let item_anno = {} ;
                  let item_hit = groupedBySourceTarget_addSpan[title_short].find((item_source) => {
                     item_anno = item_source ;
                     return (+item_source.start_target.value < posStr2Nr(key)) && (posStr2Nr(key) < +item_source.end_target.value) ;
                  } ) ;
                  if (item_hit !== undefined) {
                     //text is between addSpan and anchor pos
                     hit_flag = true ;
                     //set class
                     classNames = classNames.concat('addSpan ') ;
                  }
               }               
               //remove last space from classNames
               if (classNames.length > 0) {
                  classNames = classNames.substring(0, classNames.length - 1) ;
               }
               //set id
               id = 'text_' + key ;               
               if (hit_flag) {                  
                  //concatenate html string
                  html_str = html_str.concat('<span class="' + classNames + '" id="' + id + '">') ;
                  html_str = html_str.concat(item[0].cont.value) ;
                  html_str = html_str.concat('</span>') ;                  
               } else {                   
                  html_str = html_str.concat('<span id="' + id + '">') ;
                  html_str = html_str.concat(item[0].cont.value) ;
                  html_str = html_str.concat('</span>') ;
               }                                             
               break ;
            case 'https://github.com/KfNGOe/kfngoeo#Comment':
               //console.log('Comment: ', item.cont.value) ;
               break ;            
            default:
               break ;
         }         
      }
   }) ;
} ; 

//read json anno directory
let jsonFiles = fs.readdirSync('data/json/anno/') ;
console.log('json files: ', jsonFiles) ;
//iterate over anno files
let jsonJs_anno_files = {} ;
jsonFiles.forEach((file) => {
   //read anno text json files   
   let fileNamePath = 'data/json/anno/' + file ;   
   let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
   console.log('json data read: ', json_in.length, ' bytes') ;
   let jsonJs_in_anno = JSON.parse(json_in) ;
   jsonJs_anno_files[file.replace('.json', '')] = jsonJs_in_anno ;
   console.log('jsonJs_anno_files = ', jsonJs_anno_files) ;   
}) ;

//read json dipl directory
jsonFiles = fs.readdirSync('data/json/dipl/') ;
console.log('json files: ', jsonFiles) ;
//iterate over dipl files
jsonFiles.forEach((file) => {
   //read dipl text json files
   let fileNamePath = 'data/json/dipl/' + file ;   
   let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
   console.log('json data read: ', json_in.length, ' bytes') ;
   let jsonJs_in_dipl = JSON.parse(json_in) ;   
   buildDiplText(jsonJs_in_dipl, jsonJs_anno_files) ;
   //write html strings to files
   fileNamePath = 'data/txt/' + file.replace('.json', '_html.txt') ;    //data/txt/Bae_TB_8_dipl_html.txt  
   fs.writeFileSync(fileNamePath, html_str ) ;  
   //convert html strings to html 
   console.log('text data written: ', html_str.length, ' bytes')
   let html = $.parseHTML(html_str) ;   
   $('html').find('body').append('<div id="' + file.replace('.json', '') + '"></div>') ;    
   $('html').find('body').children('div').append(html) ;   

   //write html file
   fileNamePath = 'html/' + file.replace('.json', '.html') ;    //html/Bae_TB_8_dipl.html
   fs.writeFileSync(fileNamePath, dom.serialize() ) ;
   console.log('html data written: ', dom.serialize().length, ' bytes') ;

   //remove appended html
   $('html').find('body *').remove() ;
   //reset html string
   html_str = '' ;
}) ;