echo "build ttl register from tei"

echo read files from tei directory
inputDir="data/tei/anno/register/"
outputDir="data/ttl/anno/register/"

for file in $inputDir*.xml; do
  #echo "$file"
  #check if file is no template
    if [[ "$file" != *"_temp"*  ]]
    then
        echo "Found tei: ${file}"
        pathname=$(dirname "$file")/        
        echo "tei path: ${pathname}"
        name=$(basename "$file" .xml)
        echo "tei filename: ${name}"  #name of the file without extension
        if test -f "$file"
        then
        echo "Starting tei to ttl transformation"
        export pathname
        export name
        ./build_tei2ttl.sh
        fi
    fi
done

echo "build ttl register from tei done!"