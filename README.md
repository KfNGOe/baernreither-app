dev-baernreither-app

# docs

# git actions

- https://stackoverflow.com/questions/70231685/github-actions-run-server-frontend-then-execute-tests
- https://fleetdm.com/engineering/tips-for-github-actions-usability
- https://www.testmo.com/guides/github-actions-parallel-testing
- https://github.com/localtunnel/localtunnel
- https://fleetdm.com/engineering/tips-for-github-actions-usability

# Workflows
## Workflow texts
### conversion text xml to ttl
/tei/text/*.xml -> build_tei2ttl.sh -> *.ttl<br>

### conversion text ttl to json
*.ttl -> build_texts_ttl2json.sh -> *_all.json<br>

### build text data
*_all.json -> build_text_mdata.sh -> text_mdata.json

### build annotation levels
\*.ttl -> build_anno.sh -> build_anno\*.sh -> anno\*i.ttl
                                          -> anno*.json

### build annotation level for full texts
anno*i.ttl -> build_annoTextFull.sh -> annoTextFulli.ttl
                                    -> annoTextFull.json

### build full text json
*_all.json + annoTextFull.json -> build_textFull_json2json.sh -> *_full.json


## Workflow register
### convert xlsx to json
*.xlsx -> build_register_xlsx2json.sh -> register_*_xlsx.json<br>

### get geoname id's for places
register_place_xlsx.json -> build_gn.sh -> register_place_geo.json<br>

### build register entities from all ttl files 
/ttl/text/*.ttl -> build_register_texts_ttl2json.sh -> register_*_text.json<br>

### build register json tmp
register_*_xlsx.json + register_*_text.json + register_place_geo.json -> build_register_json.sh -> register_*_tmp.json<br>

### convert register tmp to xml
register_*_tmp.json -> build_register_json2tei.sh -> register_*.xml<br>

### convert register xml to ttl
register_*.xml -> build_register_tei2ttl.sh -> register_*.ttl<br>

### add id to register
register_*.ttl -> build_register_id_ttl2json.sh -> register_id.json
register_id.json + register_*_tmp.json -> build_register_id_json.sh -> register_*.json

### build anno levels of register
/ttl/text/*.ttl + register_*_.ttl -> build_annoRegister.sh  -> anno*.ttl
                                                            -> anno*.json


## Workflow search
### tokenize full texts
data/json/text/full/*_full.json -> build_ssTokenizer.sh -> ssTokens_tmp.json

### build all tokens
ssTokens_tmp.json -> build_ssTokenAll.sh -> tokenAll_tmp.json

### build stemms
tokenAll_tmp.json -> build_ssStems.sh   -> /stems/*.json
                                        -> ssTokenString.txt

## build complete search
data/json/text/full/*_full.json -> build_ssSearch_all.sh -> /stems/*.json
                                                    -> ssTokenString.txt


## Workflow html
### conversion texts all json to html
*_all.json + anno*.json -> build_textAll_json2html.sh -> data/txt/*_all_html.txt
                                         -> html/*_all.html

### convert register json to html 
data/json/text/full/*_full.json + register_*.json + anno*.json -> build_register_json2html.sh -> register_table_*.txt


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

