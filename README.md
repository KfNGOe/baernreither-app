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
-> <a class="anchor comp-equal" href="#comp_Bae_MF_6-2_2050" id="comp_Bae_TB_8_130" style="">...</a>

-> <a class="anchor comp-inequal" href="#comp_Bae_MF_6-2_2081" id="comp_Bae_TB_8_153" style="">...</a>

-> <a class="anchor comp-not" href="#comp_Bae_MF_6-2_2061" id="comp_Bae_TB_8_140" style="">...</a>

-> <a class="anchor" href="#" id="comp_Bae_TB_8_140" style="">...</a>
```

### tei:note
```
-> <div class="note editorial" id="note_Bae_TB_8_388" style="">...</div>
```

### tei:p
```
-> <p class="p" id="p_Bae_TB_8_388" style="">...</div>
```

### tei:pb
```
-> <span class="pb" id="4r"><a href="#facs_F_K-5_Bae_TB_8-002" id="pb_Bae_TB_8_121" style=""><img src="images/pageBreak.png" title="4r" style="display: none"></a>
```

### tei:div
```
-> <div class="div diaryEntry" id="div_Bae_TB_8_460" style="">...</div>
-> <div class="div chapter" id="div_Bae_TB_8_4010" style="">...</div>
```

### tei:head
```
-> <h5 class="head" id="head_Bae_TB_8_460" style="">...</div>

```

### tei:index
```
-> <a class="index" href="#index_Bae_REG_Index_39" id="index_Bae_TB_8_233" style="">...</a>
```

### tei:orgName
```
-> <a class="index" href="#index_Bae_REG_Org_310 id="index_Bae_TB_8_233" style="">...</a>
```

### tei:persName
```
-> <a class="index" href="#index_Bae_REG_Person_390" id="index_Bae_TB_8_233" style="">...</a>
```

### tei:placeName
```
-> <a class="index" href="#index_Bae_REG_Place_139" id="index_Bae_TB_8_233" style="">...</a>
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

