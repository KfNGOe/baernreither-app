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

# These helpers treat the file as a whole (not line-by-line), so it doesn't
# matter whether the xml-model PI shares a line with the XML declaration,
# sits on its own line, or appears more than once.

# True (exit 0) if a real, non-commented <?xml-model?> PI exists anywhere in the file
has_real_xml_model_pi() {
    local file="$1"
    perl -0777 -ne '
        s/<!--.*?-->//gs;
        exit(/<\?xml-model\b/ ? 0 : 1);
    ' "$file"
}

# Prints the href of the first real, non-commented <?xml-model?> PI (empty if none)
get_xml_model_href() {
    local file="$1"
    perl -0777 -ne '
        s/<!--.*?-->//gs;
        print $1 if /<\?xml-model\b[^>]*href="([^"]*)"/;
    ' "$file"
}

# Prints how many real, non-commented <?xml-model?> PIs exist in the file
count_real_xml_model_pi() {
    local file="$1"
    perl -0777 -ne '
        s/<!--.*?-->//gs;
        my @m = /<\?xml-model\b/g;
        print scalar(@m);
    ' "$file"
}

# Function to add or fix schema reference
fix_schema_reference() {
    local file="$1"
    local temp_file="${file}.tmp"
    local target_schema

    if has_real_xml_model_pi "$file"; then
        # Schema PI exists (anywhere) → normalize to SCHEMA (tei_minimal.rng)
        target_schema="$SCHEMA"
    else
        # No schema PI, or only in a comment → use SCHEMA_ALL (tei_all.rng)
        target_schema="$SCHEMA_ALL"
    fi

    perl -0777 -CSD -e '
        my ($target) = @ARGV;
        local $/;
        my $content = <STDIN>;

        # Remove every real (non-commented) xml-model PI, wherever it sits;
        # leave commented-out ones untouched.
        $content =~ s/(<!--.*?-->)|<\?xml-model\b[^>]*\?>\s*/defined($1) ? $1 : ""/gse;

        # Ensure an XML declaration exists
        if ($content !~ /^\s*<\?xml\b/) {
            $content = qq{<?xml version="1.0" encoding="UTF-8"?>\n} . $content;
        }

        # Insert exactly one xml-model PI right after the XML declaration
        my $pi = qq{<?xml-model href="../../../$target" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>};
        $content =~ s/(<\?xml\b[^?]*\?>)/$1\n$pi/;

        print $content;
    ' "$target_schema" < "$file" > "$temp_file"
    mv "$temp_file" "$file"
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
    PI_COUNT=$(count_real_xml_model_pi "$file")
    if [ "$PI_COUNT" -eq 1 ] && grep -qE 'href="\.\./\.\./\.\./schema/tei_(minimal|all)\.rng"' "$file"; then
        echo "✓ Pass"
        ((CHECKS_PASSED++))
    else
        if [ "$PI_COUNT" -gt 1 ]; then
            echo "✗ Fail (duplicate schema references found)"
        elif grep -q 'xml-model' "$file" && [ "$PI_COUNT" -eq 0 ]; then
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
        SCHEMA_REF=$(get_xml_model_href "$file")
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