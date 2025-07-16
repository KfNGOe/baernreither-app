echo "build tei to ttl"

PATH_TEI=$pathname_in
PATH_TEI_XMLID='./data/tei_xmlId/'
PATH_JSON_XMLID='./data/json_xmlId/'
PATH_JSON_XMLJS='./data/json_xmlJs/'
PATH_JSON_RDF='./data/json_rdf/'
PATH_TTL=$pathname_out

FILENAME=$name

EXTENSION_XML='.xml'
EXTENSION_TTL='.ttl'
EXTENSION_JSON='.json'

FILEPATH_TEI=$PATH_TEI$FILENAME$EXTENSION_XML
FILEPATH_TEI_XMLID=$PATH_TEI_XMLID$FILENAME$EXTENSION_XML
FILEPATH_JSON_XMLID=$PATH_JSON_XMLID$FILENAME$EXTENSION_JSON
FILEPATH_JSON_XMLJS=$PATH_JSON_XMLJS$FILENAME$EXTENSION_JSON
FILEPATH_JSON_RDF=$PATH_JSON_RDF$FILENAME$EXTENSION_JSON
FILEPATH_TTL=$PATH_TTL$FILENAME$EXTENSION_TTL

echo "create temporary paths"
mkdir -p "$PATH_TEI_XMLID"
mkdir -p "$PATH_JSON_XMLID"
mkdir -p "$PATH_JSON_XMLJS"
mkdir -p "$PATH_JSON_RDF"
mkdir -p "$PATH_TTL"

echo "normalize whitespace"
filepath_in_tei=$FILEPATH_TEI filepath_out_tei=$FILEPATH_TEI node assets/staticSrc/js/normalize_ws.js

echo "build xml ID"
filepath_in_tei=$FILEPATH_TEI filepath_out_tei=$FILEPATH_TEI_XMLID filepath_out_json=$FILEPATH_JSON_XMLID node assets/staticSrc/js/build_xmlId.js

echo "build xml JS"
filepath_in_tei=$FILEPATH_TEI_XMLID filepath_out_json=$FILEPATH_JSON_XMLJS node assets/staticSrc/js/build_xmlJs.js

echo "build rdf JS"
filepath_in_json=$FILEPATH_JSON_XMLJS filepath_out_json=$FILEPATH_JSON_RDF node assets/staticSrc/js/build_rdfJs.js

echo "build ttl"
filepath_in_json=$FILEPATH_JSON_RDF filepath_out_ttl=$FILEPATH_TTL node assets/staticSrc/js/build_ttl.js

echo copy tei_xmlId to tei
cp $FILEPATH_TEI_XMLID $FILEPATH_TEI

echo "remove temporary paths"
rm -r $PATH_TEI_XMLID
rm -r $PATH_JSON_XMLID
rm -r $PATH_JSON_XMLJS
rm -r $PATH_JSON_RDF