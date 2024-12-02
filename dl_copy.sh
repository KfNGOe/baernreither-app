# bin/bash
echo "copy source dir to target dir"

cd /home/rh/github/dev-baernreither-app/assets/staticSrc/js

cp build_rdfJs.js build_ttl.js build_xmlId.js build_xmlJs.js normalize_ws.js /home/rh/github/baernreither-data/src/js/
cp build_tei2ttl.sh ghactions-tei2tei_id.sh /home/rh/github/baernreither-data/

#sourceDir="/home/rh/github/dev-baernreither-app/html"
#targetDir="/home/rh/github/baernreither-app/"

#sourceDir="/home/rh/github/baernreither-data/data/xlsx"
#targetDir="/home/rh/github/dev-baernreither-app/data/xlsx"

#cp -r $sourceDir/* $targetDir

echo "copy done"