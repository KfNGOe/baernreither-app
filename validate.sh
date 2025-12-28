#!/bin/bash
# Validate all TEI files against RNG schema

SCHEMA="schema/tei_minimal.rng"
TEI_DIR="data/tei/text"

echo "Validating TEI files against $SCHEMA"
echo "========================================"
echo ""

# Check if jing is installed
if ! command -v jing &> /dev/null; then
    echo "Error: jing is not installed"
    echo "Install with: sudo apt-get install jing"
    exit 1
fi

# Check if schema exists
if [ ! -f "$SCHEMA" ]; then
    echo "Error: Schema file not found: $SCHEMA"
    exit 1
fi

# Check if TEI directory exists
if [ ! -d "$TEI_DIR" ]; then
    echo "Error: TEI directory not found: $TEI_DIR"
    exit 1
fi

# Count files
TOTAL=$(find "$TEI_DIR" -name "*.xml" | wc -l)
if [ "$TOTAL" -eq 0 ]; then
    echo "No XML files found in $TEI_DIR"
    exit 1
fi

echo "Found $TOTAL files to validate"
echo ""

VALID=0
INVALID=0

# Create file to store list of valid files
> valid_files.txt

# Validate each file
for file in "$TEI_DIR"/*.xml; do
    filename=$(basename "$file")
    echo -n "Validating $filename... "
    
    # Run jing and capture output (filter out warnings)
    jing "$SCHEMA" "$file" 2>&1 | grep -v "^\[warning\]" > /tmp/jing_output.txt
    
    # Check if there are any errors (non-empty output after filtering warnings)
    if [ ! -s /tmp/jing_output.txt ]; then
        echo "✓ Valid"
        echo "$filename" >> valid_files.txt
        ((VALID++))
    else
        echo "✗ Invalid"
        # Show first 5 errors
        head -5 /tmp/jing_output.txt
        if [ $(wc -l < /tmp/jing_output.txt) -gt 5 ]; then
            echo "... ($(wc -l < /tmp/jing_output.txt) total errors)"
        fi
        echo ""
        ((INVALID++))
    fi
done

# Summary
echo ""
echo "========================================"
echo "Summary:"
echo "  Valid:   $VALID"
echo "  Invalid: $INVALID"
echo "  Total:   $TOTAL"
echo "========================================"

if [ "$INVALID" -gt 0 ]; then
    echo ""
    echo "Warning: $INVALID file(s) failed validation and will not be deployed"
    exit 0
fi

echo ""
echo "All files are valid!"
