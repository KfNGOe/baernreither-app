// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs');
var convert = require('xml-js');
//var xmlserializer = require('xmlserializer');


// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);
// Appending a paragraph tag to the body

var xml = fs.readFileSync('data/tei/Tagebuch_Baernreither_8.xml', 'utf8');
console.log('tei data read: ', xml.length, ' bytes')

var xmlJs = convert.xml2js(xml, {compact: false, spaces: 2});
console.log('xmlJs: ', xmlJs);

var xmlJsString = JSON.stringify(xmlJs);

fs.writeFileSync('./data/json/Tagebuch_Baernreither_8.json', xmlJsString ) ;
        console.log('js data written: ', xmlJsString.length, ' bytes')



