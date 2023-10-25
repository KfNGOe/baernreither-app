echo "build json to html"

PATH_IN='data/json/register/'
FILENAME_IN='person'
EXTENSION_IN='.json'

PATH_OUT='html/'
FILENAME_OUT='person'
EXTENSION_OUT='.html'

echo "build register table"
path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN path_out=$PATH_OUT file_out=$FILENAME_OUT ext_out=$EXTENSION_OUT node assets/staticSrc/js/build_register_table_html.js

PATH_IN='html/'
FILENAME_IN='person'
EXTENSION_IN='.html'

PATH_OUT='html/'
FILENAME_OUT='person'
EXTENSION_OUT='.html'

echo "build register"
path_in=$PATH_IN file_in=$FILENAME_IN ext_in=$EXTENSION_IN path_out=$PATH_OUT file_out=$FILENAME_OUT ext_out=$EXTENSION_OUT node assets/staticSrc/js/build_register_html.js 
