echo "build tei to ttl"
#data/tei/register/register_index.xml

PATH_TEI=$pathName
#PATH_TEI='./data/tei/'
#PATH_TEI='./data/tei/register/'
PATH_TEI_XMLID='./data/tei_xmlId/'
PATH_JSON_XMLID='./data/json_xmlId/'
PATH_JSON_XMLJS='./data/json_xmlJs/'
PATH_JSON_RDF='./data/json_rdf/'
#PATH_TTL='./data/ttl/text/'
#data/ttl/annotation/index
PATH_TTL='./data/ttl/annotation/register/instance/'

FILENAME=$name
#FILENAME='register_index'
#FILENAME='test'
#FILENAME='Bae_TB_8'
#FILENAME='Bae_TB_7'
#FILENAME='Bae_MF_6-2'
#FILENAME='Bae_MF_6-1'

EXTENSION_XML='.xml'
EXTENSION_TTL='.ttl'
EXTENSION_JSON='.json'

echo "create temporary paths"
mkdir -p $PATH_JSON_XMLID
mkdir -p $PATH_JSON_XMLJS
mkdir -p $PATH_JSON_RDF
mkdir -p $PATH_TTL

echo "${PATH_TEI}"
echo "${FILENAME}"

echo "normalize whitespace"
path=$PATH_TEI file=$FILENAME ext=$EXTENSION_XML node assets/staticSrc/js/normalize_ws.js

echo "build xml ID"
path_in_tei=$PATH_TEI path_out_json=$PATH_JSON_XMLID path_out_tei=$PATH_TEI_XMLID file=$FILENAME ext_xml=$EXTENSION_XML ext_json=$EXTENSION_JSON node assets/staticSrc/js/build_xmlId.js

echo "build xml JS"
path_in_tei=$PATH_TEI_XMLID path_out_json=$PATH_JSON_XMLJS file=$FILENAME ext_xml=$EXTENSION_XML ext_json=$EXTENSION_JSON node assets/staticSrc/js/build_xmlJs.js

echo "build rdf JS"
path_in_json=$PATH_JSON_XMLJS path_out_json=$PATH_JSON_RDF file=$FILENAME ext_json=$EXTENSION_JSON node assets/staticSrc/js/build_rdfJs.js

echo "build ttl"
path_in_json=$PATH_JSON_RDF path_out_ttl=$PATH_TTL file=$FILENAME ext_json=$EXTENSION_JSON ext_ttl=$EXTENSION_TTL node assets/staticSrc/js/build_ttl.js

echo "remove temporary paths"
rm -r $PATH_JSON_XMLID
rm -r $PATH_JSON_XMLJS
rm -r $PATH_JSON_RDF