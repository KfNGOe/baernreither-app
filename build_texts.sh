echo "build texts"

echo "conversion texts ttl to json"
./build_texts_ttl2json.sh
echo "conversion texts ttl to json done \n"

echo "build text data"
./build_text_mdata.sh
echo "build text data done \n"

echo "build annotation levels"
./build_anno.sh
echo "build annotation levels done \n"

echo "build annotation levels for text compare"
./build_annoCompData.sh
echo "build annotation levels for text compare done \n"

echo "build annotation levels for full texts"
./build_annoTextFull.sh
echo "build annotation levels for full texts done \n"

echo "build full text json"
./build_textFull_json2json.sh
echo "build full text json done \n"

echo "build texts done \n"