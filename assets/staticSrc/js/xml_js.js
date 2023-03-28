const fs = require('fs/promises');
var convert = require('xml-js');
var xml = '' ;
/*
fs.readFile('data/tei/Tagebuch_Baernreither_8.xml', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
*/ 

async function readXml() {
    try {
        const data = await fs.readFile('data/tei/Tagebuch_Baernreither_8.xml', { encoding: 'utf8' });
        //console.log(data);
        return data;

    } catch (err) {
        console.log(err);
    }
}

readXml().then(value => {
    xml = value ;    
    
    //var result1 = convert.xml2json(xml, {compact: false, spaces: 4});
    var result2 = convert.xml2js(xml, {compact: false, spaces: 2});
    var result1 = '';

    console.log('result json: ', result1, '\n','result js: ', result2);

}) ;


  
  

/*
var xml =
'<?xml version="1.0" encoding="utf-8"?>' +
'<note importance="high" logged="true">' +
'    <title>Happy</title>' +
'    <todo>Work</todo>' +
'    <todo>Play</todo>' +
'</note>';
var result1 = convert.xml2json(xml, {compact: false, spaces: 4});
var result2 = convert.xml2js(xml, {compact: false, spaces: 4});

console.log('result json: ', result1, '\n','result js: ', result2);
*/