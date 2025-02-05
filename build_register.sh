echo "build register"

echo "convert xlsx to json"
./build_register_xlsx2json.sh
echo "convert xlsx to json done \n"

echo "get geoname id's for places"
./build_gn.sh
echo "get geoname id's for places done \n"

echo "build register entities from all ttl files"
./build_register_texts_ttl2json.sh
echo "build register entities done \n"

echo "build register json tmp"
./build_register_json.sh
echo "build register json tmp done \n"

echo "convert register tmp to xml"
./build_register_json2tei.sh
echo "convert register tmp to xml done \n"

echo "convert register xml to ttl"
./build_register_tei2ttl.sh
echo "convert register xml to ttl done \n"

echo "add id to register"
./build_register_id_ttl2json.sh
./build_register_id_json.sh
echo "add id to register done \n"

echo "build anno levels of register"
./build_annoRegister.sh
echo "build anno levels of register done \n"

echo "build register done \n"