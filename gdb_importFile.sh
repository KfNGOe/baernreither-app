ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

PATH_IN='data/ttl/text/'
FILENAME_IN='Bae_TB_8'
EXTENSION_IN='.ttl'

MIME_TYPE='text/turtle'

echo "import file to graphdb repo"
endpoint=$ENDPOINT repo_name=$REPO_NAME path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN mime_type=$MIME_TYPE node assets/staticSrc/js/gdb_importFile.js