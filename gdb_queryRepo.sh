ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

MIME_TYPE='text/turtle'
QUERY_TYPE='CONSTRUCT'

PATH_RQ='assets/staticSrc/sparql/'
FILENAME_RQ='annoPerson_1'
EXTENSION_RQ='.rq'

PATH_OUT='./data/ttl/annotation/anno_web/instance/'
FILENAME_OUT='annoPersoni_1'
EXTENSION_OUT='.ttl'

FILEPATH_RQ=$PATH_RQ$FILENAME_RQ$EXTENSION_RQ
FILEPATH_OUT=$PATH_OUT$FILENAME_OUT$EXTENSION_OUT

echo "query graphdb repo"
echo "group keys from TEI statements"
endpoint=$ENDPOINT repo_name=$REPO_NAME mime_type=$MIME_TYPE query_type=$QUERY_TYPE filepath_rq=$FILEPATH_RQ filepath_out=$FILENAME_OUT node assets/staticSrc/js/gdb_queryRepo.js
