# bin/bash
echo "copy assets"

echo "remove html"
rm -r html/
echo "remove html done"

echo "copy css"
mkdir -p html/css/
cp -r assets/css/ html/
echo "copy css done"

echo "copy data html"
cp -r html/*.html html/
echo "copy data html done"

echo "copy data img"
mkdir -p html/data/img/
cp -r data/img/ html/data/
echo "copy data img done"

echo "copy data json"
mkdir -p html/data/json/
cp data/json/text_mdata.json html/data/json/
cp data/json/textComp_mdata.json html/data/json/
mkdir -p html/data/json/anno/
cp data/json/anno/annoTextComp.json html/data/json/anno/
mkdir -p html/data/json/anno/register/
cp data/json/anno/register/register_index.json html/data/json/anno/register/
cp data/json/anno/register/register_org.json html/data/json/anno/register/
cp data/json/anno/register/register_person.json html/data/json/anno/register/
cp data/json/anno/register/register_place.json html/data/json/anno/register/
cp data/json/anno/register/register_place_temp.json html/data/json/anno/register/
mkdir -p html/data/json/text/all/
cp -r data/json/text/all/ html/data/json/
mkdir -p html/data/json/text/full/
cp -r data/json/text/full/ html/data/json/
echo "copy data json done"

echo "copy data txt"
mkdir -p html/data/txt/
cp data/txt/text/*.txt html/data/txt/
mkdir -p html/data/txt/anno/register/
cp data/txt/anno/register/*.txt html/data/txt/anno/register/
echo "copy data txt done"

echo "copy fonts"
mkdir -p html/fonts/
cp -r assets/fonts/ html/
echo "copy fonts done"

echo "copy images"
mkdir -p html/images/
mkdir -p html/images/favicons/
cp -r assets/images/*.* html/images/
cp -r assets/images/favicons/*.* html/images/favicons/
echo "copy images done"

echo "copy js"
mkdir -p html/js/
cp -r assets/staticSrc/js/bootstrap.bundle.js html/js/
cp -r assets/staticSrc/js/bootstrap.bundle.min.js html/js/
cp -r assets/staticSrc/js/popper-init.js html/js/
cp -r assets/staticSrc/js/nav-control.js html/js/
cp -r assets/staticSrc/js/index.js html/js/
cp -r assets/staticSrc/js/register.js html/js/
cp -r assets/staticSrc/js/synoptik.js html/js/
cp -r assets/staticSrc/js/ssSearch.js html/js/
cp -r assets/staticSrc/js/ssSearchShow.js html/js/
cp -r assets/staticSrc/js/map.js html/js/
cp -r assets/staticSrc/js/constants.js html/js/
echo "copy js done"

echo "copy staticSearch"
mkdir -p html/staticSearch/
cp -r staticSearch/data/json/stems html/staticSearch/
cp -r staticSearch/ssTokenString.txt html/staticSearch/
echo "copy staticSearch done"

echo "copy assets done"