const LF = '\n' ;
// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs');
var convert = require('xml-js');

const html_path_left = 'main div.synoptik-box:nth-child(2) div.auswahl-content div.col-12' ;
const html_path_right = 'main div.synoptik-box:nth-child(3) div.auswahl-content div.col-12' ;
var i_xmlId = 0 ;
var synoptik_html = '' ;

// Creating a window with a document
let dom_temp_str = fs.readFileSync("assets/txt/dom.txt", 'utf8');
let synoptik_scripts = fs.readFileSync("assets/txt/partials/synoptik/synoptik_scripts.txt", 'utf8');
dom_temp_str = dom_temp_str.concat(synoptik_scripts) ;
const dom = new JSDOM (dom_temp_str) ;

// Importing the jquery and providing it
// with the window
const $ = require("jquery")(dom.window);

//build head
var head_str = fs.readFileSync("assets/txt/partials/head.txt", 'utf8');
var head = $.parseHTML(head_str) ;
$('html').find('head').append(head) ;

//build scripts
$('html').find('head').append('<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>') ;
$('html').find('head').append('<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>') ;
$('html').find('head').append('<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>') ;

//build nav bar
var header_nav_str = fs.readFileSync("assets/txt/partials/header-nav.txt", 'utf8');
var header_nav = $.parseHTML(header_nav_str) ;
$('html').find('header').replaceWith(header_nav) ;

//build main
var main_str = fs.readFileSync("assets/txt/synoptik.txt", 'utf8');
var main = $.parseHTML(main_str) ;
$('html').find('main').replaceWith(main) ;

//build content of left box
$('html').find(html_path_left).children().remove() ;

//build content of right box
$('html').find(html_path_right).children().remove() ;

//build footer
var footer_str = fs.readFileSync("assets/txt/partials/footer.txt", 'utf8');
var footer = $.parseHTML(footer_str) ;
$('html').find('footer').replaceWith(footer) ;

synoptik_html = dom.serialize() ;

//write html file
fs.writeFileSync('html/synoptik.html', synoptik_html ) ;
