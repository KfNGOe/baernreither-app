echo "build text dipl version json"

ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_baern'

#PATH_IN='./data/ttl/text/'
PATH_IN=$pathName
FILENAME_IN=$name
#FILENAME_IN='Bae_TB_8'
EXTENSION_IN='.ttl'

PATH_RQ='assets/staticSrc/sparql/'
FILENAME_RQ='textAll_json'
EXTENSION_RQ='.rq'
       
PATH_OUT='./data/json/text/all/'
#FILENAME_OUT=$name'_all'
FILENAME_OUT="${FILENAME_IN}_all"
EXTENSION_OUT='.json'

FILEPATH_IN=$PATH_IN$FILENAME_IN$EXTENSION_IN
FILEPATH_RQ=$PATH_RQ$FILENAME_RQ$EXTENSION_RQ
FILEPATH_OUT=$PATH_OUT$FILENAME_OUT$EXTENSION_OUT

echo "clear graphdb repo"
endpoint=$ENDPOINT repo_name=$REPO_NAME node assets/staticSrc/js/gdb_clearRepo.js

MIME_TYPE='text/turtle'

echo "import file to graphdb repo"
echo "import text ttl file"
endpoint=$ENDPOINT repo_name=$REPO_NAME mime_type=$MIME_TYPE filepath=$FILEPATH_IN node assets/staticSrc/js/gdb_importFile.js

MIME_TYPE='application/sparql-results+json'
QUERY_TYPE='SELECT'

echo "query graphdb repo"
endpoint=$ENDPOINT repo_name=$REPO_NAME mime_type=$MIME_TYPE query_type=$QUERY_TYPE filepath_rq=$FILEPATH_RQ filepath_out=$FILEPATH_OUT node assets/staticSrc/js/gdb_queryRepo.js
