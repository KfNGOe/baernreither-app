#Pings the graph database until it is up and running
ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

while true; do
    STATUS=$(curl -s -o /dev/null -w '%{http_code}' $ENDPOINT)
    if [ $STATUS -eq 200 ]; then
        break
    fi
    echo "Waiting for the graph database to be up and running..."
    sleep 1
done