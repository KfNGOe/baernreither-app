echo "build decoder for umlauts"

PATH_IN=$pathName
FILENAME_IN=$name
EXTENSION_IN=$ext

PATH_OUT="${PATH_IN}"
FILENAME_OUT="${FILENAME_IN}"
EXTENSION_OUT="${EXTENSION_IN}"

FILEPATH_IN=$PATH_IN$FILENAME_IN$EXTENSION_IN
FILEPATH_OUT=$PATH_OUT$FILENAME_OUT$EXTENSION_OUT

echo "dencode umlauts"
filepath_in=$FILEPATH_IN filepath_out=$FILEPATH_OUT node assets/staticSrc/js/build_decodeUmlauts.js