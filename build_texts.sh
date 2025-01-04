echo "build texts"

mkdir -p ./data/json/text/all/
mkdir -p ./data/json/text/full/
mkdir -p ./data/ttl/anno/anno_web/instance/
mkdir -p ./data/json/anno/

echo "conversion texts ttl to json"
./build_texts_ttl2json.sh
echo "conversion texts ttl to json done"

echo "build text data"
./build_text_mdata.sh
echo "build text data done"

echo "build annotation levels"
./build_anno.sh
echo "build annotation levels done"

echo "build annotation levels for text compare"
./build_annoCompData.sh
echo "build annotation levels for text compare done"

echo "build annotation levels for full texts"
./build_annoTextFull.sh
echo "build annotation levels for full texts done"

echo "build full text json"
./build_textFull_json2json.sh
echo "build full text json done"

echo "build texts done"