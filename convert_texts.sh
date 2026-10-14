#!/usr/bin/env bash
set -euo pipefail

echo "convert tei to ttl"
./build_tei2ttl_all.sh
echo "convert tei to ttl done"

echo "conversion texts ttl to json"
./build_texts_ttl2json.sh
echo "conversion texts ttl to json done"
