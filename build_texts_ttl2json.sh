echo "convert text ttl to json"

inputDir="data/ttl/text/all/"

teiDir="data/tei/text/"

mkdir -p ./data/json/text/all

# only convert the ttl files whose tei/xml changed ($changes is set by the github action)
files=()
for changed_file in ${changes:-}; do
    if [[ "$changed_file" == *"$teiDir"* && "$changed_file" == *".xml" ]]
    then
        files+=("$inputDir$(basename "$changed_file" .xml).ttl")
    fi
done

for file in "${files[@]}"; do  
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