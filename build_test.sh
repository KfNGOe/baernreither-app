echo "build test"

#node assets/staticSrc/js/gnd_api.js
node assets/staticSrc/js/wikidata_api.js
#ant -f ./build_test.xml
#./dl_assets.sh