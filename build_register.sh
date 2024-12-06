echo "build register"

echo "convert xlsx to json"
#./build_register_xlsx2json.sh
echo "convert xlsx to json done"

echo "get geoname id's for places"
#./build_gn.sh
echo "get geoname id's for places done"

echo "build register entities from all ttl files"
#./build_register_texts_ttl2json.sh
echo "build register entities done"

echo "build register json tmp"
#./build_register_json.sh
echo "build register json tmp done"

echo "convert register tmp to xml"
#./build_register_json2tei.sh
echo "convert register tmp to xml done"

echo "convert register xml to ttl"
#./build_register_tei2ttl.sh
echo "convert register xml to ttl done"

echo "add id to register"
#./build_register_id_ttl2json.sh
#./build_register_id_json.sh
echo "add id to register done"

echo "build anno levels of register"
#./build_annoRegister.sh
echo "build anno levels of register done"

echo "convert register json to html"
#./build_register_json2html.sh
echo "convert register json to html done"

echo "build register done"

