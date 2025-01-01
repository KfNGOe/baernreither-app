#!/bin/bash

# Source and destination directories
src_dir="/home/rh/github/dev-baernreither-app/assets/staticSrc/sparql"
dest_dir="/home/rh/github/baernreither-app/assets/staticSrc/sparql"

# Create the destination directory if it doesn't exist
mkdir -p "$dest_dir"

# Find and copy .rq files, excluding those with a pattern like "_n" or "_nn" at the end of the name
find "$src_dir" -type f -name "*.rq" ! -name "*_[0-9].rq" ! -name "*_[0-9][0-9]*.rq" -exec cp --parents {} "$dest_dir" \;

echo "Copy completed."