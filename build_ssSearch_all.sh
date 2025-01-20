echo "build complete search "

echo "tokenize texts"
node staticSearch/src/js/ssTokenizer.js
echo "tokenize texts done"

echo "build all Tokens"
node staticSearch/src/js/ssTokenAll.js
echo "build all Tokens done"

echo "remove old stems"
rm -r staticSearch/data/json/stems
echo "remove old stems done"

echo "mkdir stems"
mkdir staticSearch/data/json/stems
echo "mkdir stems done"

echo "build stems"
node staticSearch/src/js/ssStems.js
echo "build stems done"

echo "build complete search done!"