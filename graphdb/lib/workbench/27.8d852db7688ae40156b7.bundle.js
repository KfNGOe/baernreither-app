(window.webpackJsonp=window.webpackJsonp||[]).push([[27,77,140,236,250,251,253,295,325],{122:function(e,t,n){"use strict";n.r(t),n.d(t,"ContextType",(function(){return o})),n.d(t,"ContextTypes",(function(){return r}));class o{constructor(e,t){this.id=e,this.labelKey=t}static getAllType(){return[r.ALL,r.EXPLICIT,r.IMPLICIT]}static getContextType(e){return this.getAllType().find(t=>t.id===e)}}const r={ALL:new o("all","explore.explicit.implicit"),EXPLICIT:new o("explicit","explore.explicit"),IMPLICIT:new o("implicit","explore.implicit")}},127:function(e,t,n){"use strict";function o(e,t,n,o,r){e.JSONLDModes=[{name:"framed",link:"http://www.w3.org/ns/json-ld#framed"},{name:"expanded",link:"http://www.w3.org/ns/json-ld#expanded"},{name:"flattened",link:"http://www.w3.org/ns/json-ld#flattened"},{name:"compacted",link:"http://www.w3.org/ns/json-ld#compacted"}],e.JSONLDModesNames=e.JSONLDModes.reduce((function(e,t){return e[t.name]=t.name,e}),{}),e.JSONLDFramedModes=[e.JSONLDModesNames.framed],e.JSONLDContextModes=[e.JSONLDModesNames.compacted,e.JSONLDModesNames.flattened],e.defaultMode=e.JSONLDModes.find(e=>"expanded"===e.name),e.currentMode=e.defaultMode,e.link=null,e.fileFormat=r.toLowerCase(),e.setJSONLDSettingsToLocalStorage=function(e,t,r){n.set(o.JSONLD_EXPORT_SETTINGS,JSON.stringify({jsonldFormName:e,jsonldFormLink:t,jsonldLink:r}))},e.cancel=function(){t.dismiss()},e.reset=function(){e.currentMode=e.defaultMode,e.link="",e.setJSONLDSettingsToLocalStorage(e.currentMode.name,e.currentMode.link,e.link)},e.clearLinkInput=function(){e.link="",e.setJSONLDSettingsToLocalStorage(e.currentMode.name,e.currentMode.link,e.link)},e.exportJsonLD=function(){e.setJSONLDSettingsToLocalStorage(e.currentMode.name,e.currentMode.link,e.link),t.close({currentMode:e.currentMode,link:e.link})};!function(){const t=n.get(o.JSONLD_EXPORT_SETTINGS);t&&(e.currentMode=e.JSONLDModes.find(e=>e.name===t.jsonldFormName),e.link=t.jsonldLink)}()}n.r(t),n.d(t,"ExportSettingsCtrl",(function(){return o})),angular.module("graphdb.framework.core.components.export-settings-modal",["graphdb.framework.utils.localstorageadapter"]).controller("ExportSettingsCtrl",o),o.$inject=["$scope","$uibModalInstance","LocalStorageAdapter","LSKeys","format"]},143:function(e,t){angular.module("graphdb.workbench.utils.filetypes",[]).value("FileTypes",[{name:"JSON",translateKey:"download.as.json",type:"application/rdf+json",extension:".json"},{name:"JSON-LD",translateKey:"download.as.jsonld",type:"application/ld+json",extension:".jsonld"},{name:"NDJSON-LD",translateKey:"download.as.ndjsonld",type:"application/x-ld+ndjson",extension:".ndjsonld"},{name:"RDF-XML",translateKey:"download.as.rdfxml",type:"application/rdf+xml",extension:".rdf"},{name:"N3",translateKey:"download.as.n3",type:"text/rdf+n3",extension:".n3"},{name:"N-Triples",translateKey:"download.as.ntriples",type:"text/plain",extension:".nt"},{name:"N-Quads",translateKey:"download.as.nquads",type:"text/x-nquads",extension:".nq"},{name:"Turtle",translateKey:"download.as.turtle",type:"text/turtle",extension:".ttl"},{name:"Turtle*",translateKey:"download.as.turtlestar",type:"application/x-turtlestar",extension:".ttls"},{name:"TriX",translateKey:"download.as.trix",type:"application/trix",extension:".trix"},{name:"TriG",translateKey:"download.as.trig",type:"application/x-trig",extension:".trig"},{name:"TriG*",translateKey:"download.as.trigstar",type:"application/x-trigstar",extension:".trigs"},{name:"Binary RDF",translateKey:"download.as.binaryrdf",type:"application/x-binary-rdf",extension:".brf"}])},144:function(e,t,n){"use strict";n.r(t),n.d(t,"ResourceDetails",(function(){return o}));class o{constructor(){this.image=void 0,this.uri=void 0,this.label=void 0,this.encodeURI=void 0,this.comment=void 0,this.context=void 0}}},173:function(e,t){angular.module("graphdb.framework.rest.explore.rest.service",[]).factory("ExploreRestService",n),n.$inject=["$http"];function n(e){return{getResourceDetails:(t,n,o,r)=>e.get("rest/explore/details",{params:{uri:t,triple:n,context:o},headers:{Accept:r||"application/json"}}),getGraph:(t,n,o)=>e.get("rest/explore/graph",{params:{uri:t.uri,triple:t.triple,inference:t.contextType.id,role:t.role,bnodes:t.blanks,sameAs:t.sameAs,context:t.context},headers:{Accept:n||"application/x-graphdb-table-results+json",Link:o?"<"+o+">":""}}).then(e=>e.data)}}},174:function(e,t,n){"use strict";n.r(t),n.d(t,"ResourceInfo",(function(){return s}));var o=n(144),r=n(122);class s{constructor(){this.role="subject",this.uri=void 0,this.triple=void 0,this.context=void 0,this.contextType=r.ContextTypes.EXPLICIT,this.sameAs=!0,this.details=new o.ResourceDetails,this.blanks=!0}}},175:function(e,t,n){"use strict";n.r(t),n.d(t,"RoleType",(function(){return o}));const o={SUBJECT:"subject",PREDICATE:"predicate",OBJECT:"object",CONTEXT:"context",ALL:"all"}},244:function(e,t,n){"use strict";n.r(t);n(143),n(173);var o=n(548),r=n(0),s=n(174),a=n(122),i=n(175),c=n(89),l=n(19),u=n(644),p=n(127);function d(e,t,n,r,d,f,m,g,x,w,h,y,R,S){let T;e.ContextTypes=a.ContextTypes,e.contextTypes=a.ContextType.getAllType(),e.currentContextTypeId=a.ContextTypes.EXPLICIT.id,e.roles=[i.RoleType.SUBJECT,i.RoleType.PREDICATE,i.RoleType.OBJECT,i.RoleType.CONTEXT,i.RoleType.ALL],e.resourceInfo=void 0,e.isLoading=!1,e.fileTypes=w,e.toggleSameAs=()=>{e.resourceInfo.sameAs=!e.resourceInfo.sameAs,e.exploreResource()},e.getActiveRepository=()=>d.getActiveRepository(),e.isTripleResource=()=>!!e.resourceInfo.triple,e.encodeURIComponent=e=>encodeURIComponent(e),e.getRdfStarLocalNames=e=>{let t=e.slice();return e.replace(/[<>]+/g,"").split(" ").forEach(e=>{t=t.replace(e,m.getLocalName(e))}),t},e.getLocalName=e=>m.getLocalName(e);e.loadResource=()=>{S.getResourceDetails(e.resourceInfo.uri,e.resourceInfo.triple,e.resourceInfo.context).success(t=>{e.resourceInfo.details=t,e.resourceInfo.context=e.resourceInfo.details.context,"object"!==e.resourceInfo.uri&&(e.resourceInfo.details.encodeURI=encodeURIComponent(e.resourceInfo.details.uri))}).error(e=>n.error(y.instant("explore.error.resource.details",{data:getError(e)}))),e.exploreResource()},e.isContextAvailable=()=>null!==e.resourceInfo.context&&"http://rdf4j.org/schema/rdf4j#SHACLShapeGraph"===e.resourceInfo.context,e.goToGraphsViz=()=>{t.path("graphs-visualizations").search("uri",e.resourceInfo.uri)},e.exploreResource=()=>{I(!0),null!=r.context&&(e.resourceInfo.context=r.context),t.search("role",e.resourceInfo.role),t.replace(),O()},e.downloadExport=t=>{S.getGraph(e.resourceInfo,t.type).then(e=>{t.type.indexOf("json")>-1&&(e=JSON.stringify(e));const n=navigator.userAgent.toLowerCase();if(-1!==n.indexOf("safari")&&-1===n.indexOf("chrome"))window.open('data:attachment/csv;filename="statements.'+t.extension+'",'+encodeURIComponent(e),"statements."+t.extension);else{const n=new Blob([e],{type:t.type});Object(o.saveAs)(n,"statements"+t.extension)}}).catch(e=>{n.error(getError(e),y.instant("common.error"))}).finally(()=>{I(!1)})},e.openJSONLDExportSettings=function(t){f.open({templateUrl:"js/angular/core/components/export-settings-modal/exportSettingsModal.html",controller:p.ExportSettingsCtrl,size:"lg",scope:e,resolve:{format:function(){return t.name}}}).result.then((function(n){e.downloadJSONLDExport(t,n.link,n.currentMode)}))},e.downloadJSONLDExport=function(t,r,s){S.getGraph(e.resourceInfo,t.type,r).then((async function(e){if("JSON"===t.name&&(e=JSON.stringify(e)),"JSON-LD"===t.name)switch(s.name){case"expanded":e=await u.expand(e),e=JSON.stringify(e);break;case"flattened":e=await u.flatten(e,r),e=JSON.stringify(e);break;case"compacted":e=await u.compact(e,r),e=JSON.stringify(e);break;case"context":e=await u.context(e,r),e=JSON.stringify(e);break;case"frame":e=await u.frame(e,r),e=JSON.stringify(e);break;case"framed":e=await u.compact(e,r),e=JSON.stringify(e)}const n=navigator.userAgent.toLowerCase();if(-1!==n.indexOf("safari")&&-1===n.indexOf("chrome"))window.open('data:attachment/csv;filename="statements.'+t.extension+'",'+encodeURIComponent(e),"statements."+t.extension);else{const n=new Blob([e],{type:t.type});Object(o.saveAs)(n,"statements"+t.extension)}})).catch((function(e){const t=getError(e);n.error(t,y.instant("common.error"))}))},e.changeRole=t=>{e.resourceInfo.role=t,e.resourceInfo.role===i.RoleType.CONTEXT&&(e.resourceInfo.contextType=a.ContextTypes.EXPLICIT),e.exploreResource()},e.changeInference=t=>{e.resourceInfo.contextType=a.ContextType.getContextType(t),e.exploreResource()},e.copyToClipboardResult=e=>{g.openCopyToClipboardModal(e)};const v=()=>{var n;e.resourceInfo||(e.resourceInfo=new s.ResourceInfo,n=e.resourceInfo,r.prefix&&r.localName&&T[r.prefix]?n.uri=T[r.prefix]+r.localName:t.search().uri?n.uri=t.search().uri+(t.hash()?"#"+t.hash():""):t.search().triple?n.triple=t.search().triple+(t.hash()?"#"+t.hash():""):n.uri=t.absUrl(),n.uri=n.uri&&n.uri.replace(/<|>/g,""),null!=r.context&&(e.resourceInfo.context=r.context),e.resourceInfo.role=t.search().role?t.search().role:i.RoleType.SUBJECT)},I=t=>{e.isLoading=!!t},b=()=>({showEditorTabs:!1,showToolbar:!1,showResultTabs:!1,showResultInfo:!0,downloadAsOn:!1,showQueryButton:!1,componentId:"resource-view-component",prefixes:T,maxPersistentResponseSize:0,render:c.RenderingMode.YASR,showYasqeActionButtons:!1,yasqeActionButtons:l.DISABLE_YASQE_BUTTONS_CONFIGURATION}),O=()=>{S.getGraph(e.resourceInfo).then(t=>{((t={})=>{const n={};angular.extend(n,e.yasguiConfig||b(),t),e.yasguiConfig=n})({sparqlResponse:t})}).catch(e=>{n.error(y.instant("explore.error.resource",{data:getError(e)}))}).finally(()=>{I(!1)})},E=t=>{e.resourceInfo.contextType=t.appSettings.DEFAULT_INFERENCE&&!e.resourceInfo.role===i.RoleType.CONTEXT?a.ContextTypes.ALL:a.ContextTypes.EXPLICIT,e.resourceInfo.sameAs=t.appSettings.DEFAULT_INFERENCE&&t.appSettings.DEFAULT_SAMEAS};e.$on("$destroy",()=>{N.forEach(e=>e())});const N=[];N.push(e.$watch((function(){return e.getActiveRepositoryObject()}),(function(t){t&&Promise.all([h.getPrincipal(),d.getPrefixes(d.getActiveRepository())]).then(([t,n])=>{v(),E(t),T=n,e.loadResource()}).catch(e=>{n.error(y.instant("get.namespaces.error.msg",{error:getError(e)}))})})))}function f(e,t,n,o,s,a,i,c,l,u,p,d){function f(){c.checkAutocompleteStatus().success((function(t){if(!t){const e=Object(r.decodeHTML)(d.instant("explore.autocomplete.warning.msg"));i.warning("",`<div class="autocomplete-toast"><a href="autocomplete">${e}</a></div>`,{allowHtml:!0})}e.autocompleteEnabled=t})).error((function(){i.error(d.instant("explore.error.autocomplete"))}))}function m(){p.getNamespaces(o.getActiveRepository()).success((function(t){e.namespaces=t.results.bindings.map((function(e){return{prefix:e.prefix.value,uri:e.namespace.value}})),e.loader=!1})).error((function(t){const n=getError(t);i.error(n,d.instant("common.error")),e.loader=!1}))}function g(e){const t=e.indexOf("<")>=0&&e.lastIndexOf(">")===e.length-1,n=-1===e.indexOf("<")&&-1===e.lastIndexOf(">"),o=/^<?[http|urn].*>?$/.test(e)&&(t||n);let r=!1;if(o)if(e.indexOf("http")>=0){const t=e.indexOf("//");r=t>4&&e.substring(t+2).length>0}else e.indexOf("urn")>=0&&(r=e.substring(4).length>0);return o&&r}let x,w;function h(t){function o(t){a((function(){e.form&&(e.form.$dirty=t)}))}t||(t=document.getElementById("resources_finder_value").value),t&&g(t)?(o(!1),n.path("resource").search("uri",t)):(o(!0),t&&i.error(d.instant("explore.error.invalid.input")))}e.submit=h,e.getAutocompleteSuggestions=function(t){if(!/<|>/.test(t)&&":"===t.slice(-1)){const n=l.getNamespaceUriForPrefix(e.namespaces,t.slice(0,-1));w=n!==w?n:w,w&&$("#resources_finder_value").val(w)}let n;if(e.autocompleteEnabled){const e=t.replace(w,w+";");n=c.getAutocompleteSuggestions(e)}else n=s.when(e.autocompleteEnabled);return n},e.inputChangedFn=function(){x=document.getElementById("resources_finder_value").value,e.form.$dirty=!(x&&g(x))},e.selectedUriCallback=function(t){e.selectedUri={name:t.title},h(e.selectedUri.name)},e.selectedUri={name:""},e.autocompleteEnabled=!1,angular.isDefined(u.search)&&a((function(){$("#resources_finder_value").val(u.search),$(".search-button").click()}),500),e.getActiveRepository()&&(f(),m()),e.$on("repositoryIsSet",(function(){f(),m()}))}function m(e,t,n,o,r,s,a,i,c,l,u){e.uriParam=n.search().uri,e.newRow={subject:e.uriParam,object:{type:"uri",datatype:""}},e.newResource=!1,e.datatypeOptions=c.getDatatypeOptions(),e.activeRepository=function(){return r.getActiveRepository()},e.getClassInstancesDetails=function(){l.getNamespaces(e.activeRepository()).success((function(t){e.namespaces=t.results.bindings.map((function(e){return{prefix:e.prefix.value,uri:e.namespace.value}})),e.loader=!1})).error((function(t){const n=getError(t);o.error(n,u.instant("common.error")),e.loader=!1})),i.getDetails(e.uriParam).success((function(t){e.details=t,e.details.encodeURI=encodeURIComponent(e.details.uri)})).error((function(e){o.error(u.instant("explore.error.resource.details",{data:getError(e)}))})),i.getGraph(e.uriParam).then((function(t){const n=c.buildStatements(t,e.uriParam);e.statements=n,e.newResource=!n.length}))},e.addStatement=function(){e.newRowPredicate.$setSubmitted(),e.newRowObject.$setSubmitted(),e.newRowContext.$setSubmitted(),e.newRowPredicate.$valid&&e.newRowObject.$valid&&e.newRowContext.$valid&&(e.statements.push(_.cloneDeep(e.newRow)),e.newRow={subject:e.uriParam,object:{type:"uri",datatype:""}},e.newRowPredicate.$setPristine(),e.newRowPredicate.$setUntouched(),e.newRowObject.$setPristine(),e.newRowObject.$setUntouched(),e.newRowContext.$setPristine(),e.newRowContext.$setUntouched())},e.removeStatement=function(t){e.statements.splice(t,1)},e.getLocalName=function(e){return i.getLocalName(e)},e.checkValid=function(e){if(!angular.isUndefined(e))return!0;return u.instant("explore.validation")},e.validEditRow=function(){return e.rowform.$valid},e.viewTrig=function(){s.open({templateUrl:"js/angular/explore/templates/viewTrig.html",controller:"ViewTrigCtrl",size:"lg",resolve:{data:function(){return c.transformToTrig(e.statements)}}})},e.save=function(){const r=e.newResource?"POST":"PUT";t({method:r,url:"rest/resource?uri="+encodeURIComponent(e.uriParam),headers:{"Content-Type":"application/x-trig"},data:c.transformToTrig(e.statements)}).success((function(){o.success(u.instant("explore.resource.saved"));const t=a((function(){n.path("resource").search("uri",e.uriParam)}),500);e.$on("$destroy",(function(){a.cancel(t)}))})).error((function(e){o.error(getError(e))}))},e.$watch((function(){return r.getActiveRepository()}),(function(){e.activeRepository()&&e.getClassInstancesDetails()})),e.validateUri=function(t){let n=!0;const o=t||"";if(-1===o.indexOf(":"))n=!1;else{const t=o.substring(0,o.indexOf(":"));if(""===i.getNamespaceUriForPrefix(e.namespaces,t)){!1===/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(o)&&(n=!1);const e=o.match(/\//g);(void 0===e||e.length<3)&&(n=!1)}else{o.substring(o.indexOf(":")+1).trim().length<1&&(n=!1)}}return n}}function g(e,t,n){e.trig=n,e.cancel=function(){t.dismiss("cancel")}}angular.module("graphdb.framework.explore.controllers",["ngCookies","ngRoute","ui.bootstrap","toastr","graphdb.framework.core","graphdb.framework.core.services.repositories","graphdb.framework.explore.services","graphdb.workbench.utils.filetypes","graphdb.framework.rest.explore.rest.service"]).controller("FindResourceCtrl",f).controller("ExploreCtrl",d).controller("EditResourceCtrl",m).controller("ViewTrigCtrl",g),d.$inject=["$scope","$location","toastr","$routeParams","$repositories","$uibModal","ClassInstanceDetailsService","ModalService","RDF4JRepositoriesRestService","FileTypes","$jwtAuth","$translate","$q","ExploreRestService"],f.$inject=["$scope","$http","$location","$repositories","$q","$timeout","toastr","AutocompleteRestService","ClassInstanceDetailsService","$routeParams","RDF4JRepositoriesRestService","$translate"],m.$inject=["$scope","$http","$location","toastr","$repositories","$uibModal","$timeout","ClassInstanceDetailsService","StatementsService","RDF4JRepositoriesRestService","$translate"],g.$inject=["$scope","$uibModalInstance","data"]},547:function(e,t){(function(t){e.exports=t}).call(this,{})},548:function(e,t,n){var o,r=r||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r=e.webkitRequestFileSystem,s=e.requestFileSystem||r||e.mozRequestFileSystem,a=function(t){(e.setImmediate||e.setTimeout)((function(){throw t}),0)},i=0,c=function(t){var o=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()};e.chrome?o():setTimeout(o,500)},l=function(e,t,n){for(var o=(t=[].concat(t)).length;o--;){var r=e["on"+t[o]];if("function"==typeof r)try{r.call(e,n||e)}catch(e){a(e)}}},u=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e},p=function(t,a){t=u(t);var p,d,f,m=this,g=t.type,x=!1,w=function(){l(m,"writestart progress write writeend".split(" "))},h=function(){(!x&&p||(p=n().createObjectURL(t)),d)?d.location.href=p:null==e.open(p,"_blank")&&"undefined"!=typeof safari&&(e.location.href=p);m.readyState=m.DONE,w(),c(p)},y=function(e){return function(){if(m.readyState!==m.DONE)return e.apply(this,arguments)}},R={create:!0,exclusive:!1};if(m.readyState=m.INIT,a||(a="download"),o)return p=n().createObjectURL(t),o.href=p,o.download=a,void setTimeout((function(){var e,t;e=o,t=new MouseEvent("click"),e.dispatchEvent(t),w(),c(p),m.readyState=m.DONE}));e.chrome&&g&&"application/octet-stream"!==g&&(f=t.slice||t.webkitSlice,t=f.call(t,0,t.size,"application/octet-stream"),x=!0),r&&"download"!==a&&(a+=".download"),("application/octet-stream"===g||r)&&(d=e),s?(i+=t.size,s(e.TEMPORARY,i,y((function(e){e.root.getDirectory("saved",R,y((function(e){var n=function(){e.getFile(a,R,y((function(e){e.createWriter(y((function(n){n.onwriteend=function(t){d.location.href=e.toURL(),m.readyState=m.DONE,l(m,"writeend",t),c(e)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&h()},"writestart progress write abort".split(" ").forEach((function(e){n["on"+e]=m["on"+e]})),n.write(t),m.abort=function(){n.abort(),m.readyState=m.DONE},m.readyState=m.WRITING})),h)})),h)};e.getFile(a,{create:!1},y((function(e){e.remove(),n()})),y((function(e){e.code===e.NOT_FOUND_ERR?n():h()})))})),h)})),h)):h()},d=p.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t){return navigator.msSaveOrOpenBlob(u(e),t)}:(d.abort=function(){this.readyState=this.DONE,l(this,"abort")},d.readyState=d.INIT=0,d.WRITING=1,d.DONE=2,d.error=d.onwritestart=d.onprogress=d.onwrite=d.onabort=d.onerror=d.onwriteend=null,function(e,t){return new p(e,t)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */e.exports?e.exports.saveAs=r:null!==n(552)&&null!=n(547)&&(void 0===(o=function(){return r}.apply(t,[]))||(e.exports=o))},552:function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},649:function(e,t){},89:function(e,t,n){"use strict";n.r(t),n.d(t,"RenderingMode",(function(){return o}));const o={YASGUI:"mode-yasgui",YASQE:"mode-yasqe",YASR:"mode-yasr"}}}]);