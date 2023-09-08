#!/bin/bash

#this script checks the changes of the last commit
#Only works in github actions env!

echo starting tei ttl transformation
 
inputDir="data/tei_xmlId/"
outputDir="data/ttl/text/"
#changes="data/tei/Bae_TB_8.xml"

filesChanged=false;

echo $inputDir

if ! test -f "$inputDir"
then
    echo "no input dir"
else
    if [ -z "$changes" ] 
    then
        echo "\$changes is empty"
    else
        echo "\$changes is NOT empty"      
        
        for changed_file in $changes; do
            echo "Found changed file: ${changed_file}." #changed file is the path to the file including the filename
            if [[ "$changed_file" == *"$inputDir"* ]]
            then
                #check if file is xml
                if [[ "$changed_file" == *".xml" ]]
                then
                    echo "Found changed tei: ${changed_file}"
                    filesChanged=true;
                    name=$(basename "$changed_file" .xml)
                    echo "changed tei filename: ${name}"  #name of the file without extension
                    
                    if test -f "$outputDir$name.ttl"
                    then
                        echo "removing ttl file in output dir"
                        rm "$outputDir$name.ttl"
                    fi

                    if ! test -f "$outputDir"
                    then
                        echo "creating output dir"
                        mkdir -p "$outputDir"
                    fi            

                    if test -f "$changed_file"
                    then
                        echo "tei was changed/added. Starting transform"
                        echo "Starting tei to ttl transformation"
                        export name                
                        ./build_tei2ttl.sh
                    fi                    
                fi                
            fi
        done          
    fi
fi