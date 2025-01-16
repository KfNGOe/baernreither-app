#!/bin/bash

# Directory containing the files
directory="data/ttl/anno/anno_web"

# Loop through all files in the directory
for file in "$directory"/*i.*; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Remove the "i" before the dot in the filename
    new_file="${file%i.*}.${file##*.}"
    mv "$file" "$new_file"
    echo "Renamed $file to $new_file"
  fi
done

echo "All files have been renamed."