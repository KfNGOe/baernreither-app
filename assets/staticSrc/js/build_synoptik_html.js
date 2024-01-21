const LF = '\n' ;
// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs');
var convert = require('xml-js');

var i_xmlId = 0 ;
var synoptik_html = '' ;

// Creating a window with a document
var dom_temp_str = fs.readFileSync("assets/txt/dom.txt", 'utf8');
const dom = new jsdom.JSDOM (dom_temp_str) ;

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
var main_str = fs.readFileSync("assets/txt/synoptik.txt", 'utf8');
var main = $.parseHTML(main_str) ;
$('html').find('main').replaceWith(main) ;

//build footer
var footer_str = fs.readFileSync("assets/txt/partials/footer.txt", 'utf8');
var footer = $.parseHTML(footer_str) ;
$('html').find('footer').replaceWith(footer) ;

//build scripts
//$('html').find('body').append('<script src="js/bootstrap.bundle.min.js"></script>') ;
//$('html').find('body').append('<script src="js/nav-control.js"></script>') ;

synoptik_html = dom.serialize() ;
console.log('synoptik.html =' + LF, synoptik_html) ;

//write html file
//filepath = path_out_tei + filename + ext_xml ;
//console.log(filepath);
fs.writeFileSync('html/synoptik.html', synoptik_html ) ;
console.log('html data written: ', synoptik_html.length, ' bytes')