echo "build register id json"

echo "clear graphdb"
./gdb_clearRepo.sh

echo read files from ttl directory
inputDir="data/ttl/annotation/register/instance/"

for file in $inputDir*.ttl; do
  #echo "$file"
  #check if file is no template
    if [[ "$file" = *"register_"*  ]]
    then
        echo "Found ttl: ${file}"
        pathname=$(dirname "$file")/        
        echo "ttl path: ${pathname}"
        name=$(basename "$file" .ttl)
        echo "ttl filename: ${name}"  #name of the file without extension
        if test -f "$file"
        then
        echo "Import ttl to graphdb repo"
        #export pathName
        export pathName=$pathname
        export name=$name        
        ./gdb_importFile.sh
        fi
    fi
done

echo "build register id"
export mime_type='application/sparql-results+json'
export query_type='SELECT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='register_id_json'
export path_out='./data/json/register/'
export file_out='register_id'
export ext_out='.json'
./gdb_queryRepo.sh

echo "build register id json done!"