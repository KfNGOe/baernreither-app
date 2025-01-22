echo "build ttl to json"

ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe'

MIME_TYPE='text/turtle'

echo "clear graphdb repo"
endpoint=$ENDPOINT repo_name=$REPO_NAME node assets/staticSrc/js/gdb_clearRepo.js

PATH_IN='./data/ttl/anno/person/instance/'
FILENAME_IN='personi'
EXTENSION_IN='.ttl'

echo "import file to graphdb repo"
echo "import personi"
endpoint=$ENDPOINT repo_name=$REPO_NAME path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN mime_type=$MIME_TYPE node assets/staticSrc/js/gdb_importFile.js

PATH_IN='./data/ttl/anno/anno_web/'
FILENAME_IN='annoPersoni'
EXTENSION_IN='.ttl'

echo "import file to graphdb repo"
echo "import annoPersoni"
endpoint=$ENDPOINT repo_name=$REPO_NAME path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN mime_type=$MIME_TYPE node assets/staticSrc/js/gdb_importFile.js

PATH_RQ='assets/staticSrc/sparql/'
FILENAME_RQ='person'
EXTENSION_RQ='.rq'

PATH_OUT='./data/json/anno/register/'
FILENAME_OUT='person'
EXTENSION_OUT='.json'

MIME_TYPE='application/sparql-results+json'
QUERY_TYPE='SELECT'

echo "query graphdb repo"
echo "build register person json"
endpoint=$ENDPOINT repo_name=$REPO_NAME path_rq=$PATH_RQ file_rq=$FILENAME_RQ ext_rq=$EXTENSION_RQ mime_type=$MIME_TYPE query_type=$QUERY_TYPE path_out=$PATH_OUT file_out=$FILENAME_OUT ext_out=$EXTENSION_OUT node assets/staticSrc/js/gdb_queryRepo.js