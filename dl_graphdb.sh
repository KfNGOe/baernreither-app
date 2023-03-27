echo "downloading graphdb.js"
wget https://cdn.jsdelivr.net/npm/graphdb@3.0.0/

echo "installing graphdb.js"
npm install graphdb

echo "update uuid.js"
npm install uuid@latest

echo "test graphdb.js"
npm run test


