//convert xlsx to json
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

const path_in = process.env.path ;
const file_in = process.env.file; 
const ext_in = process.env.ext ;
const filepath_in = path_in + file_in + ext_in ;
console.log(filepath_in);

const path_out = process.env.path ;
const file_out = process.env.file; 
const ext_out = process.env.ext ;
const filepath_out = path_out + file_out + ext_out ;
console.log(filepath_out);

const result = excelToJson({
    sourceFile: filepath_in
});

//write json file
var xmlJsString = JSON.stringify(result);
fs.writeFileSync(filepath_out, xmlJsString ) ;
console.log('json data written: ', xmlJsString.length , ' bytes')