
// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs');
var convert = require('xml-js');

const path_in_tei=process.env.path_in_tei 
const path_out_json=process.env.path_out_json
const path_out_tei=process.env.path_out_tei
const filename = process.env.file; 
const ext_xml=process.env.ext_xml
const ext_json=process.env.ext_json

var i_xmlId = 0 ;

// Creating a window with a document
const dom = new jsdom.JSDOM (
    `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">`
) ;
// Importing the jquery and providing it
// with the window
const $ = require("jquery")(dom.window);
console.log(dom.serialize()) ;
/*
(async () => {
    const dom = await JSDOM.fromFile("html/index.html") ;
    //console.log(dom.serialize()) ;
    const $ = require("jquery")(dom.window) ;
}) () ;
*/
//read xml file
var xml = fs.readFileSync("data/meta/about.xml", 'utf8');
console.log('tei data read: ', xml.length, ' bytes') ;

xmlDoc = $.parseXML( xml ) ,
$xml = $( xmlDoc ),
titleShort = $xml.find( "[type='sub']" ).text();
//$titleAttr = $title.attr('type') ;
console.log('title = ', titleShort) ;

/*
var xmlJs = convert.xml2js(xml, {compact: false, spaces: 2});

//start with xml:id = 0
getObject(xmlJs) ;

//write xml file
filepath = path_out_tei + filename + ext_xml ;
console.log(filepath);
xml = convert.js2xml(xmlJs, {compact: false, spaces: 2}) ;
fs.writeFileSync(filepath, xml ) ;
console.log('xml data written: ', xml.length, ' bytes')

//write json file
filepath = path_out_json + filename + ext_json ;
console.log(filepath);
var xmlJsString = JSON.stringify(xmlJs);
fs.writeFileSync(filepath, xmlJsString ) ;
console.log('json data written: ', xmlJsString.length, ' bytes')
*/
