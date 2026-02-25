// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { exit } = require("process") ;
var convert = require('xml-js') ;
const { group } = require("console");

// Creating a window with a document
const dom = new JSDOM() ;
const $ = require('jquery')(dom.window) ;
//dom =  <html><head></head><body></body></html>

const filepath_in_json=process.env.filepath_in_json ;
const filepath_out_json=process.env.filepath_out_json ;
const path_in_json=process.env.path_in_json ;
const path_out_ttl=process.env.path_out_ttl ;

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

// Add TTL conversion function
function convertToTtl(jsonData) {
    console.log('Converting to TTL format...');
    
    function escapeString(str) {
        return str.replace(/"/g, '\\"').replace(/\\/g, '\\\\');
    }
    
    const ttlPrefixes = `@prefix kfngoeo: <https://github.com/KfNGOe/kfngoeo#> .
@prefix kfngoei: <https://github.com/KfNGOe/kfngoei/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

`;

    const ttlTriples = jsonData.results.bindings.map(binding => {
        const safeShort = binding.title.short.replace(/-/g, '_').toLowerCase();
        
        return `kfngoei:${safeShort} a kfngoeo:TextDocument ;
    kfngoeo:hasFileName "${escapeString(binding.fileName)}" ;
    kfngoeo:hasMainTitle "${escapeString(binding.title.main)}" ;
    kfngoeo:hasDisplayTitle "${escapeString(binding.title.display)}" ;
    kfngoeo:hasShortTitle "${escapeString(binding.title.short)}" ;
    kfngoeo:hasDate "${escapeString(binding.date)}" ;
    kfngoeo:hasPageCount ${binding.pageCount} ;
    kfngoeo:hasFirstPageNr "${escapeString(binding.firstPageNr)}" ;
    rdfs:label "${escapeString(binding.title.display)}" .
`;
    }).join('\n');

    const ttlContent = ttlPrefixes + ttlTriples;
    
    // Create output directory
    const outputDir = 'data/ttl/text/mdata/';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }    
    return ttlContent;    
}

//read text data json file
let json_in = fs.readFileSync(filepath_in_json, 'utf8') ;
let jsonJs_in = JSON.parse(json_in) ;
let text_mdata_results = jsonJs_in ;
let text_mdata_temp = jsonJs_in.results.bindings[0] ;
//delete template object
delete text_mdata_results.results.bindings[0] ;
text_mdata_results.results.bindings.shift() ;
//read json all directory
jsonFiles = fs.readdirSync(path_in_json) ;
//iterate over all files
jsonFiles.forEach((file,index_file) => {
    //write file name to text data
    let text_mdata_result = text_mdata_temp ;
    text_mdata_result.fileName = file ;    
    //read json all file
    let fileNamePath = 'data/json/text/all/' + file ;   
    let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
    console.log('json data read: ', json_in.length, ' bytes') ;
    let text_all = JSON.parse(json_in) ;       
    //find title in text_all json    
    groupedByType = text_all.results.bindings.groupBy( item => {
        return item.type.value ;
    } ) ;
    groupedByPos = text_all.results.bindings.groupBy( item => {
        return item.pos.value ;
    } ) ;
    //title main
    let title = groupedByType['https://github.com/KfNGOe/kfngoeo#StartTag'].find((item, index_title) => {        
        return (item.name.value == 'http://www.tei-c.org/ns/1.0/title' && item.attr.value == 'type' && item.val.value == 'volume') ;
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
        text_mdata_result.title.main = groupedByPos[pos][0].cont.value ;        
    } else {
        console.log('error: no main title') ;
    }
    //title display
    let title_dis = groupedByType['https://github.com/KfNGOe/kfngoeo#StartTag'].find((item, index_title) => {        
        return (item.name.value == 'http://www.tei-c.org/ns/1.0/title' && item.attr.value == 'type' && item.val.value == 'display') ;
    }) ;
    if (title_dis !== undefined) {
        //get pos of item
        let pos = title_dis.pos.value ;
        let pos_nr = posStr2Nr(pos) ;        
        //let pos_nr = +pos.substring(pos.lastIndexOf('_')+1) ;
        pos_nr++ ;
        pos = posNr2Str(pos_nr, pos) ;
        //pos = pos.substring(0, pos.lastIndexOf('_')) + '_' + (pos_nr+1).toString() ;
        //get title display
        text_mdata_result.title.display = groupedByPos[pos][0].cont.value ;        
    } else {
        console.log('error: no display title') ;
    }
    //title short
    let title_short = groupedByType['https://github.com/KfNGOe/kfngoeo#StartTag'].find((item, index_title) => {        
        return (item.name.value == 'http://www.tei-c.org/ns/1.0/title' && item.attr.value == 'type' && item.val.value == 'short') ;
    }) ;
    if (title_short !== undefined) {
        //get pos of item
        let pos = title_short.pos.value ;
        let pos_nr = posStr2Nr(pos) ;        
        //let pos_nr = +pos.substring(pos.lastIndexOf('_')+1) ;
        pos_nr++ ;
        pos = posNr2Str(pos_nr, pos) ;
        //pos = pos.substring(0, pos.lastIndexOf('_')) + '_' + (pos_nr+1).toString() ;
        //get title display
        text_mdata_result.title.short = groupedByPos[pos][0].cont.value ;        
    } else {
        console.log('error: no short title') ;
    }
    //find date in text_all json
    let date = groupedByType['https://github.com/KfNGOe/kfngoeo#StartTag'].find((item, index_title) => {        
        return item.name.value == 'http://www.tei-c.org/ns/1.0/creation' ;
    }) ;
    if (date !== undefined) {
        //get date
        pos_tmp = date.pos.value ;
        pos_nr = posStr2Nr(pos_tmp) + 2 ;
        pos_tmp = posNr2Str(pos_nr, pos_tmp) ;
        text_mdata_result.date = groupedByPos[pos_tmp][0].cont.value ;
        console.log('date: ', text_mdata_result.date) ;
        //text_mdata_result.date = date.val.value ;
    } else {
        console.log('error: no date') ;
    }
    //find page number of text_all json
    groupedByName = text_all.results.bindings.groupBy( item => {
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
    text_mdata_result.pageCount = Math.round(pageCount) ;
    //get first page number
    let page_array = [] ;
    groupedByName['http://www.tei-c.org/ns/1.0/pb'].forEach((item, index_page) => {
        if(item.attr.value === "n") {
            page_array.push(item.val.value) ;
        }
    }) ;
    text_mdata_result.firstPageNr = page_array[0] ;
    //add item object to text data    
    text_mdata_results.results.bindings.push(JSON.parse(JSON.stringify(text_mdata_result))) ;
    //reset text data result
    text_mdata_result = {} ;
}) ;
//write text data json file
let json_out = JSON.stringify(text_mdata_results) ;
fs.writeFileSync(filepath_out_json, json_out) ;

// Convert to TTL
let ttlContent = convertToTtl(text_mdata_results);
// Write TTL file
fs.writeFileSync(path_out_ttl + 'text_mdata.ttl', ttlContent);
