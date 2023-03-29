const fs = require('fs/promises');
var convert = require('xml-js');
var xml = '' ; 

async function readXml() {
    try {        
        const data = await fs.readFile('data/tei/Tagebuch_Baernreither_8.xml', { encoding: 'utf8' });
        
        return data;

    } catch (err) {
        console.log(err);
    }
}

async function writeJson() {
    try {        
        const data = await fs.readFile('data/tei/Tagebuch_Baernreither_8.xml', { encoding: 'utf8' });
        
        return data;

    } catch (err) {
        console.log(err);
    }
}

(async () => {        
    await readXml().then(value => {
        xml = value ;
    }) ;
    var result = convert.xml2json(xml, {compact: false, spaces: 2});
    console.log('result: ', result);
    console.log('elements: ', result.elements[0]);



  })() ; 