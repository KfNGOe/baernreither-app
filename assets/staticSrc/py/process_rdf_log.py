import os
import re
from rdflib import Graph, Namespace, Literal

# Define namespaces
KFNGOEO = Namespace("https://github.com/KfNGOe/kfngoeo#")
XSD = Namespace("http://www.w3.org/2001/XMLSchema#")

# Function to process RDF files and replace keys in the log file
def process_rdf_and_log(rdf_dir, log_file):
    # Read the log file
    with open(log_file, 'r') as f:
        log_lines = f.readlines()

    # Create a dictionary to store replacements
    replacements = {}

    # Process each RDF file in the directory
    for rdf_file in os.listdir(rdf_dir):
        if rdf_file.endswith(".ttl"):
            g = Graph()
            g.parse(os.path.join(rdf_dir, rdf_file), format="turtle")

            # Query the RDF graph
            for s, p, o in g.triples((None, KFNGOEO.elementPos, None)):
                key_value = str(o)
                for _, _, attr_value in g.triples((s, KFNGOEO.hasAttr, None)):
                    for _, attr_name, attr_val in g.triples((attr_value, KFNGOEO.attrValue, None)):
                        if attr_name == KFNGOEO.attrValue:
                            replacements[key_value] = str(attr_val)

    # Replace keys in the log file
    updated_log_lines = []
    key_pattern = re.compile(r'pos = (\S+)')

    for line in log_lines:
        match = key_pattern.search(line)
        if match:
            key = match.group(1)
            if key in replacements:
                line = line.replace(key, replacements[key])
        updated_log_lines.append(line)

    # Print the updated log file
    for line in updated_log_lines:
        print(line, end='')

# Define the RDF directory and log file
rdf_directory = "/home/rh/github/dev-baernreither-app/data/ttl/text"
log_file_path = "/home/rh/github/dev-baernreither-app/data/txt/log/text/log_text.txt"

# Process the RDF files and log file
process_rdf_and_log(rdf_directory, log_file_path)