echo read files from tei directory

inputDir="data/tei/text/"
outputDir="data/ttl/text/"

for file in $inputDir*.xml; do
  #echo "$file"
  #check if file is no template
    if [[ "$file" = *"Bae_"*  ]]
    then
        echo "Found tei: ${file}"
        pathname=$(dirname "$file")/        
        echo "tei path: ${pathname}"
        name=$(basename "$file" .xml)
        echo "tei filename: ${name}"  #name of the file without extension
        if test -f "$file"
        then
        echo "Starting tei to ttl transformation"
        #export pathName
        export pathName_in=$pathname
        export pathName_out=$outputDir
        export name=$name
        ./build_tei2ttl.sh
        fi
    fi
done