echo "build tei to ttl"
PATHNAME='./data/tei/'
FILENAME='Bae_TB_8'
EXTENSION='.xml'

echo "normalize whitespace"
path=$PATHNAME file=$FILENAME ext=$EXTENSION node assets/staticSrc/js/normalize_ws.js

