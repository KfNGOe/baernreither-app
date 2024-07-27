# bin/bash
echo "copy assets"

mkdir -p html/images/
mkdir -p html/images/favicons/
cp -r assets/images/*.* html/images/
cp -r assets/images/favicons/*.* html/images/favicons/
mkdir -p html/css/
cp -r assets/css/ html/
mkdir -p html/data/json/
cp -r data/json/ html/data/
mkdir -p html/data/txt/
cp -r data/txt/ html/data/
cp -r data/ttl/ html/data/
#cp -r data/html/biographie.html html/
#cp -r data/html/datenschutz.html html/
#cp -r data/html/editionsgeschichte.html html/
#cp -r data/html/editionsrichtlinien.html html/
#cp -r data/html/foerdernde.html html/
#cp -r data/html/impressum.html html/
#cp -r data/html/karte.html html/
#cp -r data/html/uebersicht.html html/
cp -r data/tei_xmlId html/data/
#mkdir -p html/data/img/
#cp -r data/img/ html/data/
mkdir -p html/staticSearch/
cp -r staticSearch/stems html/staticSearch/
cp -r staticSearch/ssTokenString.txt html/staticSearch/
cp -r assets/staticSrc/js/bootstrap.bundle.js html/js
cp -r assets/staticSrc/js/nav-control.js html/js
cp -r assets/staticSrc/js/index.js html/js
cp -r assets/staticSrc/js/register.js html/js
cp -r assets/staticSrc/js/synoptik.js html/js
cp -r assets/staticSrc/js/ssSearch.js html/js
cp -r assets/staticSrc/js/ssSearchShow.js html/js
cp -r assets/staticSrc/js/map.js html/js

echo "copy assets done"