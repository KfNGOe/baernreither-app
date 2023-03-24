#echo "remove old graphdb"
#rm -rf graphdb-10.2.0

#echo "unzip graphdb"
#unzip graphdb-10.2.0-dist.zip

echo "start graphdb"
cd graphdb-10.2.0
./bin/graphdb




<<COMMENT
Build the backend
        cd server
        npm install
        npm run build
        npm run start:prod &
        sleep 5
        curl http://localhost:port -I

        # Build the frontend
        cd ../client
        npm install
        npm run build
        npm run start &
        sleep 5
        curl http://localhost:port -I
COMMENT