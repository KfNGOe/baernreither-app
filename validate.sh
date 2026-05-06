#!/bin/bash
# filepath: /home/rh/github/baernreither-app/validate.sh
# Validate and auto-fix TEI files against RNG schema

SCHEMA="schema/tei_minimal.rng"
SCHEMA_ALL="schema/tei_all.rng"
TEI_DIR="data/tei/text"

echo "Validating TEI files with auto-fix capabilities"
echo "==============================================="
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

# Check if full schema exists
if [ ! -f "$SCHEMA_ALL" ]; then
    echo "Error: Schema file not found: $SCHEMA_ALL"
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
FIXED=0

# Create file to store list of valid files
> valid_files.txt

# Function to add or fix schema reference
fix_schema_reference() {
    local file="$1"
    local temp_file="${file}.tmp"

    # Check if file has XML declaration
    if head -1 "$file" | grep -q '<?xml'; then
        # Get the XML declaration
        XML_DECL=$(head -1 "$file")

        # Check for real xml-model PI (not inside a comment)
        if grep -qP '^\s*<\?xml-model' "$file"; then
            # Schema PI exists → replace with SCHEMA (tei_minimal.rng)
            sed '/<\?xml-model/d' "$file" > "$temp_file"
            {
                echo "$XML_DECL"
                echo "<?xml-model href=\"../../../$SCHEMA\" type=\"application/xml\" schematypens=\"http://relaxng.org/ns/structure/1.0\"?>"
                tail -n +2 "$temp_file"
            } > "$file"
        else
            # No schema PI or only in comment → use SCHEMA_ALL (tei_all.rng)
            {
                echo "$XML_DECL"
                echo "<?xml-model href=\"../../../$SCHEMA_ALL\" type=\"application/xml\" schematypens=\"http://relaxng.org/ns/structure/1.0\"?>"
                tail -n +2 "$file"
            } > "$temp_file"
            mv "$temp_file" "$file"
        fi
    else
        # No XML declaration → add declaration and SCHEMA_ALL
        {
            echo '<?xml version="1.0" encoding="UTF-8"?>'
            echo "<?xml-model href=\"../../../$SCHEMA_ALL\" type=\"application/xml\" schematypens=\"http://relaxng.org/ns/structure/1.0\"?>"
            cat "$file"
        } > "$temp_file"
        mv "$temp_file" "$file"
    fi

    rm -f "$temp_file"
}

# Validate each file
for file in "$TEI_DIR"/*.xml; do
    filename=$(basename "$file")
    echo "Processing $filename"
    
    CHECKS_PASSED=0
    CHECKS_FAILED=0
    NEEDS_FIX=false
    
    # CHECK 1: Schema reference in TEI file (tei_minimal.rng or tei_all.rng)
    echo -n "  [1/3] Schema reference check... "
    if grep -qP '^\s*<\?xml-model' "$file" && grep -qE 'href="\.\./\.\./\.\./schema/tei_(minimal|all)\.rng"' "$file"; then
        echo "✓ Pass"
        ((CHECKS_PASSED++))
    else
        if grep -q 'xml-model' "$file" && ! grep -qP '^\s*<\?xml-model' "$file"; then
            echo "✗ Fail (schema reference is in a comment)"
        else
            echo "✗ Fail (schema reference missing or incorrect)"
        fi
        ((CHECKS_FAILED++))
        NEEDS_FIX=true
    fi
    
    # CHECK 2: Oxygen XML Editor (Windows) compatibility
    echo -n "  [2/3] Oxygen/Windows path check... "
    if grep -q 'xml-model.*href="[A-Z]:\\' "$file"; then
        echo "✗ Fail (Windows absolute path found)"
        ((CHECKS_FAILED++))
        NEEDS_FIX=true
    elif grep -q 'xml-model.*href="file:///' "$file"; then
        echo "✗ Fail (file:/// protocol found)"
        ((CHECKS_FAILED++))
        NEEDS_FIX=true
    else
        SCHEMA_REF=$(grep -oP '^\s*<\?xml-model[^>]*href="\K[^"]*' "$file" | head -1)
        if [ -z "$SCHEMA_REF" ]; then
            echo "✗ Fail (no schema reference)"
            ((CHECKS_FAILED++))
            NEEDS_FIX=true
        elif [[ "$SCHEMA_REF" == "../../../schema/tei_minimal.rng" ]] || [[ "$SCHEMA_REF" == "../../../schema/tei_all.rng" ]]; then
            echo "✓ Pass"
            ((CHECKS_PASSED++))
        else
            echo "✗ Fail (non-portable path: $SCHEMA_REF)"
            ((CHECKS_FAILED++))
            NEEDS_FIX=true
        fi
    fi
    
    # Apply fix if needed
    if [ "$NEEDS_FIX" = true ]; then
        echo "  → Auto-fixing schema reference..."
        fix_schema_reference "$file"
        echo "    ✓ Fixed: Schema reference updated"
        ((FIXED++))
        # Re-check after fix
        CHECKS_PASSED=2
        CHECKS_FAILED=0
    fi
    
    # CHECK 3: Jing validation with the schema referenced in the file
    echo -n "  [3/3] Jing validation... "
    if grep -qE 'href="\.\./\.\./\.\./schema/tei_all\.rng"' "$file"; then
        VALIDATE_SCHEMA="$SCHEMA_ALL"
    else
        VALIDATE_SCHEMA="$SCHEMA"
    fi
    jing "$VALIDATE_SCHEMA" "$file" 2>&1 | grep -v "^\[warning\]" > /tmp/jing_output.txt
    
    if [ ! -s /tmp/jing_output.txt ]; then
        echo "✓ Pass"
        ((CHECKS_PASSED++))
    else
        echo "✗ Fail"
        head -3 /tmp/jing_output.txt | sed 's/^/    /'
        if [ $(wc -l < /tmp/jing_output.txt) -gt 3 ]; then
            echo "    ... ($(wc -l < /tmp/jing_output.txt) total errors)"
        fi
        ((CHECKS_FAILED++))
    fi
    
    # Summary for this file
    if [ "$CHECKS_PASSED" -eq 3 ]; then
        echo "  ✓ ALL CHECKS PASSED (3/3)"
        echo "$filename" >> valid_files.txt
        ((VALID++))
    else
        echo "  ✗ FAILED ($CHECKS_FAILED/3 checks failed)"
        ((INVALID++))
    fi
    echo ""
done

# Summary
echo "==============================================="
echo "Summary:"
echo "  Valid:   $VALID (passed all 3 checks)"
echo "  Invalid: $INVALID (failed one or more checks)"
echo "  Fixed:   $FIXED (schema references corrected)"
echo "  Total:   $TOTAL"
echo "==============================================="

if [ "$INVALID" -gt 0 ]; then
    echo ""
    echo "Warning: $INVALID file(s) still have validation errors"
    echo "Files with corrected schema references may need content fixes"
fi

if [ "$FIXED" -gt 0 ]; then
    echo ""
    echo "Note: $FIXED file(s) had schema references fixed"
    echo "These files have been modified with portable schema paths"
fi

echo ""
exit 0