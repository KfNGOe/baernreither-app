echo "build encoder for umlauts"

#PATH_IN='./data/ttl/text/'
PATH_IN=$pathName
FILENAME_IN=$name
#FILENAME_IN='Bae_TB_8'
EXTENSION_IN=$ext
#Extention_IN='.ttl'
     
PATH_OUT='${PATH_IN}'
#FILENAME_OUT=$name'_all'
FILENAME_OUT="${FILENAME_IN}"
EXTENSION_OUT='${EXTENSION_IN}'

FILEPATH_IN=$PATH_IN$FILENAME_IN$EXTENSION_IN
FILEPATH_OUT=$PATH_OUT$FILENAME_OUT$EXTENSION_OUT

echo "encode umlauts"
filepath_in=$FILEPATH_IN filepath_out=$FILEPATH_OUT node assets/staticSrc/js/build_encodeUmlauts.js
