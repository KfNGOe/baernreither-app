#!/bin/bash

#this script checks the changes of the last commit
#Only works in github actions env!

echo starting tei to ttl transformation
 
inputDir="data/tei/tei_toBuild/"
outputDir="data/tei/tei_built/"

filesChanged=false;

if ! test -d "$inputDir"
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

                    if test -f "$outputDir$name.xml"
                    then
                        echo "removing tei file in output dir"
                        rm "$outputDir$name.xml"
                    fi

                    if ! test -d "$outputDir"
                    then
                        echo "creating output dir"
                        mkdir -p "$outputDir"
                    fi            

                    if test -f "$changed_file"
                    then
                        echo "tei was changed/added. Starting transform"
                        echo "Starting tei to tei with xmlid transformation"
                        export name                        
                        ./build_tei2ttl.sh
                        echo "Starting umlaut encoding"
                        #export filepaths to be used in the called scripts
                        export pathName=$pathname
                        export name=$name
                        export ext=".ttl"
                        #encode .ttl file
                        ./build_encodeUmlauts.sh
                        echo "Starting ttl to json transformation"          
                        ./build_text_ttl2json.sh
                        echo "Starting umlaut decoding"
                        #decode .ttl file
                        ./build_decodeUmlauts.sh
                        #decode .json file
                        export pathName="./data/json/text/all/"
                        export name="${name}_all"
                        export ext=".json"
                        ./build_decodeUmlauts.sh
                    fi

                    if test -f "$inputDir$name.xml"
                    then
                        echo "removing tei file in input dir"
                        rm "$inputDir$name.xml"
                    fi
                fi                
            fi
        done          
    fi
fi