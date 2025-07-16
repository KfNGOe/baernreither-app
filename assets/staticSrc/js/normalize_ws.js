// Normalize whitespace in a string
const normalize = require('normalize-space') ;
const fs = require('fs');

const filepath_in_tei=process.env.filepath_in_tei ;
const filepath_out_tei=process.env.filepath_out_tei ;

var xml = fs.readFileSync(filepath_in_tei , 'utf8');

var xml_ws = normalize(xml) ;

fs.writeFileSync(filepath_out_tei, xml_ws ) ;
