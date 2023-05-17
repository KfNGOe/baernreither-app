echo "build tei to ttl"

echo "normalize whitespace"
PATHNAME='./data/tei/'
FILENAME='Bae_TB_8'
EXTENSION='.xml'

path=$PATHNAME file=$FILENAME ext=$EXTENSION node assets/staticSrc/js/normalize_ws.js

echo "build xml ID"
INPUT_PATHNAME='./data/tei/'
OUTPUT_PATHNAME='./data/tei_xmlId/'
OUTPUT_PATHNAME1='./data/json_xmlId/'
INPUT_EXTENSION='.xml'
OUTPUT_EXTENSION='.xml'
OUTPUT_EXTENSION1='.json'

path_in=$INPUT_PATHNAME path_out=$OUTPUT_PATHNAME path_out1=$OUTPUT_PATHNAME1 file=$FILENAME ext_in=$INPUT_EXTENSION ext_out=$OUTPUT_EXTENSION ext_out1=$OUTPUT_EXTENSION1 node assets/staticSrc/js/build_xmlId.js



