echo read files from ttl directory

inputDir="data/ttl/text/"

for file in $inputDir*.ttl; do
  #echo "$file"
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
          ./build_encodeUmlauts.sh
          echo "Starting ttl to json transformation"          
          ./build_text_ttl2json.sh
          echo "Starting umlaut decoding"
          ./build_decodeUmlauts.sh
        fi
    fi
done