echo "build tei to ttl"
#create a variable for the filename
FILENAME='Bae_TB_8' 
#normalize whitespace
inputfile=$FILENAME node assets/staticSrc/js/normalize_ws.js

#echo "build xml ID"
#node assets/staticSrc/js/build_xmlId.js


#ant -f ./build_test.xml
#./dl_assets.sh