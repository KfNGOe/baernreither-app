echo "build register xlsx to json"
echo read files from xlsx directory

inputDir="data/xlsx/"

for file in $inputDir*.xlsx; do
  #echo "$file"
  #check if file is no template
    if [[ "$file" = *"Bae"*  ]]
    then
        echo "Found xlsx: ${file}"
        pathname=$(dirname "$file")/        
        echo "xlsx path: ${pathname}"
        name=$(basename "$file" .xlsx)
        echo "xlsx filename: ${name}"  #name of the file without extension
        if test -f "$file"
        then
            echo "Starting xlsx to json transformation"
            export pathname
            export name
            #register_index_xlsx
            if [[ "$file" = *"Index"*  ]]
            then                
                export name_out="register_index_xlsx"                        
            fi
            if [[ "$file" = *"org"*  ]]
            then                
                export name_out="register_org_xlsx"                
            fi
            if [[ "$file" = *"Ortsregister"*  ]]
            then                
                export name_out="register_place_xlsx"                
            fi
            if [[ "$file" = *"Personenregister"*  ]]
            then                
                export name_out="register_person_xlsx"                
            fi            
        ./build_xlsx2json.sh
        fi
    fi
done

echo "register xlsx to json done!"