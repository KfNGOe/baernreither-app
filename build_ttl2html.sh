echo "build ttl to html"

ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

echo "clear graphdb repo"
#endpoint=$ENDPOINT repo_name=$REPO_NAME node assets/staticSrc/js/gdb_clearRepo.js

PATH_IN='data/ttl/text/'
FILENAME_IN='Bae_TB_8'
EXTENSION_IN='.ttl'

echo "import file to graphdb repo"
#endpoint=$ENDPOINT repo_name=$REPO_NAME path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN mime_type=$MIME_TYPE node assets/staticSrc/js/gdb_importFile.js

MIME_TYPE='text/turtle'
QUERY_TYPE='CONSTRUCT'

PATH_RQ='assets/staticSrc/sparql/'
FILENAME_RQ='annoPerson_1'
EXTENSION_RQ='.rq'

PATH_OUT='./data/ttl/annotation/anno_web/instance/'
FILENAME_OUT='annoPersoni_1'
EXTENSION_OUT='.ttl'

echo "query graphdb repo"
echo "group keys from TEI statements"
#endpoint=$ENDPOINT repo_name=$REPO_NAME path_rq=$PATH_RQ file_rq=$FILENAME_RQ ext_rq=$EXTENSION_RQ mime_type=$MIME_TYPE query_type=$QUERY_TYPE path_out=$PATH_OUT file_out=$FILENAME_OUT ext_out=$EXTENSION_OUT node assets/staticSrc/js/gdb_queryRepo.js

PATH_IN='./data/ttl/annotation/anno_web/instance/'
FILENAME_IN='annoPersoni_1'
EXTENSION_IN='.ttl'

echo "import file to graphdb repo"
#endpoint=$ENDPOINT repo_name=$REPO_NAME path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN mime_type=$MIME_TYPE node assets/staticSrc/js/gdb_importFile.js

FILENAME_RQ='annoPerson_2'
FILENAME_OUT='annoPersoni_2'

echo "query graphdb repo"
echo "generate resource IDs for grouped keys"
#endpoint=$ENDPOINT repo_name=$REPO_NAME path_rq=$PATH_RQ file_rq=$FILENAME_RQ ext_rq=$EXTENSION_RQ mime_type=$MIME_TYPE query_type=$QUERY_TYPE path_out=$PATH_OUT file_out=$FILENAME_OUT ext_out=$EXTENSION_OUT node assets/staticSrc/js/gdb_queryRepo.js

FILENAME_RQ='del_annoPerson_1'

echo "delete graphdb statements"
endpoint=$ENDPOINT repo_name=$REPO_NAME path_rq=$PATH_RQ file_rq=$FILENAME_RQ ext_rq=$EXTENSION_RQ node assets/staticSrc/js/gdb_deleteStmts.js   