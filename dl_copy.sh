# bin/bash
echo "copy source dir to target dir"

#sourceDir="/home/rh/github/dev-baernreither-app/html"
#targetDir="/home/rh/github/rh1967.github.io/"

sourceDir="/home/rh/github/baernreither-data/data/ttl/text"
targetDir="/home/rh/github/dev-baernreither-app/data/ttl/text"

cp -r $sourceDir/* $targetDir

echo "copy done"