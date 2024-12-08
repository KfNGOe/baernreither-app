// Normalize whitespace in a string
const normalize = require('normalize-space') ;
const fs = require('fs');

const path = process.env.path ;
const file = process.env.file; 
const ext = process.env.ext ;
const filepath = path + file + ext ;

var xml = fs.readFileSync(filepath , 'utf8');

var xml_ws = normalize(xml) ;

fs.writeFileSync(filepath, xml_ws ) ;
