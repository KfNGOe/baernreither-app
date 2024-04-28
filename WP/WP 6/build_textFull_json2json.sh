echo "build full text"
echo "build json to json"
#data/json/Bae_MF_6-2_full.json

PATH_FULLTXT_JSON='./data/json/'
PATH_FULLTXT_TXT='./data/txt/'

#FILE=$name
FILE_FULLTXT_JSON='Bae_MF_6-2_full'
FILE_FULLTXT_TXT='Bae_MF_6-2_full'

EXTENSION_JSON='.json'
EXTENSION_TXT='.txt'

FILEPATH_FULLTXT_JSON=$PATH_FULLTXT_JSON$FILE_FULLTXT_JSON$EXTENSION_JSON
FILEPATH_FULLTXT_TXT=$PATH_FULLTXT_TXT$FILE_FULLTXT_TXT$EXTENSION_TXT

echo $FILEPATH_FULLTXT_JSON   # ./data/json/fullText.json
echo $FILEPATH_FULLTXT_TXT    # ./data/txt/Bae_TB_8.txt

#filepath_in_json=$FILEPATH_FULLTXT_JSON filepath_out_txt=$FILEPATH_FULLTXT_TXT node assets/staticSrc/js/build_textFull_json2txt.js
node assets/staticSrc/js/build_textFull_json2json.js
echo "build full text done"