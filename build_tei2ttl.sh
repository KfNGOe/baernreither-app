echo "build tei to ttl"

PATH_TEI_TOBUILD='./data/tei/tei_toBuild/'
PATH_TEI_BUILT='./data/tei/tei_built/'
PATH_JSON_XMLID='./data/tei/json_xmlId/'
PATH_JSON_XMLJS='./data/tei/json_xmlJs/'
PATH_JSON_RDF='./data/tei/json_rdf/'
PATH_TTL='./data/ttl/text/'

FILENAME=$name

EXTENSION_XML='.xml'
EXTENSION_TTL='.ttl'
EXTENSION_JSON='.json'

echo "create temporary paths"
mkdir -p $PATH_JSON_XMLID
mkdir -p $PATH_JSON_XMLJS
mkdir -p $PATH_JSON_RDF

echo "create output paths"
mkdir -p $PATH_TEI_BUILT
mkdir -p $PATH_TTL

echo "normalize whitespace"
path=$PATH_TEI_TOBUILD file=$FILENAME ext=$EXTENSION_XML node src/js/normalize_ws.js

echo "build xml ID"
path_in_tei=$PATH_TEI_TOBUILD path_out_json=$PATH_JSON_XMLID path_out_tei=$PATH_TEI_BUILT file=$FILENAME ext_xml=$EXTENSION_XML ext_json=$EXTENSION_JSON node src/js/build_xmlId.js

echo "build xml JS"
path_in_tei=$PATH_TEI_BUILT path_out_json=$PATH_JSON_XMLJS file=$FILENAME ext_xml=$EXTENSION_XML ext_json=$EXTENSION_JSON node src/js/build_xmlJs.js

echo "build rdf JS"
path_in_json=$PATH_JSON_XMLJS path_out_json=$PATH_JSON_RDF file=$FILENAME ext_json=$EXTENSION_JSON node src/js/build_rdfJs.js

echo "build ttl"
path_in_json=$PATH_JSON_RDF path_out_ttl=$PATH_TTL file=$FILENAME ext_json=$EXTENSION_JSON ext_ttl=$EXTENSION_TTL node src/js/build_ttl.js

echo "remove temporary paths"
rm -r $PATH_JSON_XMLID
rm -r $PATH_JSON_XMLJS
rm -r $PATH_JSON_RDF