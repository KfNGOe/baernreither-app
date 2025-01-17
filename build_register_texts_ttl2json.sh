echo "build register from texts"

echo "clear graphdb"
./gdb_clearRepo.sh

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
        echo "Starting ttl to json transformation"
        #export pathName
        export pathName=$pathname
        export name=$name        
        ./gdb_importFile.sh
        fi
    fi
done

echo read xlsx register files from json directory
inputDir_reg="data/json/anno/register/tmp/"

for file in $inputDir_reg*.json; do
  #echo "$file"
  #check if file is no template
    if [[ "$file" = *"_xlsx"*  ]]
    then
        echo "Found json: ${file}"
        pathname=$(dirname "$file")/        
        echo "xlsx path: ${pathname}"
        name=$(basename "$file" .json)
        echo "json filename: ${name}"  #name of the file without extension
        if test -f "$file"
        then
            echo "Starting ttl to json transformation"            
            export mime_type='application/sparql-results+json'
            export query_type='SELECT'
            export path_rq='assets/staticSrc/sparql/'
            export path_out='./data/json/anno/register/tmp/'
            if [[ "$file" = *"register_index"*  ]]
            then                
                export file_rq='index_text_json'            
                export file_out='register_index_text'
                export ext_out='.json'                
            fi
            if [[ "$file" = *"register_org"*  ]]
            then
                export file_rq='org_text_json'            
                export file_out='register_org_text'
                export ext_out='.json'
            fi
            if [[ "$file" = *"register_place"*  ]]
            then                
                export file_rq='place_text_json'            
                export file_out='register_place_text'
                export ext_out='.json'
            fi
            if [[ "$file" = *"register_person"*  ]]
            then
                export file_rq='person_text_json'            
                export file_out='register_person_text'
                export ext_out='.json'                
            fi            
            ./gdb_queryRepo.sh
        fi
    fi
done

echo "build register from texts done!"