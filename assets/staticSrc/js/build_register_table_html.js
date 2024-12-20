//build register table from json
const fs = require('fs');

// Importing the jsdom module
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM('<html></html>') ;
const $ = require('jquery')(dom.window) ;

const path_in = process.env.path_in ;
const file_in = process.env.file_in ;
const ext_in = process.env.ext_in ;
const filepath_in = path_in + file_in + ext_in ;

const path_out = process.env.path_out ;
const file_out = process.env.file_out ;
const ext_out = process.env.ext_out ;
const filepath_out = path_out + file_out + ext_out ;

var html = '';

function build_html(obj) {
   let length = Object.keys(obj).length;
   //console.log('object length =', length);
   Object.keys(obj).forEach((key) => {
      //console.log('key = ', key);
      switch (key) {
         case 'results':
            //console.log('results =  ', obj[key]) ;
            if (typeof obj[key] === 'object') {
               $('tbody').append('<tr></tr>') ;
               build_html(obj[key]);
            } else {
               //console.log('parsing json failed, ', key, ' is not an object');
            }
            break;
         case 'bindings':
            //console.log('bindings = ',obj[key]) ;
            if (Array.isArray(obj[key])) {               
               obj[key].forEach((item, index, array) => {
                if (typeof item === 'object') {                   
                   build_html(item) ;
                }
             }) ;
            } else {
               //console.log('parsing json failed, ', key, ' is not an array');
            }
            break;
         case 'localID':            
            $('tbody').find('tr').last().append('<td style="display: none">' + obj[key].value + '</td>') ;
            //console.log('html = ', $('tbody').html()) ;
            break ;
         case 'entry_person':            
            $('tbody').find('tr').last().append('<td>' + obj[key].value + '</td>') ;
            break ;
         case 'gender':            
            $('tbody').find('tr').last().append('<td style="display: none">' + obj[key].value + '</td>') ;
            break ;
         case 'birth':            
            $('tbody').find('tr').last().append('<td>' + obj[key].value + '</td>') ;
            break ;
         case 'death':            
            $('tbody').find('tr').last().append('<td>' + obj[key].value + '</td>') ;
            break ;
         case 'bio':            
            $('tbody').find('tr').last().append('<td>' + obj[key].value + '</td>') ;
            break ;
         case 'pid':
            let href = 'https://d-nb.info/gnd/' + obj[key].value ;
            $('tbody').find('tr').last().append('<td><a href="' + href + '" target="_blank">' + obj[key].value + '</a></td>') ;
            break ;            
         default:
            console.log('no case');
            break;
      }
   });
   //console.log('result', length) ;
} ;
//read html template
html = fs.readFileSync("data/html/register/register_table_temp.html", 'utf8') ;
$('html').find('body').append(html) ;
html = $('html').html() ;

//read json data
var json = fs.readFileSync(filepath_in, 'utf8');
var jsonJs = JSON.parse(json) ;


build_html(jsonJs);

html = $('html').find('body').html() ;

//write html file    
fs.writeFileSync(filepath_out, html) ;
