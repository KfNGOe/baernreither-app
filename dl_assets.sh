# bin/bash
echo "copy assets"
mkdir -p html/dist/assets/images/
cp -r assets/images/mockup/ html/dist/assets/images/
#mkdir -p html
#cp -r assets/staticData/*.* html/js
mkdir -p html/css/mockup/
cp -r assets/mockup/ html/css/
mkdir -p html/data/
cp -r data/ html/
echo "copy assets done"