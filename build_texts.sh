echo "build texts"

echo "conversion texts ttl to json"
#./build_texts_ttl2json.sh
echo "conversion texts ttl to json done"

echo "build text data"
#./build_text_mdata.sh
echo "build text data done"

echo "build annotation levels"
#./build_anno.sh
echo "build annotation levels done"

echo "build annotation levels for full texts"
#./build_annoTextFull.sh
echo "build annotation levels for full texts done"

echo "build full text json"
#./build_textFull_json2json.sh
echo "build full text json done"

echo "conversion texts all json to html"
#./build_textAll_json2html.sh
echo "conversion texts all json to html done"

echo "build texts done"