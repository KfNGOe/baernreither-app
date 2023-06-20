const LF = '\n' ;
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
var index_html = '' ;
var html = '' ;


(async () => {
    const dom = await JSDOM.fromFile("data/html/register_table_temp.html") ;
    //console.log('dom =', dom.serialize()) ;
    const $ = require("jquery")(dom.window) ;
    
    var json = fs.readFileSync("data/json/register/register_person.json", 'utf8') ;
    console.log('json data read: ', json.length, ' bytes')
    var jsonJs = JSON.parse(json) ;
    //console.log('jsonJs = ', jsonJs) ;
    
    html = $('html').find('body').html() ;
    console.log('html = ', html) ;

    function getObject(obj) {
        let length = Object.keys(obj).length ;
        console.log('object length =', length) ;
        Object.keys(obj).forEach((key) => {
           console.log('key = ', key, ', value = ', obj[key]) ;       
           switch(key) {
              case 'nnnn':
                 console.log('nnnn = ', obj[key]) ;
                 break ;
              case 'nnnnn':
                 console.log('nnnnn = ',obj[key]) ;
                 if(Array.isArray(obj[key])) {
                    console.log('Hello nnnnn array') ;
                    getArray(obj[key]) ;               
                 } else {
                    console.log(obj.constructor.name, 'property is not an array: ', key) ;
                 }
                 break ;            
              case 'nnnnnn':
                 console.log('nnnnnn =  ', obj[key]) ;
                 if (typeof obj[key] === 'object') {
                    //obj[key]["xml:id"] = 'test' ;
                    //console.log('attributes = ', obj[key]) ;
                 }
                 break ;                  
              default:
                 console.log('no case') ;
                 break ;
           } 
        }) ;
        //console.log('result', length) ;
     } ; 
     
     function getArray(arr) {
        let length = arr.length ;   
        console.log('array length =', length) ;
        arr.forEach((item, index, array) => {
           if (typeof item === 'object') {
              console.log('item = ', item, ', index = ', index) ;          
              getObject(item) ;
           }
        }) ;
        //console.log('result: ',arr) ;   
     } ;
     

    //write html file    
    //filepath = path_out_tei + filename + ext_xml ;
    //console.log(filepath);
    fs.writeFileSync('html/register_person.html', html ) ;
    console.log('html data written: ', html.length, ' bytes') ;

}) () ;
/*
    jsonJs.statements.forEach((item, index, array) => {
    //console.log('item = ', item, ', index = ', index) ;
        item.forEach((item_obj, index_obj, array) => {
            //console.log('item obj = ', item_obj, ', index obj = ', index_obj) ;
            getTTL(item_obj) ;
        } ) ;
    } ) ;
*/

/*
    //table    
    var table = fs.readFileSync("data/html/register_table_temp.html", 'utf8');
    console.log('html data read: ', table.length, ' bytes') ;
    //console.log('table =', table) ;
    $('html').find('.register-menue').append(table) ;

    //write html file
    var html = dom.serialize() ;
    //filepath = path_out_tei + filename + ext_xml ;
    //console.log(filepath);
    fs.writeFileSync('html/register.html', html ) ;
    console.log('html data written: ', html.length, ' bytes')
    */



