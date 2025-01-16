#!/bin/bash

# Source and destination directories
src_dir="/home/rh/github/dev-baernreither-app/"
dest_dir="/home/rh/github/baernreither-app/"

# Create the destination directory if it doesn't exist
mkdir -p "$dest_dir"

# Find and copy .js files that start with "gdb_" but exclude those that start with "gdb_test"
find "$src_dir" -type f -name "build_anno*.sh" ! -exec cp {} "$dest_dir" \;

echo "Copy completed."