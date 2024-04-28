echo "convert excel to json"

PATH_XLSX='./data/xlsx/'
PATH_JSON_XLSX='./data/json/register/'

#FILENAME=$name
FILENAME_IN='Baernreither_Index_2023'
#FILENAME_IN='Baernreither_Ortsregister_2023'
FILENAME_OUT='register_index_xlsx'
#FILENAME_OUT='place_xlsx'

EXTENSION_XLSX='.xlsx'
EXTENSION_JSON='.json'

echo "build xlsx to json"
path_in=$PATH_XLSX file_in=$FILENAME_IN ext_in=$EXTENSION_XLSX path_out=$PATH_JSON_XLSX file_out=$FILENAME_OUT ext_out=$EXTENSION_JSON 
node assets/staticSrc/js/build_xlsx2json.js