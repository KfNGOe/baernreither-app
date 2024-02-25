# bin/bash
echo "copy assets"

mkdir -p html/images/
cp -r assets/images/*.* html/images/
mkdir -p html/css/
cp -r assets/css/ html/
#mkdir -p html/data/
#cp -r data/ html/
mkdir -p html/staticSearch/
cp -r staticSearch/ html/
cp -r assets/staticSrc/js/bootstrap.bundle.js html/js
cp -r assets/staticSrc/js/nav-control.js html/js
cp -r assets/staticSrc/js/search.js html/js
cp -r assets/staticSrc/js/search_getIndex.js html/js

echo "copy assets done"