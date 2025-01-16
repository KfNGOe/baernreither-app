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
mkdir -p /home/rh/github/baernreither-app/data/json/temp/
mkdir -p /home/rh/github/baernreither-app/data/json/text/all/
mkdir -p /home/rh/github/baernreither-app/data/json/text/full/
mkdir -p /home/rh/github/baernreither-app/data/json/text/mdata/


echo "deploy data done"