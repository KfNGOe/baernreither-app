echo "build texts"

echo "build text metadata"
./build_text_mdata.sh
echo "build text metadata done \n"

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