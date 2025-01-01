#!/bin/bash

files=("build_texts.sh" "build_register.sh" "build_ssSearch_all.sh" "build_html.sh")

# Array to hold all found .sh files
all_files=()

# Function to recursively find .sh files
find_sh_files() {
    local file=$1
    while read -r sh_file; do
        echo "Found .sh file: $sh_file"
        if [[ ! " ${all_files[*]} " =~ " ${sh_file} " ]]; then
            #echo "Adding $sh_file to the list"
            # Add the found .sh file to the list
            all_files+=("$sh_file")
            # Uncomment the following lines for recursion
            if [[ -f "$sh_file" ]]; then
                find_sh_files "$sh_file"
            fi
        fi        
    done < <(grep -oP '\b\S+\.sh\b' "$file")
}

# Main script
for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Searching in $file"
        all_files+=("$file")
        find_sh_files "$file"
    fi
done

# Print all found files
echo "All .sh files:"
printf '%s\n' "${all_files[@]}"

# Output the list in the specified format
if [ ${#all_files[@]} -gt 0 ]; then
    echo "cp ${all_files[*]} /home/rh/github/baernreither-app/"
fi