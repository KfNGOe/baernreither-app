echo "build tei to ttl"
#create a variable for the filename
PATH='./data/tei/'
FILENAME='Bae_TB_8'
EXT='.xml'
#echo "normalize whitespace"
node assets/staticSrc/js/normalize_ws.js

#echo "build xml ID"
#path=$PATH file=$FILENAME node assets/staticSrc/js/build_xmlId.js


#ant -f ./build_test.xml
#./dl_assets.sh
