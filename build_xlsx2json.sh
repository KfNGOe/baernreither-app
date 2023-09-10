echo "build excel to json"

PATH_XLSX='./data/json_xlsx/'
PATH_JSON_XLSX='./data/json_xlsx/'

#FILENAME=$name
FILENAME_IN='Baernreither_Personenregister_2023'
FILENAME_OUT='person_xlsx'

EXTENSION_XLSX='.xlsx'
EXTENSION_JSON='.json'

echo "normalize whitespace"
path_in=$PATH_XLSX file_in=$FILENAME_IN ext_in=$EXTENSION_XLSX path_out=$PATH_JSON_XLSX file_out=$FILENAME_OUT ext=$EXTENSION_JSON node assets/staticSrc/js/build_xlsx2json.js