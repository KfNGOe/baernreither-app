#!/bin/bash

# Source and destination directories
src_dir="/home/rh/github/dev-baernreither-app/assets/staticSrc/js"
dest_dir="/home/rh/github/baernreither-app/assets/staticSrc/js"

# Create the destination directory if it doesn't exist
mkdir -p "$dest_dir"

# Find and copy .js files that start with "gdb_" but exclude those that start with "gdb_test"
find "$src_dir" -type f -name "gdb_*.js" ! -name "gdb_test*.js" -exec cp {} "$dest_dir" \;

echo "Copy completed."