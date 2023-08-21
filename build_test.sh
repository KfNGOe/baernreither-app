echo "build ttl to ttl"

ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

echo "clear graphdb repo"
endpoint=$ENDPOINT repo_name=$REPO_NAME node assets/staticSrc/js/gdb_clearRepo.js

echo "import file to graphdb"
PATH_IN='data/ttl/text/'
FILENAME_IN='Bae_TB_8'
EXTENSION_IN='.ttl'
MIME_TYPE='text/turtle'
endpoint=$ENDPOINT repo_name=$REPO_NAME path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN mime_type=$MIME_TYPE node assets/staticSrc/js/gdb_importFile.js

echo "import do to graphdb"
PATH_IN='data/ttl/do/instance/'
FILENAME_IN='doi'
endpoint=$ENDPOINT repo_name=$REPO_NAME path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN mime_type=$MIME_TYPE node assets/staticSrc/js/gdb_importFile.js

echo "connect text to do"
QUERY_TYPE='CONSTRUCT'
PATH_RQ='assets/staticSrc/sparql/'
FILENAME_RQ='do_2'
EXTENSION_RQ='.rq'
PATH_OUT='data/ttl/do/instance/'
FILENAME_OUT='doi'
EXTENSION_OUT='.ttl'
endpoint=$ENDPOINT repo_name=$REPO_NAME path_rq=$PATH_RQ file_rq=$FILENAME_RQ ext_rq=$EXTENSION_RQ mime_type=$MIME_TYPE query_type=$QUERY_TYPE path_out=$PATH_OUT file_out=$FILENAME_OUT ext_out=$EXTENSION_OUT node assets/staticSrc/js/gdb_queryRepo.js

echo "update do"
echo "delete statements"
FILENAME_RQ='del_do_2'
endpoint=$ENDPOINT repo_name=$REPO_NAME path_rq=$PATH_RQ file_rq=$FILENAME_RQ ext_rq=$EXTENSION_RQ node assets/staticSrc/js/gdb_deleteStmts.js
echo "import statements"
endpoint=$ENDPOINT repo_name=$REPO_NAME path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN mime_type=$MIME_TYPE node assets/staticSrc/js/gdb_importFile.js