echo "build register index"
echo "build json to tei"

PATH_INDEX_TEI='./data/tei/anno/register/'
PATH_INDEX_JSON='./data/json/anno/register/'

#FILE=$name
FILE_INDEX_TEMP_TEI='register_index_template'
FILE_INDEX_JSON='register_index'
FILE_INDEX_TEI='register_index'

EXTENSION_XML='.xml'
EXTENSION_JSON='.json'

FILEPATH_INDEX_TEMP_TEI=$PATH_INDEX_TEI$FILE_INDEX_TEMP_TEI$EXTENSION_XML
FILEPATH_INDEX_JSON=$PATH_INDEX_JSON$FILE_INDEX_JSON$EXTENSION_JSON
FILEPATH_INDEX_TEI=$PATH_INDEX_TEI$FILE_INDEX_TEI$EXTENSION_XML

echo $FILEPATH_INDEX_TEMP_TEI   #./data/tei/anno/register/register_index_temp.xml
echo $FILEPATH_INDEX_JSON   #./data/json/anno/register/register_index.json
echo $FILEPATH_INDEX_TEI    #./data/tei/anno/register/register_index.xml

echo "build json to tei"
filepath_in_tei=$FILEPATH_INDEX_TEMP_TEI filepath_in_json=$FILEPATH_INDEX_JSON filepath_out_tei=$FILEPATH_INDEX_TEI node assets/staticSrc/js/build_index_json2tei.js