echo "build register person"
echo "build json to tei"

PATH_PERSON_TEI='./data/tei/register/'
PATH_PERSON_JSON='./data/json/register/'
PATH_PERSON_JSON_XLSX='./data/json_xlsx/'
#PATH_ORG_JSON_XLSX='./data/json_xlsx/'
#FILE=$name
FILE_PERSON_TMP_TEI='register_person_template'
FILE_PERSON_JSON='register_person'
FILE_PERSON_JSON_XLSX='person_xlsx'
FILE_PERSON_TEI='register_person'
#data/json_xlsx/person_xlsx.json
EXTENSION_XML='.xml'
EXTENSION_JSON='.json'

FILEPATH_PERSON_TMP_TEI=$PATH_PERSON_TEI$FILE_PERSON_TMP_TEI$EXTENSION_XML
FILEPATH_PERSON_JSON=$PATH_PERSON_JSON$FILE_PERSON_JSON$EXTENSION_JSON
FILEPATH_PERSON_JSON_XLSX=$PATH_PERSON_JSON_XLSX$FILE_PERSON_JSON_XLSX$EXTENSION_JSON
FILEPATH_PERSON_TEI=$PATH_PERSON_TEI$FILE_PERSON_TEI$EXTENSION_XML

echo $FILEPATH_PERSON_TMP_TEI   #./data/tei/register/register_person_template.xml
echo $FILEPATH_PERSON_JSON   #./data/json/register/register_person.json
echo $FILEPATH_PERSON_JSON_XLSX   #./data/json_xlsx/person_xlsx.json
echo $FILEPATH_PERSON_TEI    #./data/tei/register/register_person.xml

echo "build json to tei"
filepath_in_tei=$FILEPATH_PERSON_TMP_TEI filepath_in_json=$FILEPATH_PERSON_JSON filepath_in_json_xlsx=$FILEPATH_PERSON_JSON_XLSX filepath_out_tei=$FILEPATH_PERSON_TEI node assets/staticSrc/js/build_person_json2tei.js