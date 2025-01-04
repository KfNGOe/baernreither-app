echo "build anno levels"

for script in ./build_anno*.sh; 
do 
  echo "Running $script"
  #stop to read the output
  read -n 1    
  #run the .sh scripts with exceptions
  if [ -f "$script" ] && [ "$script" != "./build_anno.sh" ] && [ "$script" != "./build_annoIndexSub.sh" ] && [ "$script" != "./build_annoTextFull.sh" ] && [ "$script" != "./build_annoRegister.sh" ]; then
    ./"$script"
  fi
done

echo "build anno levels done"