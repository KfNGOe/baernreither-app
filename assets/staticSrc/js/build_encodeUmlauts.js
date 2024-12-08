const fs = require('fs');

//path to the folder with the text files
const filepath_in = process.env.filepath_in ;
const filepath_out = process.env.filepath_out ;

//function to replace umlauts with HTML escape sequences
function replaceUmlauts(text) {
    return text
        .replace(/ä/g, '&auml;')
        .replace(/ö/g, '&ouml;')
        .replace(/ü/g, '&uuml;')
        .replace(/Ä/g, '&Auml;')
        .replace(/Ö/g, '&Ouml;')
        .replace(/Ü/g, '&Uuml;')
        .replace(/ß/g, '&szlig;');
}

//function to read the files and replace the umlauts
function processFiles() {
    let data = fs.readFileSync(filepath_in, 'utf8') ;
    
    //replace umlauts
    const updatedData = replaceUmlauts(data);
        
    //save file with replaced HTML escape sequences
    fs.writeFileSync(filepath_out, updatedData);
    console.log('data write: ', updatedData.length, ' bytes') ;        
}

//call function
processFiles() ;
