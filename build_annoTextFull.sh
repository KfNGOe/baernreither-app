echo "build anno note"

echo "clear graphdb"
./gdb_clearRepo.sh

echo "import anno files to graphdb"
echo read files from ttl tmp directory
inputDir="data/ttl/anno/anno_web/instance/"
inputDir_tmp="data/ttl/anno/anno_web/instance/tmp/"
#make tmp dir
mkdir -p $inputDir_tmp
#copy files to tmp dir
cp $inputDir*annoAbbri.ttl $inputDir*annoAppi.ttl $inputDir*annoDeli.ttl $inputDir*annoNotei.ttl $inputDir_tmp
#$inputDir*annoIndexSubi.ttl 

for file in $inputDir_tmp*.ttl; do
  #echo "$file"
  #check if file is no template
    if [[ "$file" = *"anno"*  ]]
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

echo "build anno full text ttl"
export mime_type='text/turtle'
export query_type='CONSTRUCT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='annoTextFull'
export path_out='./data/ttl/anno/anno_web/instance/'
export file_out='annoTextFulli'
export ext_out='.ttl'
./gdb_queryRepo.sh

echo "clear graphdb"
./gdb_clearRepo.sh

echo "import anootextfulli ttl to graphdb"
echo "Starting ttl import to graphdb repo"
export pathName='data/ttl/anno/anno_web/instance/'
export name='annoTextFulli'                
./gdb_importFile.sh

echo "build anno text full json"
export mime_type='application/sparql-results+json'
export query_type='SELECT'
export path_rq='assets/staticSrc/sparql/'
export file_rq='annoTextFull_json'
export path_out='./data/json/anno/'
export file_out='annoTextFull'
export ext_out='.json'
./gdb_queryRepo.sh

#remove tmp dir
rm -r $inputDir_tmp

echo "build anno text full done"