const LF = '\n' ;
// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs');

var map_html = '' ;

// Creating a window with a document
let dom_temp_str = fs.readFileSync("assets/txt/dom.txt", 'utf8');
let karte_scripts = fs.readFileSync("assets/txt/partials/karte/karte_scripts.txt", 'utf8');
dom_temp_str = dom_temp_str.concat(karte_scripts) ;
const dom = new jsdom.JSDOM (dom_temp_str) ;

// Importing the jquery and providing it
// with the window
const $ = require("jquery")(dom.window);

//build head
var head_str = fs.readFileSync("assets/txt/partials/head.txt", 'utf8');
var head = $.parseHTML(head_str) ;
$('html').find('head').append(head) ;
//build scripts
$('html').find('head').append('<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" />') ;
$('html').find('head').append('<script src="https://unpkg.com/leaflet.markercluster@1.5.0/dist/leaflet.markercluster.js" />') ;

$('html').find('head').append('<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>') ;
$('html').find('head').append('<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>') ;

//build nav bar
//var nav = navbar ;
var header_nav_str = fs.readFileSync("assets/txt/partials/header-nav.txt", 'utf8');
var header_nav = $.parseHTML(header_nav_str) ;
$('html').find('header').replaceWith(header_nav) ;

//build main
var main_str = fs.readFileSync("assets/txt/karte.txt", 'utf8');
var main = $.parseHTML(main_str) ;
$('html').find('main').replaceWith(main) ;

//build footer
var footer_str = fs.readFileSync("assets/txt/partials/footer.txt", 'utf8');
var footer = $.parseHTML(footer_str) ;
$('html').find('footer').replaceWith(footer) ;

//build scripts
//$('html').find('body').append('<script src="js/bootstrap.bundle.min.js"></script>') ;
//$('html').find('body').append('<script src="js/nav-control.js"></script>') ;

map_html = dom.serialize() ;
console.log('karte.html =' + LF, map_html) ;

//write html file
//filepath = path_out_tei + filename + ext_xml ;
//console.log(filepath);
fs.writeFileSync('html/karte.html', map_html ) ;
console.log('html data written: ', map_html.length, ' bytes')
