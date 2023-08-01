dev-baernreither-app

# docs

# git actions
- https://stackoverflow.com/questions/70231685/github-actions-run-server-frontend-then-execute-tests

- https://fleetdm.com/engineering/tips-for-github-actions-usability

- https://www.testmo.com/guides/github-actions-parallel-testing

- https://github.com/localtunnel/localtunnel

- https://fleetdm.com/engineering/tips-for-github-actions-usability

# Workflow register

*.xlsx -> build_xlsx2json.sh -> person_xlsx.json
person_xlsx.json -> build_person_json2ttl.sh -> personi.ttl

*.xml -> build_tei2ttl.sh -> *.ttl
*.ttl -> gdb_queryRepo.sh -> annoPerson_1.rq -> annoPersoni_1.ttl
annoPersoni_1.ttl -> gdb_queryRepo.sh -> annoPerson_2.rq -> annoPersoni_2.ttl
annoPersoni_2.ttl + *.ttl -> gdb_queryRepo.sh -> annoPerson_3.rq -> annoPersoni_3.ttl
annoPersoni_3.ttl + personi.ttl -> gdb_queryRepo.sh -> annoPerson_4.rq -> annoPersoni.ttl

//add gender
personi.ttl + gnd.ttl -> gdb_queryRepo.sh -> annoPerson_6.rq -> personi.ttl

personi.ttl + gnd.ttl + annoPersoni.ttl -> gdb_queryRepo.sh -> person.rq -> person.json

person.json + register_table_temp.html -> build_register_table.sh -> person.html
person.html + register_temp.html -> build_register.sh -> person.html

*.xlsx -> build_xlsx2json.sh -> person_xlsx.json
person_xlsx.json -> build_person_json2ttl.sh -> personi.ttl
