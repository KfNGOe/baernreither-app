echo "Setting up directories..."

mkdir -p ./data/json/anno/register/tmp/
mkdir -p ./data/json/anno/anno_web/
mkdir -p ./data/json/text/all/
mkdir -p ./data/json/text/full/
mkdir -p ./data/json/text/mdata/

mkdir -p ./data/tei/anno/register/
mkdir -p ./data/tei/text/

mkdir -p ./data/ttl/anno/anno_web/
mkdir -p ./data/ttl/anno/register/
mkdir -p ./data/ttl/text/

mkdir -p ./data/txt/anno/register/
mkdir -p ./data/txt/log/anno/register/
mkdir -p ./data/txt/log/text/
mkdir -p ./data/txt/text/

mkdir -p html/text/

mkdir -p ./staticSearch/data/json/stems/
mkdir -p ./staticSearch/data/json/tokens/
mkdir -p ./staticSearch/data/txt/

ls -la ./data

echo "Directories set up!"