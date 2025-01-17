echo "build register place"
echo "build json to tei"

PATH_PLACE_TEI='./data/tei/temp/'
PATH_PLACE_JSON='./data/json/anno/register/'
PATH_PLACE_JSON_TMP='./data/json/anno/register/'

#FILE=$name
FILE_PLACE_TEMP_TEI='register_place_temp'
FILE_PLACE_JSON='register_place'
FILE_PLACE_JSON_TMP='register_place_temp'
FILE_PLACE_TEI='register_place'

EXTENSION_XML='.xml'
EXTENSION_JSON='.json'

FILEPATH_PLACE_TEMP_TEI=$PATH_PLACE_TEI$FILE_PLACE_TEMP_TEI$EXTENSION_XML
FILEPATH_PLACE_JSON=$PATH_PLACE_JSON$FILE_PLACE_JSON$EXTENSION_JSON
FILEPATH_PLACE_JSON_TMP=$PATH_PLACE_JSON_TMP$FILE_PLACE_JSON_TMP$EXTENSION_JSON
FILEPATH_PLACE_TEI=$PATH_PLACE_TEI$FILE_PLACE_TEI$EXTENSION_XML

echo $FILEPATH_PLACE_TEMP_TEI   #./data/tei/anno/register/register_place_temp.xml
echo $FILEPATH_PLACE_JSON   #./data/json/anno/register/register_place.json
echo $FILEPATH_PLACE_JSON_TMP   #./data/json/anno/register/register_place_temp.json
echo $FILEPATH_PLACE_TEI    #./data/tei/anno/register/register_place.xml

echo "build json to tei"
filepath_in_tei=$FILEPATH_PLACE_TEMP_TEI filepath_in_json=$FILEPATH_PLACE_JSON filepath_in_json_temp=$FILEPATH_PLACE_JSON_TMP filepath_out_tei=$FILEPATH_PLACE_TEI node assets/staticSrc/js/build_place_json2tei.js