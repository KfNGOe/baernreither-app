echo "build stems"
echo "remove old stems"
rm -r staticSearch/stems
echo "remove old stems done"
echo "mkdir stems"
mkdir staticSearch/stems
echo "mkdir stems done"
echo "build stems"
node staticSearch/ssStems_2.js
echo "build stems done"