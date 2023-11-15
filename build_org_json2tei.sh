echo "build register org"
echo "build json to tei"

PATH_ORG_TEI='./data/tei/register/'
PATH_ORG_JSON='./data/json/register/'
PATH_ORG_JSON_XLSX='./data/json_xlsx/'
data/json_xlsx/org_xlsx.json
#FILE=$name
FILE_ORG_TEMP_TEI='register_org_template'
FILE_ORG_JSON='register_org'
FILE_ORG_JSON_XLSX='org_xlsx'
FILE_ORG_TEI='register_org'

EXTENSION_XML='.xml'
EXTENSION_JSON='.json'

FILEPATH_ORG_TEMP_TEI=$PATH_ORG_TEI$FILE_ORG_TEMP_TEI$EXTENSION_XML
FILEPATH_ORG_JSON=$PATH_ORG_JSON$FILE_ORG_JSON$EXTENSION_JSON
FILEPATH_ORG_JSON_XLSX=$PATH_ORG_JSON_XLSX$FILE_ORG_JSON_XLSX$EXTENSION_JSON
FILEPATH_ORG_TEI=$PATH_ORG_TEI$FILE_ORG_TEI$EXTENSION_XML

echo $FILEPATH_ORG_TEMP_TEI   #./data/tei/register/register_org_template.xml
echo $FILEPATH_ORG_JSON   #./data/json/register/register_org.json
echo $FILEPATH_ORG_JSON_XLSX   #./data/json_xlsx/org_xlsx.json
echo $FILEPATH_ORG_TEI    #./data/tei/register/register_org.xml

echo "build json to tei"
filepath_in_tei=$FILEPATH_ORG_TEMP_TEI filepath_in_json=$FILEPATH_ORG_JSON filepath_in_json_xlsx=$FILEPATH_ORG_JSON_XLSX filepath_out_tei=$FILEPATH_ORG_TEI node assets/staticSrc/js/build_org_json2tei.js