echo "build anno note"

echo "clear graphdb"
./gdb_clearRepo.sh

echo "import text files to graphdb"
echo read files from ttl directory
inputDir="data/ttl/text/all/"

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
        echo "Starting ttl import to graphdb"
        #export pathName
        export pathName=$pathname
        export name=$name                
        export ext_out='.ttl'
				./gdb_importFile.sh
        fi
    fi
done

echo "import metadata of text files"
export pathName='data/ttl/text/mdata/'
export name='text_mdata'
export ext_out='.ttl'
./gdb_importFile.sh

echo "precompute annoNote ttl"
node assets/staticSrc/js/build_note_json2ttl.js

echo "import precomputed annoNote ttl to graphdb"
export pathName='data/ttl/anno/anno_web/'
export name='annoNote_tmp'
export ext_out='.ttl'
./gdb_importFile.sh

echo "build anno note ttl"
export mime_type='text/turtle'
export query_type='CONSTRUCT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='annoNote'
export path_out='./data/ttl/anno/anno_web/'
export file_out='annoNote'
export ext_out='.ttl'
./gdb_queryRepo.sh

echo "remove annoNote_tmp ttl"
rm -f ./data/ttl/anno/anno_web/annoNote_tmp.ttl

echo "clear graphdb"
./gdb_clearRepo.sh

echo "import notei ttl to graphdb"
echo "Starting ttl import to graphdb repo"
export pathName='data/ttl/anno/anno_web/'
export name='annoNote'
export ext_out='.ttl'
./gdb_importFile.sh

echo "build anno note json"
export mime_type='application/sparql-results+json'
export query_type='SELECT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='annoNote_json'
export path_out='./data/json/anno/anno_web/'
export file_out='annoNote'
export ext_out='.json'
./gdb_queryRepo.sh

echo "build anno note done!"