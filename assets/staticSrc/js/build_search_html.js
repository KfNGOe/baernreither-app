const LF = '\n' ;
// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs');
var convert = require('xml-js');

var i_xmlId = 0 ;
var search_html = '' ;

// Creating a window with a document
let dom_temp_str = fs.readFileSync("assets/txt/dom.txt", 'utf8');
let search_scripts = fs.readFileSync("assets/txt/partials/search/search_scripts.txt", 'utf8');
dom_temp_str = dom_temp_str.concat(search_scripts) ;
const dom = new jsdom.JSDOM (dom_temp_str) ;

// Importing the jquery and providing it
// with the window
const $ = require("jquery")(dom.window);

//build head
var head_str = fs.readFileSync("assets/txt/partials/head.txt", 'utf8');
var head = $.parseHTML(head_str) ;
$('html').find('head').append(head) ;

//build nav bar
//var nav = navbar ;
var header_nav_str = fs.readFileSync("assets/txt/partials/header-nav.txt", 'utf8');
var header_nav = $.parseHTML(header_nav_str) ;
$('html').find('header').replaceWith(header_nav) ;

//build main
var main_str = fs.readFileSync("assets/txt/search.txt", 'utf8');
var main = $.parseHTML(main_str) ;
$('html').find('main').replaceWith(main) ;

//build search input
var input_str = fs.readFileSync("assets/txt/partials/search/search_input.txt", 'utf8'); //assets/txt/partials/search/search_input.txt
var input = $.parseHTML(input_str) ;
$('html').find('div.row').append(input) ;
//build search results
var results_str = fs.readFileSync("assets/txt/partials/search/search_result.txt", 'utf8');
var results = $.parseHTML(results_str) ;
$('html').find('div.row').append(results) ;
//console.log('dom: ', dom.serialize()) ;

//build footer
var footer_str = fs.readFileSync("assets/txt/partials/footer.txt", 'utf8');
var footer = $.parseHTML(footer_str) ;
$('html').find('footer').replaceWith(footer) ;

search_html = dom.serialize() ;
//console.log('search.html =' + LF, search_html) ;

//write html file
//filepath = path_out_tei + filename + ext_xml ;
//console.log(filepath);
fs.writeFileSync('html/suche.html', search_html ) ;
