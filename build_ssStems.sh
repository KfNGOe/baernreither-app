echo "build stems"
echo "remove old stems"
rm -r staticSearch/data/json/stems
echo "remove old stems done"
echo "mkdir stems"
mkdir staticSearch/data/json/stems
echo "mkdir stems done"
echo "build stems"
node staticSearch/src/js/ssStems.js
echo "build stems done"