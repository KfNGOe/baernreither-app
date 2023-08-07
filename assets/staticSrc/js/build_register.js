// Importing the jsdom module
const jsdom = require("jsdom") ;
const { JSDOM } = jsdom ;
const fs = require('fs');
var convert = require('xml-js');
const header = require('./build_head.js') ;
const navbar = require('./build_navbar.js') ;
const footer = require('./build_footer.js') ;

const path_in = process.env.path_in ;
const file_in = process.env.file_in ;
const ext_in = process.env.ext_in ;
const filepath_in = path_in + file_in + ext_in ;

const path_out = process.env.path_out ;
const file_out = process.env.file_out ;
const ext_out = process.env.ext_out ;
const filepath_out = path_out + file_out + ext_out ;

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
    var table = fs.readFileSync(filepath_in, 'utf8');
    console.log('html data read: ', table.length, ' bytes') ;
    //console.log('table =', table) ;
    $('html').find('#pageContent div.row').append(table) ;

    //build footer
    var foot = footer ;
    $('html').find('footer').append(foot) ;

    //write html file
    var html = dom.serialize() ;    
    fs.writeFileSync(filepath_out, html ) ;
    console.log('html data written: ', html.length, ' bytes')
}) () ;