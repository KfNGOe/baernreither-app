#copy register files

# Source and destination directories
src_dir="/home/rh/github/dev-baernreither-app/data/tei/register"
dest_dir="/home/rh/github/baernreither-app/data/tei/register"

# Create the destination directory if it doesn't exist
mkdir -p "$dest_dir"

# Find and copy .rq files, excluding those with a pattern like "_n" or "_nn" at the end of the name
find "$src_dir" -type f -name "*_template.xml"  -exec cp {} "$dest_dir" \;

echo "Copy completed."