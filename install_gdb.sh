#echo "remove old graphdb"
#rm -rf graphdb-10.2.0

#echo "unzip graphdb"
#unzip graphdb-10.2.0-dist.zip

echo "start graphdb"
cd graphdb-10.2.0
./bin/graphdb 
