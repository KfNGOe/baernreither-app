echo "build html pages"

echo "build index.html"
node assets/staticSrc/js/build_index_html.js
echo "build index.html done"

echo "build edgeschichte.html"
node assets/staticSrc/js/build_edgeschichte_html.js
echo "build edgeschichte.html done"

echo "build edrichtlinien.html"
node assets/staticSrc/js/build_edrichtlinien_html.js
echo "build edrichtlinien.html done"

echo "build nutzung.html"
node assets/staticSrc/js/build_nutzung_html.js
echo "build nutzung.html done"

echo "build zeitplantagebuecher.html"
node assets/staticSrc/js/build_zeitplantagebuecher_html.js
echo "build zeitplantagebuecher.html done"

echo "build uerbersicht.html"
node assets/staticSrc/js/build_uebersicht_html.js
echo "build uebersicht.html done"

echo "build synoptik.html"
node assets/staticSrc/js/build_synoptik_html.js
echo "build synoptik.html done"

echo "build biographie.html"
node assets/staticSrc/js/build_biographie_html.js
echo "build biographie.html done"

echo "build register.html"
node assets/staticSrc/js/build_register_html.js
echo "build register.html done"

echo "build karte.html"
node assets/staticSrc/js/build_map_html.js
echo "build karte.html done"

echo "build search.html"
node assets/staticSrc/js/build_search_html.js
echo "build search.html done"

echo "build impressum.html"
node assets/staticSrc/js/build_impressum_html.js
echo "build impressum.html done"

echo "build foerdernde.html"
node assets/staticSrc/js/build_foerdernde_html.js
echo "build foerdernde.html done"

echo "build datenschutz.html"
node assets/staticSrc/js/build_datenschutz_html.js
echo "build datenschutz.html done"

echo "build html pages done"

./dl_assets.sh