const LF = '\n' ;
// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs');
var convert = require('xml-js');
const header = require('./build_head.js') ;
const navbar = require('./build_navbar.js') ;
const footer = require('./build_footer.js') ;

const path_in_tei=process.env.path_in_tei 
const path_out_json=process.env.path_out_json
const path_out_tei=process.env.path_out_tei
const filename = process.env.file; 
const ext_xml=process.env.ext_xml
const ext_json=process.env.ext_json

var i_xmlId = 0 ;
var index_html = '' ;


(async () => {
    const dom = await JSDOM.fromFile("data/html/register_temp.html") ;
    //console.log(dom.serialize()) ;
    const $ = require("jquery")(dom.window) ;
    
    //build head
    var head = header ;
    $('html').find('head').append(head) ;

    //build nav bar
    var nav = navbar ;
    $('html').find('header').append(nav) ;

    //table    
    var table = fs.readFileSync("html/person.html", 'utf8');
    console.log('html data read: ', table.length, ' bytes') ;
    //console.log('table =', table) ;
    $('html').find('#pageContent div.row').append(table) ;

    //write html file
    var html = dom.serialize() ;
    //filepath = path_out_tei + filename + ext_xml ;
    //console.log(filepath);
    fs.writeFileSync('html/person.html', html ) ;
    console.log('html data written: ', html.length, ' bytes')
}) () ;

/*
// Creating a window with a document
const dom = new jsdom.JSDOM (
    '<!DOCTYPE html>' + LF + 
    '<html xmlns="http://www.w3.org/1999/xhtml">' + LF
    + '<head>' + LF
    + '</head>' + LF
    + '<body>' + LF
    + '<header>' + LF
    + '</header>' + LF
    + '<main>' + LF
    + '</main>' + LF
    + '<footer class="footer mt-auto pt-5">' + LF
    + '</footer>' + LF
    + '</body>' + LF    
    + '</html>' + LF
) ;
// Importing the jquery and providing it
// with the window
const $ = require("jquery")(dom.window);

//build head
var head = header ;
$('html').find('head').append(head) ;

//insert title
//read about file
var xml = fs.readFileSync("data/meta/about.xml", 'utf8');
console.log('tei data read: ', xml.length, ' bytes') ;

xmlDoc = $.parseXML( xml ) ,
$xml = $( xmlDoc ),
titleSub = $xml.find( "[type='sub']" ).text();

$('html').find('head').append('<title>' + titleSub + '</title>') ;

//build nav bar
var nav = navbar ;
$('html').find('header').append(nav) ;

//build footer
$('html').find('footer').append(footer) ;

index_html = dom.serialize() ;
//console.log('index.html =' + LF, index_html) ;

//write html file
//filepath = path_out_tei + filename + ext_xml ;
//console.log(filepath);
fs.writeFileSync('html/index.html', index_html ) ;
console.log('xml data written: ', index_html.length, ' bytes')



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