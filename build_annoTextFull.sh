echo "build anno note"

echo "clear graphdb"
./gdb_clearRepo.sh

echo "import anno files to graphdb"
echo read files from ttl tmp directory
inputDir="data/ttl/anno/anno_web/"
inputDir_tmp="data/ttl/anno/anno_web/tmp/"
#make tmp dir
mkdir -p $inputDir_tmp
#copy files to tmp dir
cp $inputDir/annoAbbr.ttl $inputDir/annoApp.ttl $inputDir/annoDel.ttl $inputDir/annoNote.ttl $inputDir_tmp


echo "Checkpoint 1: check files in tmp dir"
read -p "Press Enter to continue..."

for file in $inputDir_tmp*.ttl; do
  #echo "$file"
  #check if file is no template
    if [[ "$file" = *"anno"*  ]]
    then
        echo "Found ttl: ${file}"
        pathname=$(dirname "$file")/        
        echo "ttl path: ${pathname}"
        name=$(basename "$file" .ttl)
        echo "ttl filename: ${name}"
        if test -f "$file"
        then
        echo "Starting ttl import to graphdb repo"
        #export pathName
        export pathName=$pathname
        export name=$name                
        export ext_out='.ttl'
				./gdb_importFile.sh
        fi
    fi
done

echo "build anno full text ttl"
export mime_type='text/turtle'
export query_type='CONSTRUCT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='annoTextFull'
export path_out='./data/ttl/anno/anno_web/'
export file_out='annoTextFull'
export ext_out='.ttl'
./gdb_queryRepo.sh

echo "clear graphdb"
./gdb_clearRepo.sh

echo "import anootextfulli ttl to graphdb"
echo "Starting ttl import to graphdb repo"
export pathName='data/ttl/anno/anno_web/'
export name='annoTextFull'
export ext_out='.ttl'
./gdb_importFile.sh

echo "build anno text full json"
export mime_type='application/sparql-results+json'
export query_type='SELECT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='annoTextFull_json'
export path_out='./data/json/anno/anno_web/'
export file_out='annoTextFull'
export ext_out='.json'
./gdb_queryRepo.sh

#remove tmp dir
rm -r $inputDir_tmp

echo "build anno text full done"