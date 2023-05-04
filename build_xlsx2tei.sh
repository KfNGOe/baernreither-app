#!/bin/bash

#this script converts xlsx mapping names to tei

inputDir="data/xlsx/"
teiOutputDir="data/tei/"

cwd=$(pwd)
echo $cwd
echo $inputDir
	
echo "Starting xlsx to tei transformation"

ant -f src/xlsx2tei/build-from.xml -DinputFile=../../$inputDir/Baernreither_Ortsregister_2023.xlsx -DoutputFile=../../$teiOutputDir/Baernreither_Ortsregister_2023.xml      

echo "transformation was successfull"

