#!/bin/bash

# List of .sh files
sh_files=(
    "build_texts.sh"
    "build_texts_ttl2json.sh"
    "build_encodeUmlauts.sh"
    "build_text_ttl2json.sh"
    "build_decodeUmlauts.sh"
    "build_text_mdata.sh"
    "build_anno.sh"
    "build_anno*.sh"
    "build_annoIndexSub.sh"
    "gdb_clearRepo.sh"
    "gdb_importFile.sh"
    "gdb_queryRepo.sh"
    "build_annoTextFull.sh"
    "build_annoRegister.sh"
    "build_textFull_json2json.sh"
    "build_register.sh"
    "build_register_xlsx2json.sh"
    "build_xlsx2json.sh"
    "build_gn.sh"
    "build_register_texts_ttl2json.sh"
    "build_register_json.sh"
    "build_register_json2tei.sh"
    "build_register_tei2ttl.sh"
    "build_tei2ttl.sh"
    "build_register_id_ttl2json.sh"
    "build_register_id_json.sh"
    "build_ssSearch_all.sh"
    "build_html.sh"
    "build_textAll_json2html.sh"
    "build_register_json2html.sh"
    "build_pages_html.sh"
)

# Array to hold all found .js files
js_files=()

# Function to find .js files in a given .sh file
find_js_files() {
    local file=$1
    while read -r js_file; do
        echo "Found .js file: $js_file"  # Debug statement
        if [[ ! " ${js_files[*]} " =~ " ${js_file} " ]]; then
            js_files+=("$js_file")
        fi
    done < <(grep -oP '\b\S+\.js\b' "$file")
}

# Iterate through the list of .sh files and find .js files
for sh_file in "${sh_files[@]}"; do
    if [[ -f "$sh_file" ]]; then
        find_js_files "$sh_file"
    else
        echo "File does not exist: $sh_file"  # Debug statement
    fi
done

# Output the list of .js files
echo "All .js files:"
printf '%s\n' "${js_files[@]}"

# Output the cp command for the .js files
if [ ${#js_files[@]} -gt 0 ]; then
    echo "cp --parents ${js_files[*]} /home/rh/github/baernreither-app/assets/staticSrc/js/"
fi