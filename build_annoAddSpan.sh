echo "build anno add span"

echo "clear graphdb"
./gdb_clearRepo.sh

echo "import text files to graphdb"
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
        echo "Starting ttl import to graphdb repo"
        #export pathName
        export pathName=$pathname
        export name=$name                
        ./gdb_importFile.sh
        fi
    fi
done

echo "build anno ttl"
export mime_type='text/turtle'
export query_type='CONSTRUCT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='annoAddSpan'
export path_out='./data/ttl/anno/anno_web/instance/'
export file_out='annoAddSpani'
export ext_out='.ttl'
./gdb_queryRepo.sh

echo "clear graphdb"
./gdb_clearRepo.sh

echo "import ttl to graphdb"
echo "Starting ttl import to graphdb repo"
export pathName='data/ttl/anno/anno_web/instance/'
export name='annoAddSpani'
./gdb_importFile.sh

echo "build anno json"
export mime_type='application/sparql-results+json'
export query_type='SELECT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='annoAddSpan_json'
export path_out='./data/json/anno/'
export file_out='annoAddSpan'
export ext_out='.json'
./gdb_queryRepo.sh

echo "build anno add span done!"