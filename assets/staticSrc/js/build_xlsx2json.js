const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
    sourceFile: 'data/xlsx/Baernreither_Personenregister_2023.xlsx'
});

//write json file
var xmlJsString = JSON.stringify(result);
fs.writeFileSync('./data/json_xlsx/Baernreither_Personenregister_2023.json', xmlJsString ) ;
console.log('json data written: ', xmlJsString.length , ' bytes')