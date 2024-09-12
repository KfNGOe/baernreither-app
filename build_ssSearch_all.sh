echo "build complete search "

echo "tokenize texts"
node staticSearch/ssTokenizer.js
echo "tokenize texts done"

echo "build all Tokens"
node staticSearch/ssTokenAll.js
echo "build all Tokens done"

echo "remove old stems"
rm -r staticSearch/stems
echo "remove old stems done"
echo "mkdir stems"
mkdir staticSearch/stems
echo "mkdir stems done"
echo "build stems"
node staticSearch/ssStems.js
echo "build stems done"

echo "build complete search done!"