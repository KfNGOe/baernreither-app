echo "convert text ttl to json"

inputDir="data/ttl/text/"

rm -rf ./data/json/text/all/*
mkdir -p ./data/json/text/all

for file in $inputDir*.ttl; do  
  #check if file is no template
    if [[ "$file" = *"Bae_"*  ]]
    then
        echo "Found ttl: ${file}"
        pathname=$(dirname "$file")/        
        echo "ttl path: ${pathname}"
        name=$(basename "$file" .ttl)
        echo "ttl filename: ${name}"  #name of the file without extension
        if test -f "$file"
        then
          echo "Starting umlaut encoding"
          #export filepaths to be used in the called scripts
          export pathName=$pathname
          export name=$name
          export ext=".ttl"
          #encode .ttl file
          ./build_encodeUmlauts.sh
          echo "Starting ttl to json transformation"          
          ./build_text_ttl2json.sh
          echo "Starting umlaut decoding"
          #decode .ttl file
          ./build_decodeUmlauts.sh
          #decode .json file
          export pathName="./data/json/text/all/"
          export name="${name}_all"
          export ext=".json"
          ./build_decodeUmlauts.sh
        fi
    fi
done