
echo "build metadata of texts"

PATH_JSON_TEMP='./data/json/temp/'
PATH_JSON_TEXT_ALL='./data/json/text/all/'
PATH_JSON_MDATA='./data/json/text/mdata/'
PATH_TTL_MDATA='./data/ttl/text/mdata/'

FILENAME_MDATA_TEMP='text_mdata_temp'
FILENAME_MDATA='text_mdata'

EXTENSION_JSON='.json'
EXTENSION_TTL='.ttl'

FILEPATH_JSON_TEMP=$PATH_JSON_TEMP$FILENAME_MDATA_TEMP$EXTENSION_JSON
FILEPATH_JSON_MDATA=$PATH_JSON_MDATA$FILENAME_MDATA$EXTENSION_JSON

echo "create temporary paths"
mkdir -p "$PATH_JSON_TEMP"
mkdir -p "$PATH_JSON_TEXT_ALL"
mkdir -p "$PATH_JSON_MDATA"
mkdir -p "$PATH_TTL_MDATA"

filepath_in_json=$FILEPATH_JSON_TEMP path_in_json=$PATH_JSON_TEXT_ALL filepath_out_json=$FILEPATH_JSON_MDATA path_out_ttl=$PATH_TTL_MDATA node assets/staticSrc/js/build_text_mdata.js

echo "build metadata of texts done"
