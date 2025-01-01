ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

#MIME_TYPE='text/turtle'
#QUERY_TYPE='CONSTRUCT'
MIME_TYPE=$mime_type
QUERY_TYPE=$query_type

#PATH_RQ='assets/staticSrc/sparql/'
#FILENAME_RQ='annoPerson_1'
PATH_RQ=$path_rq
FILENAME_RQ=$file_rq
EXTENSION_RQ='.rq'

#PATH_OUT='./data/ttl/anno/anno_web/instance/'
#FILENAME_OUT='annoPersoni_1'
#EXTENSION_OUT='.ttl'
PATH_OUT=$path_out
FILENAME_OUT=$file_out
EXTENSION_OUT=$ext_out

FILEPATH_RQ=$PATH_RQ$FILENAME_RQ$EXTENSION_RQ
FILEPATH_OUT=$PATH_OUT$FILENAME_OUT$EXTENSION_OUT

echo "query graphdb repo"
echo "query graphdb repo"
endpoint=$ENDPOINT repo_name=$REPO_NAME mime_type=$MIME_TYPE query_type=$QUERY_TYPE filepath_rq=$FILEPATH_RQ filepath_out=$FILEPATH_OUT node assets/staticSrc/js/gdb_queryRepo.js
