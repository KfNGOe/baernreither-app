const fs = require('fs');
const LF = "\n" ;
const TAB = "\t" ;
const COMMA = ", " ;
const DOT = " ." ;
const SEMICOLON = " ;" ;
const SPACE = " " ;
const SQBRACKET_OPEN = "[" ;
const SQBRACKET_CLOSE = "]" ;
const BN = "_:" ;
const prefix =   "@prefix kfngoeo: <https://github.com/KfNGOe/kfngoeo#> ." + LF 
               + "@prefix kfngeoi: <https://github.com/KfNGOe/kfngeoi/> ." + LF
               + "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> ." + LF
               + "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ." + LF
               + "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> ." + LF
               + "@prefix owl: <http://www.w3.org/2002/07/owl#> ." + LF
               + "@prefix dc: <http://purl.org/dc/elements/1.1/> ." + LF
               + "@prefix dcterms: <http://purl.org/dc/terms/> ." + LF
               + "@prefix foaf: <http://xmlns.com/foaf/0.1/> ." + LF
               + "@prefix skos: <http://www.w3.org/2004/02/skos/core#> ." + LF
               + "@prefix schema: <http://schema.org/> ." + LF
               + "@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> ." + LF
               + "@prefix geonames: <http://www.geonames.org/ontology#> ." + LF             
               + "@prefix gndo: <http://d-nb.info/standards/elementset/gnd#> ." + LF
               + "@prefix gnd: <http://d-nb.info/standards/elementset/gnd#> ." + LF
              ;


var s_ttl, p_ttl, o_ttl = "" ;
var ttl_template = s_ttl + p_ttl + o_ttl  ;
var ttl = "" ;

ttl = ttl + prefix + LF ;

function getTTL(item_obj) {
   if(item_obj.object === "kfngoeo:StartTag" || item_obj.object === "kfngoeo:EndTag" || item_obj.object === "kfngoeo:Text" || item_obj.object === "kfngoeo:Comment") {
         if (item_obj.predicate === "a") {
         ttl = ttl + item_obj.subject + LF ;
         ttl = ttl + TAB + item_obj.predicate + SPACE + item_obj.object + SEMICOLON + LF ;         
      }  
   }
   if(item_obj.predicate === "kfngoeo:elementName") {      
      ttl = ttl + TAB + item_obj.predicate + SPACE + item_obj.object + SEMICOLON + LF ;      
   }
   if (item_obj.predicate === "kfngoeo:hasContent") {
      ttl = ttl + TAB + item_obj.predicate + SPACE + item_obj.object + SEMICOLON + LF ;
   }
   if(item_obj.predicate === "kfngoeo:hasAttr" && item_obj.object.includes(BN)) {
      ttl = ttl + TAB + item_obj.predicate + SPACE + SQBRACKET_OPEN + LF ;
   }
   if(item_obj.subject.includes(BN) && item_obj.predicate === "kfngoeo:attrName") {
      ttl = ttl + TAB + TAB + item_obj.predicate + SPACE + item_obj.object + SEMICOLON + LF ;
   }
   if(item_obj.subject.includes(BN) && item_obj.predicate === "kfngoeo:attrValue") {
      ttl = ttl + TAB + TAB + item_obj.predicate + SPACE + item_obj.object + SEMICOLON + LF ;
      ttl = ttl + TAB + SQBRACKET_CLOSE + SEMICOLON + LF ;
   }
   if(item_obj.predicate === "kfngoeo:elementPos") {
      ttl = ttl + TAB + item_obj.predicate + SPACE + item_obj.object + SEMICOLON + LF ;
      ttl = ttl + DOT + LF + LF ;
   }
   //console.log('ttl = ', ttl) ;        
} 

var json = fs.readFileSync('data/json_rdf/Tagebuch_Baernreither_8.json', 'utf8');
console.log('json data read: ', json.length, ' bytes')

var jsonJs = JSON.parse(json) ;

jsonJs.statements.forEach((item, index, array) => {
   //console.log('item = ', item, ', index = ', index) ;
   item.forEach((item_obj, index_obj, array) => {
      //console.log('item obj = ', item_obj, ', index obj = ', index_obj) ;
      getTTL(item_obj) ;
   } ) ;
} ) ;

fs.writeFileSync('./data/ttl/Tagebuch_Baernreither_8.ttl', ttl ) ;
console.log('ttl data written: ', ttl.length  , ' bytes')
