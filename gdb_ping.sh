#checks if the database website is reachable until it is reachable

ENDPOINT="http://localhost:7200/"

while true;
do
    echo "checking if $ENDPOINT is reachable"
    curl -s -o /dev/null $ENDPOINT
    if [ $? -eq 0 ]; then
        echo "$ENDPOINT is reachable"
        break
    fi
    sleep .5
done