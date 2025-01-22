@echo off

:: This scripts collects all environment variables beginning with graphdb and prepares them as Java system options
:: in the common JAVA_OPTS variable. This allows to override separate GraphDB configurations via the environment.
::
:: The processing supports the following formats for variable names:
::   graphdb.property    - does no processing, it preserves the dots
::   graphdb_property    - does no processing, it preserves the underscores
::   graphdb__property   - converts each __ to a ., i.e. graphdb__property becomes graphdb.property
::   graphdb___property  - converts each ___ to a -, i.e. graphdb___property becomes graphdb-property
::
:: The script must be used with "setlocal enabledelayedexpansion"

for /f "tokens=1,* delims==" %%A in ('set') do (
    set PROP_KEY=%%A
    if "!PROP_KEY:~0,7!" == "graphdb" (
        set PROP_VAL=%%B
        :: Converts triple _ to a -
        set "PROP_KEY=!PROP_KEY:___=-!"
        :: Converts double _ to a .
        set "PROP_KEY=!PROP_KEY:__=.!"
        :: Converts " to "" in the value to be escaped back to " later
        set "PROP_VAL=!PROP_VAL:"=""!"
        :: Converts resolved configurations as Java system properties
        set JAVA_OPTS=!JAVA_OPTS! -D!PROP_KEY!="!PROP_VAL!"
    )
)
