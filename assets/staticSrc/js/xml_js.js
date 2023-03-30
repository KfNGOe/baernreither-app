const fs = require('fs');
const fsp = require('fs/promises');
var convert = require('xml-js');
var xml = '' ; 

async function readXml() {
    try {        
        const data = await fsp.readFile('data/tei/Tagebuch_Baernreither_8.xml', { encoding: 'utf8' });
        console.log('xml data read: ', data.length, ' bytes')

        return data;

    } catch (err) {
        console.log(err);
    }
}

async function writeJson(result) {
    try {
        const path = "./data/json";        
        if (!fs.existsSync(path)){    //check if folder already exists
            fs.mkdirSync(path);    //creating folder
        }       
        
        await fsp.writeFile('./data/json/Tagebuch_Baernreither_8.json', result) ;
        console.log('json data written: ', result.length, ' bytes')
                
    } catch (err) {
        console.log(err);
    }
}

(async () => {        
    await readXml().then(value => {
        xml = value ;
    }) ;
    var result = convert.xml2json(xml, {compact: false, spaces: 2});
    //console.log('result: ', result);
    //console.log('elements: ', result.elements[0]);

    await writeJson(result) ;

  })() ; 