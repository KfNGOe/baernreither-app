ENDPOINT='http://localhost:7200'
REPO_NAME='kfngoe_test'

echo "clear graphdb repo"
endpoint=$ENDPOINT repo_name=$REPO_NAME node assets/staticSrc/js/gdb_clearRepo.js
