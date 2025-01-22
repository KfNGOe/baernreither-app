ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe'

PATH_IN=$pathName
FILENAME_IN=$name
EXTENSION_IN='.ttl'

FILEPATH_IN=$PATH_IN$FILENAME_IN$EXTENSION_IN

MIME_TYPE='text/turtle'

echo "import text ttl file"
endpoint=$ENDPOINT repo_name=$REPO_NAME mime_type=$MIME_TYPE filepath=$FILEPATH_IN node assets/staticSrc/js/gdb_importFile.js