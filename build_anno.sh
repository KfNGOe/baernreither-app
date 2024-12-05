echo "build anno levels"

for script in ./build_anno*.sh; 
do 
  echo "Running $script"^
  #read -n 1    
  if [ -f "$script" ] && [ "$script" != "./build_anno.sh" ]; then
    ./"$script"
  fi
done

echo "build anno levels done"