#!/bin/bash

# Script to reset data directory with git operations
# Remove XML and XLSX files, then restore from a specific commit

echo "Disabling build workflow..."
git mv .github/workflows/build.yml .github/workflows/build.yml.disabled

echo "Committing workflow disable..."
git commit -m "disable build workflow"

echo "Pushing changes to remote..."
git push

echo "Removing XML files from data/tei/text/..."
git rm data/tei/text/*.xml

echo "Removing XLSX files from data/xlsx/..."
git rm data/xlsx/*.xlsx

echo "Committing removal of TEI and XLSX files..."
git commit -m "remove tei + xlsx"

echo "Pushing changes to remote..."
git push

echo "Enabling build workflow..."
git mv .github/workflows/build.yml.disabled .github/workflows/build.yml

echo "Committing workflow re-enable..."
git commit -m "enable build workflow"

echo "Pushing changes to remote..."
git push

echo "Checking out data/* from commit 752b1dd..."
git checkout 752b1dd -- data/*

echo "Committing re-addition of TEI and XLSX files..."
git commit -m "re-add tei + xlsx"

echo "Pushing changes to remote..."
git push

echo "Data reset complete!"