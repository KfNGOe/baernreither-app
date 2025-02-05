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
        echo "Import text file"        
        export pathName=$pathname
        export name=$name        
        export ext_out='.ttl'
        ./gdb_importFile.sh
        echo "Import text file done!"
        fi
    fi
done
echo "import text files done!"

echo "build anno register ttl"
echo read files from register directory
inputDir_reg="data/ttl/anno/register/"

for file in $inputDir_reg*.ttl; do  
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
            echo "Import register file"        
            export pathName=$pathname
            export name=$name        
            export ext_out='.ttl'
            ./gdb_importFile.sh
            echo "Import register file done!"        
        fi

        echo "build anno register"        
        export mime_type='text/turtle'
        export query_type='CONSTRUCT'
        export path_rq='assets/staticSrc/sparql/'
        export path_out='./data/ttl/anno/anno_web/'
        if [[ "$file" = *"register_index"*  ]]
        then
            echo "build anno index ttl"
            export file_rq='annoIndex'
            export file_out='annoIndex'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh            

            read -p "Press enter to continue"

            echo "build anno index sub ttl"                
            export file_rq='annoIndexSub'
            export file_out='annoIndexSub'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh        
        fi
        if [[ "$file" = *"register_org"*  ]]
        then
            echo "build anno org ttl"
            export file_rq='annoOrg'
            export file_out='annoOrg'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh        
        fi
        if [[ "$file" = *"register_person"*  ]]
        then
            echo "build anno person ttl"
            export file_rq='annoPerson'
            export file_out='annoPerson'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh        
        fi
        if [[ "$file" = *"register_place"*  ]]
        then
            echo "build anno place ttl"
            export file_rq='annoPlace'
            export file_out='annoPlace'
            export ext_out='.ttl'        
            ./gdb_queryRepo.sh        
        fi
        echo "build anno register done!"                
    fi
done
echo "build anno register ttl done!"

echo "clear graphdb"
./gdb_clearRepo.sh

echo build anno register json
echo read files from anno directory
inputDir_anno="data/ttl/anno/anno_web/"

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
            export path_out='./data/json/anno/anno_web/'
            if [[ "$file" = *"Index.ttl" ]]
            then               
                echo "Import index ttl file"                
                export ext_out='.ttl'
                ./gdb_importFile.sh                

                echo "build anno index json"                                
                export file_rq='annoIndex_json'
                export file_out='annoIndex'
                export ext_out='.json'
                ./gdb_queryRepo.sh                

                echo "build anno index sub json"                                
                export file_rq='annoIndexSub_json'
                export file_out='annoIndexSub'
                export ext_out='.json'
                ./gdb_queryRepo.sh
                
            fi
            if [[ "$file" = *"Org.ttl" ]]
            then
                echo "Import anno org ttl file"                
                export ext_out='.ttl'
                ./gdb_importFile.sh                
                
                echo "build anno org json"
                export file_rq='annoOrg_json'
                export file_out='annoOrg'
                export ext_out='.json'
                ./gdb_queryRepo.sh                
            fi
            if [[ "$file" = *"Person.ttl" ]]
            then
                echo "Import anno person ttl file"                
                export ext_out='.ttl'
                ./gdb_importFile.sh
                                
                echo "build anno person json"                                
                export file_rq='annoPerson_json'
                export file_out='annoPerson'
                export ext_out='.json'
                ./gdb_queryRepo.sh                
            fi
            if [[ "$file" = *"Place.ttl" ]]
            then
                echo "Import anno place ttl file"
                export ext_out='.ttl'
                ./gdb_importFile.sh
                                
                echo "build anno place json"                                
                export file_rq='annoPlace_json'
                export file_out='annoPlace'
                export ext_out='.json'
                ./gdb_queryRepo.sh                
            fi
        fi
    fi
done
echo build anno register json done!

echo "build anno register done!"