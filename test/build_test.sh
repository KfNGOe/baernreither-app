echo "build test"

./build_texts.sh

read -p "Press enter to continue"

./build_register.sh

read -p "Press enter to continue"

./build_ssSearch_all.sh

read -p "Press enter to continue"

./build_html.sh

#./dl_assets.sh

echo "build test done"