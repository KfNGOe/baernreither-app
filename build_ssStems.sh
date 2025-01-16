echo "build stems"
echo "remove old stems"
rm -r staticSearch/json/stems
echo "remove old stems done"
echo "mkdir stems"
mkdir staticSearch/json/stems
echo "mkdir stems done"
echo "build stems"
node staticSearch/ssStems.js
echo "build stems done"