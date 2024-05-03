// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
//const ShortUniqueId = require('short-unique-id');
const { exit } = require("process") ;
var convert = require('xml-js') ;
const { group } = require("console");

// Creating a window with a document
const dom = new jsdom.JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>
//Instantiate ShortUniqueId
//const uid = new ShortUniqueId({ length: 10 });

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_txt=process.env.filepath_out_txt ;

function posStr2Nr(posStr) {
   //let pos_tmp = posStr.substring(title_short.length + 1) ;   
   let pos_tmp = +posStr.substring(posStr.lastIndexOf('_')+1) ;
   return +pos_tmp ;
}

function posNr2Str(posNr, posStr) {
   //let pos_tmp = title_short + '_' + posNr.toString() ;
   let pos_tmp = posStr.substring(0, posStr.lastIndexOf('_')) + '_' + posNr.toString() ;   
   return pos_tmp ;
}

//read text data json file
let json_in = fs.readFileSync('data/json/textData_temp.json', 'utf8') ;
console.log('json data read: ', json_in.length, ' bytes') ;
let jsonJs_in = JSON.parse(json_in) ;
let textData_results = jsonJs_in ;
let textData_temp = jsonJs_in.results.bindings[0] ;
//delete template object
delete textData_results.results.bindings[0] ;
textData_results.results.bindings.shift() ;
//read json dipl directory
jsonFiles = fs.readdirSync('data/json/dipl/') ;
console.log('json files: ', jsonFiles) ;
//iterate over dipl files
jsonFiles.forEach((file,index_file) => {
    //write file name to text data
    let textData_result = textData_temp ;
    textData_result.fileName = file ;    
    //read json dipl file
    let fileNamePath = 'data/json/dipl/' + file ;   
    let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
    console.log('json data read: ', json_in.length, ' bytes') ;
    let text_dipl = JSON.parse(json_in) ;       
    //find title in text_dipl json    
    groupedByType = text_dipl.results.bindings.groupBy( item => {
        return item.type.value ;
    } ) ;
    groupedByPos = text_dipl.results.bindings.groupBy( item => {
        return item.pos.value ;
    } ) ;
    let title = groupedByType['https://github.com/KfNGOe/kfngoeo#StartTag'].find((item, index_title) => {        
        return (item.name.value == 'http://www.tei-c.org/ns/1.0/title'            
            && item.attr.value == 'type'
            && item.val.value == 'volume') ;
    }) ;
    if (title !== undefined) {
        //get pos of item
        let pos = title.pos.value ;
        let pos_nr = posStr2Nr(pos) ;        
        //let pos_nr = +pos.substring(pos.lastIndexOf('_')+1) ;
        pos_nr++ ;
        pos = posNr2Str(pos_nr, pos) ;
        //pos = pos.substring(0, pos.lastIndexOf('_')) + '_' + (pos_nr+1).toString() ;
        //get title volume
        textData_result.title.main = groupedByPos[pos][0].cont.value ;
        //get title short
        //+3
        pos_nr = pos_nr + 3;
        pos = posNr2Str(pos_nr, pos);
        textData_result.title.short = groupedByPos[pos][0].cont.value ;
    } else {
        console.log('error: no title') ;
    }
    //find date in text_dipl json
    let date = groupedByType['https://github.com/KfNGOe/kfngoeo#StartTag'].find((item, index_title) => {        
        return (item.name.value == 'http://www.tei-c.org/ns/1.0/date'
            && item.attr.value == 'when') ;
    }) ;
    if (date !== undefined) {
        //get date
        textData_result.date = date.val.value ;
    } else {
        console.log('error: no date') ;
    }
    //find page number of text_dipl json
    groupedByName = text_dipl.results.bindings.groupBy( item => {
        if (item.type.value === "https://github.com/KfNGOe/kfngoeo#StartTag") {
            if (item.name.value === "http://www.tei-c.org/ns/1.0/pb") {
                return item.name.value ;
            }           
        }
    }) ;
    groupedByPage = groupedByName['http://www.tei-c.org/ns/1.0/pb'].groupBy( item => {
        if (item.attr.value === "n") {
            return item.val.value ;
        }
    } ) ;
    let pageCount = Object.keys(groupedByPage).length ;
    textData_result.pageCount = pageCount ;
    //add item object to text data    
    textData_results.results.bindings.push(JSON.parse(JSON.stringify(textData_result))) ;
    //reset text data result
    textData_result = {} ;
}) ;
//write text data json file
let json_out = JSON.stringify(textData_results) ;
fs.writeFileSync('data/json/textData.json', json_out) ;
console.log('json data written: ', json_out.length, ' bytes') ;