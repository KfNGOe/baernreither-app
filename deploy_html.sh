# bin/bash
echo "deploy to html"

echo "remove html"
rm -r html/
echo "remove html done \n"

echo "deploy assets"
mkdir -p html/css/
mkdir -p html/fonts/
mkdir -p html/images/
mkdir -p html/js/
cp -r assets/css/* html/css/
cp -r assets/fonts/* html/fonts/
cp -r assets/images/* html/images/
cp -r assets/staticSrc/js/bootstrap.bundle.js html/js/
cp -r assets/staticSrc/js/bootstrap.bundle.min.js html/js/
cp -r assets/staticSrc/js/constants.js html/js/
cp -r assets/staticSrc/js/index.js html/js/
cp -r assets/staticSrc/js/map.js html/js/
cp -r assets/staticSrc/js/nav-control.js html/js/
cp -r assets/staticSrc/js/popper-init.js html/js/
cp -r assets/staticSrc/js/register.js html/js/
cp -r assets/staticSrc/js/ssSearch.js html/js/
cp -r assets/staticSrc/js/ssSearchShow.js html/js/
cp -r assets/staticSrc/js/synoptik.js html/js/
echo "deploy assets done \n"

echo "deploy data"
mkdir -p html/data/img/
mkdir -p html/data/json/anno/anno_web/
mkdir -p html/data/json/anno/register/
mkdir -p html/data/json/text/all/
mkdir -p html/data/json/text/full/
mkdir -p html/data/json/text/mdata/
mkdir -p html/data/ttl/anno/register/
mkdir -p html/data/ttl/text/
mkdir -p html/data/txt/anno/register/
mkdir -p html/data/txt/text/
cp -r data/json/anno/anno_web/annoTextComp.json html/data/json/anno/anno_web/
cp -r data/json/anno/register/ html/data/json/anno/register/
cp -r data/json/text/all/ html/data/json/text/all/
cp -r data/json/text/full/ html/data/json/text/full/
cp -r data/json/text/mdata/ html/data/json/text/mdata/
cp -r data/ttl/anno/register/ html/data/ttl/anno/register/
cp -r data/ttl/text/ html/data/ttl/text/
cp -r data/txt/anno/register/ html/data/txt/anno/register/
cp -r data/txt/text/ html/data/txt/text/
echo "deploy data done \n"

echo "deploy search"
mkdir -p html/staticSearch/data/json/stems/
mkdir -p html/staticSearch/data/txt/
cp -r staticSearch/data/json/stems/ html/staticSearch/data/json/stems/
cp -r staticSearch/data/txt/ssTokenString.txt html/staticSearch/data/txt/
echo "deploy search done \n"

echo "deploy to html done \n"