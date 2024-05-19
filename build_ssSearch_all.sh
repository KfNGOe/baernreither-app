echo "build complete search "

echo "tokenize texts"
node staticSearch/ssTokenizer_2.js
echo "tokenize texts done"

echo "build all Tokens"
node staticSearch/ssTokenAll_2.js
echo "build all Tokens done"

echo "build stems"
node staticSearch/ssStems_2.js
echo "build stems done"

echo "build complete search done!"