//build register table from json
const LF = '\n';
const fs = require('fs');
var convert = require('xml-js');

// Importing the jsdom module
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM('<html></html>') ;
const $ = require('jquery')(dom.window)

const path_in_tei = process.env.path_in_tei
const path_out_json = process.env.path_out_json
const path_out_tei = process.env.path_out_tei
const filename = process.env.file;
const ext_xml = process.env.ext_xml
const ext_json = process.env.ext_json

var i_xmlId = 0;
var index_html = '';
var html = '';

function getObject(obj) {
   let length = Object.keys(obj).length;
   console.log('object length =', length);
   Object.keys(obj).forEach((key) => {
      console.log('key = ', key);
      switch (key) {
         case 'results':
            //console.log('results =  ', obj[key]) ;
            if (typeof obj[key] === 'object') {
               console.log('Hello, ', key, ' is an object');
               getObject(obj[key]);
            } else {
               console.log('parsing json failed, ', key, ' is not an object');
            }
            break;
         case 'bindings':
            //console.log('bindings = ',obj[key]) ;
            if (Array.isArray(obj[key])) {
               console.log('Hello, ', key, ' is an array');
               getArray(obj[key]);
            } else {
               console.log('parsing json failed, ', key, ' is not an array');
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
};

function getArray(arr) {   
   let length = arr.length ;
   console.log('array length =', length) ;
   arr.forEach((item, index, array) => {
      if (typeof item === 'object') {
         $('tbody').append('<tr></tr>') ;
         //console.log('html = ', $('tbody').html()) ;
         console.log('index = ', index) ;
         getObject(item) ;
      }
   });
   //console.log('result: ',arr) ;   
} ;  

html = fs.readFileSync("data/html/register_table_temp.html", 'utf8') ;
console.log('html data read: ', html.length, ' bytes') ;   
$('html').find('body').append(html) ;
html = $('html').html() ;

var json = fs.readFileSync("data/json/register/register_person.json", 'utf8');
console.log('json data read: ', json.length, ' bytes')
var jsonJs = JSON.parse(json) ;
//console.log('jsonJs = ', jsonJs) ;

getObject(jsonJs);
html = $('html').find('body').html() ;

//write html file    
//filepath = path_out_tei + filename + ext_xml ;
//console.log(filepath);
fs.writeFileSync('html/register_person.html', html) ;
console.log('html data written: ', html.length, ' bytes') ;