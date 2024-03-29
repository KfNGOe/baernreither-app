dev-baernreither-app

# docs

# git actions

- https://stackoverflow.com/questions/70231685/github-actions-run-server-frontend-then-execute-tests
- https://fleetdm.com/engineering/tips-for-github-actions-usability
- https://www.testmo.com/guides/github-actions-parallel-testing
- https://github.com/localtunnel/localtunnel
- https://fleetdm.com/engineering/tips-for-github-actions-usability

# Workflows
## Workflow ingest

*.xml -> build_tei2ttl.sh -> *.ttl<br>

## Workflow conversion text dipl ttl to json

*.ttl -> build_textDipl_ttl2json.sh -> *_dipl.json

## Workflow register
### convert xlsx to json
*.xlsx -> build_xlsx2json.sh -> person_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> place_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> org_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> index_xlsx.json<br>

### build json person entity from all ttl files 
*.ttl -> gdb_queryRepo.sh -> person_1_json.rq -> person.json<br>
### build json person register
person_xlsx.json + person.json -> build_register_json.sh -> register_person.json<br>
### convert json person register to html
register_person.json -> build_register_json2html.sh -> register_person.txt<br>
register_person.txt -> build_register_html.sh -> register_person.html<br>
<br>

# Attribute values
## @class, @id and @href
### tei:anchor
```
-> <a class="comp-equal" href="#comp_Bae_MF_6-2_2050" id="comp_Bae_TB_8_130" style="">...</a>

-> <a class="comp-inequal" href="#comp_Bae_MF_6-2_2081" id="comp_Bae_TB_8_153" style="">...</a>

-> <a class="comp-not" href="#comp_Bae_MF_6-2_2061" id="comp_Bae_TB_8_140" style="">...</a>

-> <a href="#" id="comp_Bae_TB_8_140" style="">...</a>
```

### tei:note
```
-> <div class="note editorial" id="note_Bae_TB_8_388" style="">...</div>
```

### tei:p
```
-> <p>...</p>
```

### tei:div
```
-> <div class="div diaryEntry" id="div_Bae_TB_8_460" style="">...</div>
-> <div class="div chapter" id="div_Bae_TB_8_4010" style="">...</div>
```


### tei text node
#### text is between tei:anchor and tei:app pos
```
-> <span class="comp-equal ..." id="text_Bae_TB_8_131" style="">...</span>

-> <span class="comp-inequal ..." id="text_Bae_TB_8_265" style="">...</span>

-> <span class="comp-not ..." id="text_Bae_TB_8_291" style="">...</span>
```

#### text is between tei:app pos
```
-> <span id="text_Bae_TB_8_137" style="display: none">...</span>
```

#### text is between tei:choice pos
```
-> <span class="dipl abbr ..." id="text_Bae_TB_8_191" style="">...</span>
-> <span class="norm expan ..." id="text_Bae_TB_8_194" style="">...</span>
```

#### text is between tei:add pos
```
-> <span class="dipl add ..." id="text_Bae_TB_8_755" style="">::before ... ::after</span>
-> <span class="norm add ..." id="text_Bae_TB_8_755" style="">...</span>

```

#### text is between tei:del pos
```
-> <span class="dipl del ..." id="text_Bae_TB_8_529" style="">...</span>
-> <span class="norm del ..." id="text_Bae_TB_8_755" style="display: none>...</span>

```

#### text is between tei:anchor and tei:addSpan pos
```
-> <span class="dipl addSpan start ..." id="text_Bae_TB_8_755" style="">::before ...</span>
-> <span class="dipl addSpan ..." id="text_Bae_TB_8_760" style="">...</span>
-> <span class="dipl addSpan end ..." id="text_Bae_TB_8_780" style="">...::after</span>

-> <span class="norm addSpan start ..." id="text_Bae_TB_8_755" style="">...</span>
-> <span class="norm addSpan ..." id="text_Bae_TB_8_760" style="">...</span>
-> <span class="norm addSpan end ..." id="text_Bae_TB_8_780" style="">...</span>

```
#### text is between tei:date pos
```
-> <span class="date ..." id="text_Bae_TB_8_529" style="">...</span>

```

#### text
```
-> <span id="text_Bae_TB_8_123">...</span>
```

