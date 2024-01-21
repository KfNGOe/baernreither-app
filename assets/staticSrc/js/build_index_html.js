const LF = '\n' ;
// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs');
var convert = require('xml-js');
//const header = require('./build_head.js') ;
//const navbar = require('./build_navbar.js') ;
//const footer = require('./build_footer.js') ;

const path_in_tei=process.env.path_in_tei 
const path_out_json=process.env.path_out_json
const path_out_tei=process.env.path_out_tei
const filename = process.env.file; 
const ext_xml=process.env.ext_xml
const ext_json=process.env.ext_json

var i_xmlId = 0 ;
var index_html = '' ;

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
var head_str = fs.readFileSync("assets/txt/partials/head.txt", 'utf8');
var head = $.parseHTML(head_str) ;
$('html').find('head').append(head) ;

//insert title
//read about file
/*var xml = fs.readFileSync("data/meta/about.xml", 'utf8');
console.log('tei data read: ', xml.length, ' bytes') ;

xmlDoc = $.parseXML( xml ) ,
$xml = $( xmlDoc ),
titleSub = $xml.find( "[type='sub']" ).text();

$('html').find('head').append('<title>' + titleSub + '</title>') ;
*/
//build nav bar
//var nav = navbar ;
var header_nav_str = fs.readFileSync("assets/txt/partials/header-nav.txt", 'utf8');
var header_nav = $.parseHTML(header_nav_str) ;
$('html').find('header').replaceWith(header_nav) ;

//build main
var main_str = fs.readFileSync("assets/txt/index.txt", 'utf8');
var main = $.parseHTML(main_str) ;
$('html').find('main').replaceWith(main) ;

//build footer
var footer_str = fs.readFileSync("assets/txt/partials/footer.txt", 'utf8');
var footer = $.parseHTML(footer_str) ;
$('html').find('footer').replaceWith(footer) ;

//build scripts
//$('html').find('body').append('<script src="js/bootstrap.bundle.min.js"></script>') ;
//$('html').find('body').append('<script src="js/nav-control.js"></script>') ;

index_html = dom.serialize() ;
console.log('index.html =' + LF, index_html) ;

//write html file
//filepath = path_out_tei + filename + ext_xml ;
//console.log(filepath);
fs.writeFileSync('html/index.html', index_html ) ;
console.log('html data written: ', index_html.length, ' bytes')
