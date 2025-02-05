echo "build html pages"

echo "conversion texts all json to html"
./build_textAll_json2html.sh
echo "conversion texts all json to html done \n"

echo "convert register json to html"
./build_register_json2html.sh
echo "convert register json to html done \n"

echo "build pages"
./build_pages_html.sh
echo "build pages done \n"

echo "build html pages done \n"

