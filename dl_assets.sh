# bin/bash
echo "copy assets"

mkdir -p html/images/
cp -r assets/images/*.* html/images/
mkdir -p html/css/
cp -r assets/css/ html/
mkdir -p html/data/json/
cp -r data/json/ html/data/
mkdir -p html/data/txt/
cp -r data/txt/ html/data/
mkdir -p html/data/img/
cp -r data/img/ html/data/
mkdir -p html/staticSearch/
cp -r staticSearch/stems html/staticSearch/
cp -r staticSearch/ssTokenString.txt html/staticSearch/
cp -r assets/staticSrc/js/bootstrap.bundle.js html/js
cp -r assets/staticSrc/js/nav-control.js html/js
cp -r assets/staticSrc/js/index.js html/js
cp -r assets/staticSrc/js/synoptik.js html/js
cp -r assets/staticSrc/js/ssSearch.js html/js
cp -r assets/staticSrc/js/ssSearchShow.js html/js

echo "copy assets done"