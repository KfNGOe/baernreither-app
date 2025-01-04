#!/bin/bash

# Source and destination directories
src_dir="/home/rh/github/dev-baernreither-app/data/json"
dest_dir="/home/rh/github/baernreither-app/data/json"

# Create the destination directory if it doesn't exist
mkdir -p "$dest_dir"

# Find and copy .js files that start with "gdb_" but exclude those that start with "gdb_test"
find "$src_dir" -type f -name "*_temp.json" ! -exec cp {} "$dest_dir" \;

echo "Copy completed."