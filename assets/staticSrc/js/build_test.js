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


var s_ttl, p_ttl, o_ttl = "" ;
var ttl_template = s_ttl + p_ttl + o_ttl  ;
var ttl = "" ;

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
