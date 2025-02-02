echo "build complete search "

echo "tokenize texts"
node staticSearch/src/js/ssTokenizer.js
echo "tokenize texts done \n"

echo "build all Tokens"
node staticSearch/src/js/ssTokenAll.js
echo "build all Tokens done \n"

echo "remove old stems"
rm -r staticSearch/data/json/stems
echo "remove old stems done \n"

echo "mkdir stems"
mkdir staticSearch/data/json/stems
echo "mkdir stems done \n"

echo "build stems"
node staticSearch/src/js/ssStems.js
echo "build stems done \n"

echo "build complete search done \n!"