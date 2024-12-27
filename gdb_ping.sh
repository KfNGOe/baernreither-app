#checks if the database website is reachable until it is reachable

MAX_RETRIES=30
SLEEP_TIME=.5 #seconds
ENDPOINT="http://localhost:7200/"

RETRIE_COUNT=0

while true;
do
    echo "checking if $ENDPOINT is reachable"
    curl -s -o /dev/null $ENDPOINT
    if [ $? -eq 0 ]; then
        echo "$ENDPOINT is reachable"
        break
    fi
    if [ $RETRIE_COUNT -gt $MAX_RETRIES ]; then
        echo "reached max retries"
        exit 1
    fi
    RETRIE_COUNT=$((RETRIE_COUNT+1))
    sleep $SLEEP_TIME
done