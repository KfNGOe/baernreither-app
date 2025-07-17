#!/bin/bash

# Script to move XML files from tei/tei_built to tei/tei_toBuild
# This will remove the XML files from the source folder

# Define source and destination directories
SOURCE_DIR="/home/rh/github/baernreither-data/data/tei/tei_built"
DEST_DIR="/home/rh/github/baernreither-data/data/tei/tei_toBuild"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory '$SOURCE_DIR' does not exist!"
    exit 1
fi

# Create destination directory if it doesn't exist
if [ ! -d "$DEST_DIR" ]; then
    echo "Creating destination directory '$DEST_DIR'"
    mkdir -p "$DEST_DIR"
fi

# Count XML files before moving
XML_COUNT=$(find "$SOURCE_DIR" -name "*.xml" -type f | wc -l)

if [ "$XML_COUNT" -eq 0 ]; then
    echo "No XML files found in '$SOURCE_DIR'"
    exit 0
fi

echo "Found $XML_COUNT XML file(s) in '$SOURCE_DIR'"
echo "Moving XML files from '$SOURCE_DIR' to '$DEST_DIR'..."

# Move all XML files (this removes them from source)
find "$SOURCE_DIR" -name "*.xml" -type f -exec mv {} "$DEST_DIR/" \;

echo "Successfully moved $XML_COUNT XML file(s)"
echo "XML files have been removed from '$SOURCE_DIR' and moved to '$DEST_DIR'"
