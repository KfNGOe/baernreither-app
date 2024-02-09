dev-baernreither-app

# docs

# git actions

- https://stackoverflow.com/questions/70231685/github-actions-run-server-frontend-then-execute-tests
- https://fleetdm.com/engineering/tips-for-github-actions-usability
- https://www.testmo.com/guides/github-actions-parallel-testing
- https://github.com/localtunnel/localtunnel
- https://fleetdm.com/engineering/tips-for-github-actions-usability

# Workflow ingest

*.xml -> build_tei2ttl.sh -> *.ttl<br>

# Workflow register
## convert xlsx to json
*.xlsx -> build_xlsx2json.sh -> person_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> place_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> org_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> index_xlsx.json<br>

## build json person entity from all ttl files 
*.ttl -> gdb_queryRepo.sh -> person_1_json.rq -> person.json<br>
## build json person register
person_xlsx.json + person.json -> build_register_json.sh -> register_person.json<br>
## convert json person register to html
register_person.json -> build_register_json2html.sh -> register_person.txt<br>
register_person.txt -> build_register_html.sh -> register_person.html<br>
<br>
