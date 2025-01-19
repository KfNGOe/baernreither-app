echo "deploy to baernreither-app"

echo "deploy yml"
cp .github/workflows/build.yml /home/rh/github/baernreither-app/.github/workflows/
echo "deploy yml done"

echo "deploy assets"
rm -r /home/rh/github/baernreither-app/assets/*
mkdir -p /home/rh/github/baernreither-app/assets/css/
mkdir -p /home/rh/github/baernreither-app/assets/fonts/
mkdir -p /home/rh/github/baernreither-app/assets/images/
mkdir -p /home/rh/github/baernreither-app/assets/staticSrc/js/
mkdir -p /home/rh/github/baernreither-app/assets/staticSrc/sparql/
mkdir -p /home/rh/github/baernreither-app/assets/txt/
cp -r assets/css/* /home/rh/github/baernreither-app/assets/css/
cp -r assets/fonts/* /home/rh/github/baernreither-app/assets/fonts/
cp -r assets/images/* /home/rh/github/baernreither-app/assets/images/
cp -r assets/staticSrc/js/* /home/rh/github/baernreither-app/assets/staticSrc/js/
cp -r assets/staticSrc/sparql/* /home/rh/github/baernreither-app/assets/staticSrc/sparql/
cp -r assets/txt/* /home/rh/github/baernreither-app/assets/txt/
echo "deploy assets done"

echo "deploy data"
rm -r /home/rh/github/baernreither-app/data/*
mkdir -p /home/rh/github/baernreither-app/data/json/anno/anno_web/
mkdir -p /home/rh/github/baernreither-app/data/json/anno/register/
mkdir -p /home/rh/github/baernreither-app/data/json/anno/register/tmp/
mkdir -p /home/rh/github/baernreither-app/data/json/temp/
mkdir -p /home/rh/github/baernreither-app/data/json/text/all/
mkdir -p /home/rh/github/baernreither-app/data/json/text/full/
mkdir -p /home/rh/github/baernreither-app/data/json/text/mdata/
cp -r data/json/temp/* /home/rh/github/baernreither-app/data/json/temp/

mkdir -p /home/rh/github/baernreither-app/data/meta/
cp -r data/meta/* /home/rh/github/baernreither-app/data/meta/

mkdir -p /home/rh/github/baernreither-app/data/tei/anno/register/
mkdir -p /home/rh/github/baernreither-app/data/tei/temp/
mkdir -p /home/rh/github/baernreither-app/data/tei/text/
cp -r data/tei/temp/* /home/rh/github/baernreither-app/data/tei/temp/

mkdie -p /home/rh/github/baernreither-app/data/ttl/anno/anno_web/
mkdir -p /home/rh/github/baernreither-app/data/ttl/anno/register/
mkdir -p /home/rh/github/baernreither-app/data/ttl/text/

mkdir -p /home/rh/github/baernreither-app/data/txt/anno/register/
mkdir -p /home/rh/github/baernreither-app/data/txt/log/anno/register/
mkdir -p /home/rh/github/baernreither-app/data/txt/log/text/

mkdir -p /home/rh/github/baernreither-app/data/xlsx/
echo "deploy data done"

echo "deploy search"
rm -r /home/rh/github/baernreither-app/staticSearch/*
mkdir -p /home/rh/github/baernreither-app/staticSearch/data/json/stems
mkdir -p /home/rh/github/baernreither-app/staticSearch/data/json/temp/
mkdir -p /home/rh/github/baernreither-app/staticSearch/data/json/tokens/
mkdir -p /home/rh/github/baernreither-app/staticSearch/data/txt/
cp -r staticSearch/data/json/temp/* /home/rh/github/baernreither-app/staticSearch/data/json/temp/
echo "deploy data done"

echo "deploy shell"
rm -r /home/rh/github/baernreither-app/*.sh
cp ./*.sh /home/rh/github/baernreither-app/
echo "deploy shell done"

echo "deploy baernreither-app done"