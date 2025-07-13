#!/bin/bash

# Script to remove all files in the paths specified in build.yml
# This script removes files from the directories that trigger the GitHub Actions workflow

set -e  # Exit on any error

echo "Removing files from build trigger paths..."

# Define the paths from build.yml
PATHS=(
    "data/tei/text"
    "data/xlsx"
    "html/data/img"
)

# Function to safely remove files in a directory
remove_files_in_path() {
    local path="$1"
    
    if [ -d "$path" ]; then
        echo "Processing directory: $path"
        
        # Find and remove all files (but keep directories)
        find "$path" -type f -exec rm -f {} \;
        
        echo "Removed all files in: $path"
        
        # Add .gitkeep files to preserve directory structure
        find "$path" -type d -empty -exec touch {}/.gitkeep \;
        echo "Added .gitkeep files to empty directories in: $path"
    else
        echo "Directory does not exist: $path"
    fi
}

# Process each path
for path in "${PATHS[@]}"; do
    remove_files_in_path "$path"
    echo ""
done

echo "File removal completed!"
echo "Note: Directory structure has been preserved with .gitkeep files"
