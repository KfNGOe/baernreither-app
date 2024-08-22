const fs = require('fs');

//path to the folder with the text files
const filepath_in = process.env.filepath_in ;
const filepath_out = process.env.filepath_out ;

//function to replace HTML escape sequences with umlauts
function replaceHtmlEntities(text) {
    return text
        .replace(/&auml;/g, 'ä')
        .replace(/&ouml;/g, 'ö')
        .replace(/&uuml;/g, 'ü')
        .replace(/&Auml;/g, 'Ä')
        .replace(/&Ouml;/g, 'Ö')
        .replace(/&Uuml;/g, 'Ü')
        .replace(/&szlig;/g, 'ß');
}

//function to read the files and replace the HTML escape sequences
function processFiles() {    
    let data = fs.readFileSync(filepath_in, 'utf8');
    
    //replace HTML escape sequences
    const updatedData = replaceHtmlEntities(data);
        
    //save file with replaced umlauts
    fs.writeFileSync(filepath_out, updatedData);
    console.log('data write: ', updatedData.length, ' bytes');
}        

//call function
processFiles();
console.log('umlauts decoded');