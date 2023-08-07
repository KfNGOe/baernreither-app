ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

PATH_RQ='assets/staticSrc/sparql/'
FILENAME_RQ='annoPerson_1'
EXTENSION_RQ='.rq'

PATH_OUT='./data/ttl/annotation/anno_web/instance/'
FILENAME_OUT='annoPersoni_1'
EXTENSION_OUT='.ttl'

MIME_TYPE='text/turtle'
QUERY_TYPE='CONSTRUCT'

echo "query graphdb repo"
echo "group keys from TEI statements"
endpoint=$ENDPOINT repo_name=$REPO_NAME path_rq=$PATH_RQ file_rq=$FILENAME_RQ ext_rq=$EXTENSION_RQ mime_type=$MIME_TYPE query_type=$QUERY_TYPE path_out=$PATH_OUT file_out=$FILENAME_OUT ext_out=$EXTENSION_OUT node assets/staticSrc/js/gdb_queryRepo.js
