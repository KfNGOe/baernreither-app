(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{108:function(t,e,n){"use strict";n.r(e);n(4),n(14);const r="UPLOADING",i="PENDING",s="ERROR",a="DONE",o="NONE",l=angular.module("graphdb.framework.impex.import.controllers",["ui.bootstrap","toastr","graphdb.framework.core.services.repositories","graphdb.framework.utils.uriutils","graphdb.framework.guides.services"]);l.controller("CommonCtrl",["$scope","$http","toastr","$interval","$repositories","$modal","$filter","$jwtAuth","$location","$translate","LicenseRestService","GuidesService",function(t,e,n,r,i,o,l,c,u,p,f,m){t.files=[],t.fileChecked={},t.checkAll=!1,t.popoverTemplateUrl="settingsPopoverTemplate.html",t.fileQuery="",t.getAppData=function(){f.getInfo().success((function(e){t.appData={},t.appData.properties={};for(let n=0;n<e.length;n++)t.appData.properties[e[n].key]={source:e[n].source,value:e[n].value};t.maxUploadFileSizeMB=t.appData.properties["graphdb.workbench.maxUploadSize"].value/1048576})).error((function(t){const e=getError(t);n.error(e,p.instant("common.error"))}))},t.getAppData(),t.fileFormats=["ttl","ttls","rdf","rj","n3","nt","nq","trig","trigs","trix","brf","owl","jsonld"];{const e=_.map(t.fileFormats,(function(t){return"."+t+".gz"})),n=_.map(t.fileFormats,(function(t){return"."+t}));t.fileFormatsExtended=_.reduce(_.union(e,n,[".zip"]),(function(t,e){return t+", "+e})),t.fileFormatsHuman=_.reduce(n,(function(t,e){return t+" "+e}))+p.instant("import.gz.zip"),t.textFileFormatsHuman=_.reduce(_.filter(n,(function(t){return".brf"!==t})),(function(t,e){return t+" "+e}))}t.updateListHttp=function(r){e({method:"GET",url:t.getBaseUrl()}).success((function(e){0===t.files.length||r?(t.files=e,_.forEach(t.files,(function(e){e.type||(e.type=t.defaultType)})),t.rebatch()):t.files.forEach((function(n){const r=_.find(e,_.matches({name:n.name}));n.status&&r&&_.assign(n,r),n.type||(n.type=t.defaultType)})),r&&"user"===t.viewType&&(t.files=_.filter(t.files,(function(t){return void 0!==t.status}))),t.showClearStatuses=_.filter(t.files,(function(t){return t.status===a||t.status===s})).length>0,t.savedSettings=_.mapKeys(_.filter(t.files,"parserSettings"),"name"),t.loader=!1})).error((function(e){n.warning(p.instant("import.error.could.not.get.files",{data:getError(e)})),t.loader=!1}))},t.$watch((function(){return $(t.tabId).is(":visible")}),(function(){$(t.tabId).is(":visible")&&(t.updateListHttp(!1),u.hash(t.viewType))})),t.updateList=function(e){t.canWriteActiveRepo()&&$(t.tabId).is(":visible")&&t.updateListHttp(e)},t.init=function(){t.setRestricted(),t.isRestricted||(t.updateList(!0),t.getSettings())},t.$on("repositoryIsSet",t.init),t.pullList=function(){const e=r((function(){t.updating||t.updateList(!1)}),4e3);t.$on("$destroy",(function(){r.cancel(e)}))},t.getVisibleFiles=function(){return l("filter")(t.files,{name:t.fileQuery,type:t.getTypeFilter()})},t.getTypeFilter=function(){return"server"!==t.viewType||"file"!==t.showItems&&"directory"!==t.showItems?"":t.showItems},t.selectAllFiles=function(){t.getVisibleFiles().forEach((function(e){t.fileChecked[e.name]=t.checkAll&&t.importable(e)}))},t.getSettingsFor=function(e,n){return n||_.isEmpty(e)||_.isEmpty(t.savedSettings[e])?angular.copy(t.defaultSettings):t.savedSettings[e]},t.setSettingsFor=function(e,n){t.settingsFor=e,t.settings=t.getSettingsFor(e,n);const r={templateUrl:"js/angular/import/templates/settingsModal.html",controller:"SettingsModalCtrl",resolve:{settings:function(){return angular.copy(t.settings)},hasParserSettings:t.isLocalLocation,defaultSettings:function(){return t.defaultSettings},isMultiple:function(){return!e}},size:"lg"};m.isActive()&&(r.backdrop="static",r.keyboard=!1);o.open(r).result.then((function(e){t.settings=e,""===t.settingsFor?t.importSelected():t.importFile(t.settingsFor,!0)}),(function(e){t.settings=e}))},t.updateImport=function(e,n){t.settingsFor=e,t.settings=t.getSettingsFor(e,n),t.importFile(e,!1)},t.stopImport=function(r){e({method:"DELETE",url:t.getBaseUrl(),params:{name:r.name,type:r.type}}).success((function(){t.updateList()})).error((function(t){n.warning(p.instant("import.error.could.not.stop",{data:getError(t)}))}))},t.importable=function(){return!0},t.hasImportable=function(){return _.filter(t.files,(function(e){return t.importable(e)})).length>0},t.showTable=function(){const e=t.files.length>0&&("user"===t.viewType||"server"===t.viewType);return t.checkAll&&t.switchBatch(!0),e},t.switchBatch=function(e){e?t.selectAllFiles():t.checkAll&&(t.checkAll=!1),t.batch=_.map(_.filter(t.files,(function(e){return t.fileChecked[e.name]&&t.importable(e)})),"name").length>0},t.rebatch=function(){const e={};t.batch=!1,_.each(t.files,(function(n){e[n.name]=t.fileChecked[n.name],t.batch|=t.fileChecked[n.name]})),t.batch||(t.checkAll=!1),t.fileChecked=e},t.getSelectedFiles=function(){return _.map(_.filter(t.getVisibleFiles(),(function(e){return t.fileChecked[e.name]&&t.importable(e)})),"name")},t.importSelected=function(e){const n=t.getSelectedFiles(),r=function(){const i=n.shift();i&&(e&&(t.settings=t.getSettingsFor(i)),t.importFile(i,!0,r))};r()};const d=function(r,i){e({method:"DELETE",url:t.getBaseUrl()+"/status",params:{remove:i},data:r,headers:{"Content-type":"application/json;charset=utf-8"}}).success((function(){t.updateList(!0)})).error((function(t){n.warning(p.instant("import.error.could.not.clear",{data:getError(t)}))}))};t.resetStatus=function(t){d(t,!1)},t.resetStatusSelected=function(){t.resetStatus(t.getSelectedFiles())},t.removeEntry=function(t){d(t,!0)},t.removeEntrySelected=function(){t.removeEntry(t.getSelectedFiles())},t.isLocalLocation=function(){const t=i.getActiveLocation();return t&&t.local},t.filterSettings=function(e){let n=_.omitBy(t.savedSettings[e],_.isNull);return n=_.omit(n,["repoLocationHash","status","message","name","data","type","format","fileNames","$$hashKey"]),_.map(_.keys(n),(function(t){return[t,n[t]]}))},t.getSettings=function(){t.canWriteActiveRepo()&&e({method:"GET",url:"rest/repositories/"+i.getActiveRepository()+"/import/settings/default"}).success((function(e){t.defaultSettings=e})).error((function(t){n.warning(p.instant("import.error.default.settings",{data:getError(t)}))}))},t.getBaseUrl=function(){return"rest/repositories/"+i.getActiveRepository()+"/import/"+t.viewUrl},t.pritifySettings=function(t){return JSON.stringify(t,null," ")},t.toTitleCase=function(t){return t?_.upperFirst(t.toLowerCase()):t}}]),l.controller("ImportCtrl",["$scope","$http","toastr","$controller",function(t,e,n,r){t.loader=!0,angular.extend(this,r("CommonCtrl",{$scope:t})),t.viewUrl="server",t.defaultType="server",t.tabId="#import-server",t.showItems="all",t.pullList();const i=function(r,i){t.canWriteActiveRepo()&&e({method:"POST",url:t.getBaseUrl(),data:{importSettings:i?null:t.settings,fileNames:r}}).success((function(){t.updateList(),t.batch=!1,t.fileChecked={}})).error((function(t){n.error($translate.instant("import.could.not.send.file",{data:getError(t)}))}))};t.importSelected=function(e){const n=t.getSelectedFiles();i(n,e)},t.importFile=function(t){i([t])},t.init()}]),l.controller("UploadCtrl",["$scope","Upload","$http","toastr","$controller","$modal","$translate",function(t,e,n,a,l,c,u){t.loader=!0,angular.extend(this,l("CommonCtrl",{$scope:t})),t.viewUrl="upload",t.defaultType="file",t.tabId="#import-user",t.pullList(),t.currentFiles=[],t.importable=function(){return!0},t.fileSelected=function(t,e,n,r,i){i.length>0&&i.forEach((function(t){a.warning(u.instant("import.large.file",{name:t.name,size:Math.floor(t.size/1048576)}))}))},t.$watchCollection("currentFiles",(function(){t.currentFiles&&t.currentFiles.forEach((function(e){if("bz2"===e.name.substr(e.name.lastIndexOf(".")+1)){const n=t.currentFiles.indexOf(e);n>-1&&t.currentFiles.splice(n,1),a.error(u.instant("import.could.not.upload",{name:e.name}))}})),t.files=_.uniqBy(_.union(_.map(t.currentFiles,(function(t){return{name:t.name,type:"file",file:t}})),t.files),(function(t){return t.name})),t.savedSettings=_.mapKeys(_.filter(t.files,"parserSettings"),"name"),_.each(t.currentFiles,(function(e){t.updateImport(e.name)}))})),t.importFile=function(o,l,c){const p=_.findIndex(t.files,{name:o});if(p<0)a.warning(u.instant("import.no.such.file",{name:o}));else{const o=t.files[p];if("text"===o.type)t.settings.name=o.name,t.settings.type=o.type,t.settings.data=o.data,t.settings.format=o.format,o.status=i,n({method:"POST",url:t.getBaseUrl()+(l?"":"/update")+"/text",data:t.settings}).success((function(){t.updateList()})).error((function(t){a.error(u.instant("import.could.not.send.data",{data:getError(t)})),o.status=s,o.message=getError(t)})).finally(c||function(){});else if("url"===o.type)t.settings.name=o.name,t.settings.type=o.type,t.settings.data=o.data,t.settings.format=o.format,o.status=i,n({method:"POST",url:t.getBaseUrl()+(l?"":"/update")+"/url",data:t.settings}).success((function(){t.updateList()})).error((function(t){a.error(u.instant("import.could.not.send.url",{data:getError(t)}))})).finally(c||function(){});else{let n;t.settings.name=o.name,n=o.file?{file:o.file,importSettings:e.jsonBlob(t.settings)}:{importSettings:e.jsonBlob(t.settings)},e.upload({url:t.getBaseUrl()+(l?"":"/update")+"/file",data:n}).progress((function(t){if(o.file?(o.file=null,o.status=r):o.status!==r&&(o.status=i),o.status===r){const e=parseInt(100*t.loaded/t.total);o.message=e+"% uploaded"}})).success((function(){t.updateList()})).error((function(t){a.error(u.instant("import.could.not.upload.file",{data:getError(t)})),o.status=s,o.message=getError(t)})).finally(c||function(){})}}},t.updateTextImport=function(e){t.updating=!0,n({method:"POST",url:t.getBaseUrl()+"/update/text",data:e}).success((function(t){})).error((function(t){a.error(u.instant("import.could.not.update.text",{data:getError(t)}))})).finally((function(){t.updating=!1}))},t.pastedDataIdx=1;const p=function(){const t=new Date;return t.getFullYear()+"-"+_.padStart(t.getMonth()+1,2,"0")+"-"+_.padStart(t.getDate(),2,"0")+" "+_.padStart(t.getHours(),2,"0")+":"+_.padStart(t.getMinutes(),2,"0")+":"+_.padStart(t.getSeconds(),2,"0")+"."+_.padStart(t.getMilliseconds(),3,"0")};t.pasteData=function(e){e&&e.data;c.open({templateUrl:"js/angular/import/templates/textSnippet.html",controller:"TextCtrl",resolve:{text:function(){return e?e.data:""},format:function(){return e?e.format:"text/turtle"}}}).result.then((function(n){e?(e.data===n.text&&e.format===n.format||e.status===o||(e.status=o,e.message=u.instant("import.text.snippet.not.imported")),e.data=n.text,e.format=n.format,t.updateTextImport(e)):(e={type:"text",name:"Text snippet "+p(),format:n.format,data:n.text},t.files.unshift(e),t.updateImport(e.name)),n.startImport&&t.setSettingsFor(e.name)}))},t.rdfDataFromURL=function(){c.open({templateUrl:"js/angular/import/templates/urlImport.html",controller:"UrlCtrl",scope:t}).result.then((function(e){const n=_.find(t.files,{type:"url",name:e.url});n?n.format=e.format:t.files.unshift({type:"url",name:e.url,format:e.format,data:e.url}),t.updateImport(e.url,!0),e.startImport&&t.setSettingsFor(e.url,!0)}))},t.init()}]),l.controller("UrlCtrl",["$scope","$modalInstance","toastr",function(t,e){t.importFormat={name:"Auto",type:""},t.startImport=!0,t.cancel=function(){e.dismiss()},t.ok=function(){e.close({url:t.dataUrl,format:t.importFormat.type,startImport:t.startImport})}}]),l.controller("TextCtrl",["$scope","$modalInstance","text","format",function(t,e,n,r){t.importFormats=[{name:"RDF/JSON",type:"application/rdf+json"},{name:"JSON-LD",type:"application/ld+json"},{name:"RDF/XML",type:"application/rdf+xml"},{name:"N3",type:"text/rdf+n3"},{name:"N-Triples",type:"text/plain"},{name:"N-Quads",type:"text/x-nquads"},{name:"Turtle",type:"text/turtle"},{name:"Turtle*",type:"application/x-turtlestar"},{name:"TriX",type:"application/trix"},{name:"TriG",type:"application/x-trig"},{name:"TriG*",type:"application/x-trigstar"}],t.rdfText=n,t.importFormat=_.find(t.importFormats,{type:r}),t.startImport=!0,t.setFormat=function(e){t.importFormat=e},t.cancel=function(){e.dismiss()},t.ok=function(){e.close({text:t.rdfText,format:t.importFormat.type,startImport:t.startImport})}}]),l.controller("TabCtrl",["$scope","$location",function(t,e){t.viewType=e.hash(),"user"!==t.viewType&&"server"!==t.viewType&&(t.viewType="user"),t.isCollapsed=!1,"user"===t.viewType?t.templateUrl="js/angular/import/templates/uploadInfo.html":t.templateUrl="js/angular/import/templates/importInfo.html",t.changeHelpTemplate=function(e){t.templateUrl="js/angular/import/templates/"+e},t.commonUrl="js/angular/import/templates/commonInfo.html"}]),l.controller("SettingsModalCtrl",["$scope","$modalInstance","toastr","UriUtils","settings","hasParserSettings","defaultSettings","isMultiple","$translate",function(t,e,n,r,i,s,a,o,l){t.hasError=function(t,e){return _.find(t,(function(t){return e===t.$name}))},t.settings=i,t.hasParserSettings=s,t.settings.context?"default"===t.settings.context?(t.target="default",t.settings.context=""):t.target="named":t.target="data",t.isMultiple=o,t.enableReplace=!(!t.settings.replaceGraphs||!t.settings.replaceGraphs.length);const c=function(){"default"===t.target?t.settings.context="default":"data"===t.target&&(t.settings.context=""),t.enableReplace?"default"!==t.target&&"named"!==t.target||(t.settings.replaceGraphs=[t.settings.context]):t.settings.replaceGraphs=[]};t.ok=function(){t.settingsForm.replaceGraph.$setValidity("replaceGraph",!0),t.settingsForm.$valid&&(c(),e.close(t.settings))},t.cancel=function(){c(),e.dismiss(t.settings)},t.reset=function(){t.settings=angular.copy(a),t.target="data"},t.addReplaceGraph=function(e){let i=!0;"default"!==e&&(i=r.isValidIri(e)),t.settingsForm.replaceGraph.$setTouched(),t.settingsForm.replaceGraph.$setValidity("replaceGraph",i),t.settingsForm.replaceGraph.$valid&&(t.settings.replaceGraphs=t.settings.replaceGraphs||[],-1===_.indexOf(t.settings.replaceGraphs,e)?(t.replaceGraph="",t.settings.replaceGraphs.push(e)):n.warning(l.instant("import.graph.already.in.list")))},t.checkEnterReplaceGraph=function(e,n){13===e.keyCode&&(e.preventDefault(),t.addReplaceGraph(n))},t.showAdvancedSettings=!1,t.switchParserSettings=function(){t.showAdvancedSettings=!t.showAdvancedSettings}}])}}]);
//# sourceMappingURL=9.7bdbee8225f687ec81bc.bundle.js.map