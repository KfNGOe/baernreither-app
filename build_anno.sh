echo "build anno levels"

for script in ./build_anno*.sh; 
do 
  echo "Running $script"  
  #run the .sh scripts with exceptions  
  if [ -f "$script" ] && [ "$script" != "./build_anno.sh" ] && [ "$script" != "./build_annoCompData.sh" ] && [ "$script" != "./build_annoIndexSub.sh" ] && [ "$script" != "./build_annoRegister.sh" ] && [ "$script" != "./build_annoTextFull.sh" ]; then
    ./"$script"
  fi
done

echo "build anno levels done"