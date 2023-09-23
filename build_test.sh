echo "build ttl to ttl"

ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

echo "group keys from TEI statements"
QUERY_TYPE='CONSTRUCT'
PATH_RQ='assets/staticSrc/sparql/'
EXTENSION_RQ='.rq'
MIME_TYPE='text/turtle'
EXTENSION_OUT='.ttl'
FILENAME_RQ='annoPerson_1'
PATH_OUT='data/ttl/annotation/anno_web/instance/'
FILENAME_OUT='annoPersoni_1'
endpoint=$ENDPOINT repo_name=$REPO_NAME path_rq=$PATH_RQ file_rq=$FILENAME_RQ ext_rq=$EXTENSION_RQ mime_type=$MIME_TYPE query_type=$QUERY_TYPE path_out=$PATH_OUT file_out=$FILENAME_OUT ext_out=$EXTENSION_OUT node assets/staticSrc/js/gdb_queryRepo.js