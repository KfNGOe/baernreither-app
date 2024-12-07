echo "build anno register"

echo "clear graphdb"
./gdb_clearRepo.sh

echo read files from texts directory
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
        echo "Import text files"        
        export pathName=$pathname
        export name=$name        
        ./gdb_importFile.sh
        echo "Import text files done!"
        fi
    fi
done

echo "build anno register ttl"
echo read files from register directory
inputDir_reg="data/ttl/annotation/register/instance/"

for file in $inputDir_reg*.ttl; do
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
        echo "Import register files"        
        export pathName=$pathname
        export name=$name        
        ./gdb_importFile.sh
        echo "Import register files done!"
        echo "build anno register"
        fi
        export mime_type='text/turtle'
        export query_type='CONSTRUCT'
        export path_rq='assets/staticSrc/sparql/'
        export path_out='./data/ttl/annotation/anno_web/instance/'
        if [[ "$file" = *"register_index"*  ]]
        then
            export file_rq='annoIndex'
            export file_out='annoIndexi'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh        
        fi
        if [[ "$file" = *"register_org"*  ]]
        then
            export file_rq='annoOrg'
            export file_out='annoOrgi'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh        
        fi
        if [[ "$file" = *"register_person"*  ]]
        then
            export file_rq='annoPerson'
            export file_out='annoPersoni'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh        
        fi
        if [[ "$file" = *"register_place"*  ]]
        then
            export file_rq='annoPlace'
            export file_out='annoPlacei'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh        
        fi        
    fi
done

echo "clear graphdb"
#./gdb_clearRepo.sh

echo build anno register json
echo read files from anno directory
inputDir_anno="data/ttl/annotation/anno_web/instance/"

for file in $inputDir_anno*.ttl; do
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
            export pathName=$pathname
            export name=$name                    
            export mime_type='application/sparql-results+json'
            export query_type='SELECT'
            export path_rq='assets/staticSrc/sparql/'
            export path_out='./data/json/anno/'
            if [[ "$file" = *"Indexi.ttl" ]]
            then               
                echo "Import register files"                
                ./gdb_importFile.sh
                echo "Import register files done!"

                echo "build anno register json"                                
                export file_rq='annoIndex_json'
                export file_out='annoIndex'
                export ext_out='.json'
                ./gdb_queryRepo.sh
                echo "build anno register json done!"
            fi
            if [[ "$file" = *"Orgi.ttl" ]]
            then
                echo "Import register files"                
                ./gdb_importFile.sh
                echo "Import register files done!"
                
                echo "build anno register json"                                
                export file_rq='annoOrg_json'
                export file_out='annoOrg'
                export ext_out='.json'
                ./gdb_queryRepo.sh
                echo "build anno register json done!"
            fi
            if [[ "$file" = *"Personi.ttl" ]]
            then
                echo "Import register files"                
                ./gdb_importFile.sh
                echo "Import register files done!"
                
                echo "build anno register json"                                
                export file_rq='annoPerson_json'
                export file_out='annoPerson'
                export ext_out='.json'
                ./gdb_queryRepo.sh
                echo "build anno register json done!"
            fi
            if [[ "$file" = *"Placei.ttl" ]]
            then
                echo "Import register files"                
                ./gdb_importFile.sh
                echo "Import register files done!"
                
                echo "build anno register json"                                
                export file_rq='annoPlace_json'
                export file_out='annoPlace'
                export ext_out='.json'
                ./gdb_queryRepo.sh
                echo "build anno register json done!"
            fi
        fi
    fi
done

echo "build anno register done!"