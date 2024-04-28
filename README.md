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
/tei/*.xml -> build_tei2ttl.sh -> *.ttl<br>

## Workflow conversion text ttl to json
/ttl/text/*.ttl -> build_textDipl_ttl2json.sh -> textDipl_json.rq -> *_dipl.json

## Workfloe build full text json
*_dipl.json + annoTextFull.json -> build_textFull_json2json.sh -> build_textFull_json2json.js -> *_full.json

## Workflow register
### convert xlsx to json
*.xlsx -> build_xlsx2json.sh -> build_xlsx2json.js -> register_person_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> build_xlsx2json.js -> register_place_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> build_xlsx2json.js -> register_org_xlsx.json<br>
*.xlsx -> build_xlsx2json.sh -> build_xlsx2json.js -> register_index_xlsx.json<br>

### build person entity json from all ttl files 
/ttl/text/*.ttl -> gdb_queryRepo.sh -> person_text_json.rq -> register_person_text.json<br>
### build register person json tmp
register_person_xlsx.json + register_person_text.json -> build_register_json.sh -> build_register_json.js -> register_person_tmp.json<br>
### convert register person tmp to xml
register_person_tmp.json -> build_person_json2tei.sh -> build_person_json2tei.js -> register_person.xml<br>
### convert register person xml to ttl
register_person.xml -> build_tei2ttl.sh -> register_person.ttl<br>
### convert register person ttl to json
register_person.ttl + register_person_tmp.json -> register_id_json.rq -> build_register_id.js -> register_person.json
### build anno person
/ttl/text/*.ttl + register_person.ttl -> gdb_queryRepo.sh -> annoPerson.rq -> annoPerson.ttl
annoPerson.ttl -> gdb_queryRepo.sh -> annoPerson_json.rq -> annoPerson_json.json
### convert json person register to html 
data/json/full/*_full.json + register_person.json + annoPerson.json -> build_register_json2html.sh -> build_register_json2html.js -> register_person.html<br>
<br>

## Workflow search


# HTML Attribute values
## @class, @id and @href
### tei:anchor
```
-> <a class="anchor comp-equal" href="#comp_Bae_MF_6-2_2050" id="comp_Bae_TB_8_130" style="">...</a>

-> <a class="anchor comp-inequal" href="#comp_Bae_MF_6-2_2081" id="comp_Bae_TB_8_153" style="">...</a>

-> <a class="anchor comp-not" href="#comp_Bae_MF_6-2_2061" id="comp_Bae_TB_8_140" style="">...</a>

-> <a class="anchor" href="#" id="comp_Bae_TB_8_140" style="">...</a>
```

### tei:note
```
-> <a href="#note_Bae_TB_8_388" style=""><img src="images/note.png" title="note" style="display: none"></a><div class="note editorial" id="note_Bae_TB_8_388" style="">...</div>
```

### tei:p
```
-> <p class="p" id="p_Bae_TB_8_388" style="">...</div>
```

### tei:pb
```
-> <span class="pb pageLocator" id="4r"><a href="#F_K-5_Bae_TB_8-002" id="pb_Bae_TB_8_121" style=""><img src="images/pageBreak.png" title="4r" style="display: none"></a></span>
```

### tei:div
```
-> <div class="div" id="div_Bae_TB_8_460" style="">...</div>
-> <div class="div diaryEntry" title="1905-01" id="div_Bae_TB_8_460" style="">...</div>
-> <div class="div chapter" title="2" id="div_Bae_TB_8_4010" style="">...</div>
```

### tei:head
```
-> <h5 class="head" id="head_Bae_TB_8_460" style="">...</div>

```

### tei:index
```
-> <a class="index" href="#reg_Bae_REG_Index_39" id="index_Bae_TB_8_233" style="">...</a>
```

### tei:orgName
```
-> <a class="org" href="#reg_Bae_REG_Org_310 id="org_Bae_TB_8_233" style="">...</a>
```

### tei:persName
```
-> <a class="person" href="#reg_Bae_REG_Person_390" id="person_Bae_TB_8_233" style="">...</a>
```

### tei:placeName
```
-> <a class="place" href="#reg_Bae_REG_Place_139" id="place_Bae_TB_8_233" style="">...</a>
```

### tei:ref
```
-> <a class="ref" href="https://anno.onb.ac.at/cgi-content/anno?aid=ptb&datum=19060116&seite=25&zoom=33" id="ref_Bae_TB_8_891" style="" target="_blank">...</a>
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
-> <span class="rdg" id="text_Bae_TB_8_137" style="display: none">...</span>
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

#### text is between tei:hi pos
```
-> <span class="hi letter-spacing ..." id="text_Bae_TB_8_1209" style="">...</span>
-> <span class="hi bold ..." id="text_Bae_TB_8_120" style="">...</span>
-> <span class="hi ul ..." id="text_Bae_TB_8_125" style="">...</span>

```
#### text
```
-> <span id="text_Bae_TB_8_123">...</span>
```

