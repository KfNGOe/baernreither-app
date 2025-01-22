#!/usr/bin/env bash

# This scripts collects all environment variables beginning with graphdb and prepares them as Java system options
# in the common JAVA_OPTS_ARRAY variable. This allows to override separate GraphDB configurations via the environment.
#
# The script supports the following formats for variable names:
#   graphdb.property    - does no processing, it preserves the dots
#   graphdb_property    - does no processing, it preserves the underscores
#   graphdb__property   - converts each __ to a ., i.e. graphdb__property becomes graphdb.property
#   graphdb___property  - converts each ___ to a -, i.e. graphdb___property becomes graphdb-property

for variable in $(env | grep "^graphdb" | cut -d '=' -f 1); do
  PROP_KEY=$variable
  PROP_VAL=$(printenv "${variable}")
  # Converts triple _ to a -
  PROP_KEY="${PROP_KEY//___/-}"
  # Converts double _ to a .
  PROP_KEY="${PROP_KEY//__/.}"
  # Converts resolved configurations as Java system properties
  JAVA_OPTS_ARRAY+=("-D${PROP_KEY}=${PROP_VAL}")
done
