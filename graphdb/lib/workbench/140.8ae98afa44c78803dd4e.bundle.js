(window.webpackJsonp=window.webpackJsonp||[]).push([[140],{127:function(e,n,o){"use strict";function t(e,n,o,t,r){e.JSONLDModes=[{name:"framed",link:"http://www.w3.org/ns/json-ld#framed"},{name:"expanded",link:"http://www.w3.org/ns/json-ld#expanded"},{name:"flattened",link:"http://www.w3.org/ns/json-ld#flattened"},{name:"compacted",link:"http://www.w3.org/ns/json-ld#compacted"}],e.JSONLDModesNames=e.JSONLDModes.reduce((function(e,n){return e[n.name]=n.name,e}),{}),e.JSONLDFramedModes=[e.JSONLDModesNames.framed],e.JSONLDContextModes=[e.JSONLDModesNames.compacted,e.JSONLDModesNames.flattened],e.defaultMode=e.JSONLDModes.find(e=>"expanded"===e.name),e.currentMode=e.defaultMode,e.link=null,e.fileFormat=r.toLowerCase(),e.setJSONLDSettingsToLocalStorage=function(e,n,r){o.set(t.JSONLD_EXPORT_SETTINGS,JSON.stringify({jsonldFormName:e,jsonldFormLink:n,jsonldLink:r}))},e.cancel=function(){n.dismiss()},e.reset=function(){e.currentMode=e.defaultMode,e.link="",e.setJSONLDSettingsToLocalStorage(e.currentMode.name,e.currentMode.link,e.link)},e.clearLinkInput=function(){e.link="",e.setJSONLDSettingsToLocalStorage(e.currentMode.name,e.currentMode.link,e.link)},e.exportJsonLD=function(){e.setJSONLDSettingsToLocalStorage(e.currentMode.name,e.currentMode.link,e.link),n.close({currentMode:e.currentMode,link:e.link})};!function(){const n=o.get(t.JSONLD_EXPORT_SETTINGS);n&&(e.currentMode=e.JSONLDModes.find(e=>e.name===n.jsonldFormName),e.link=n.jsonldLink)}()}o.r(n),o.d(n,"ExportSettingsCtrl",(function(){return t})),angular.module("graphdb.framework.core.components.export-settings-modal",["graphdb.framework.utils.localstorageadapter"]).controller("ExportSettingsCtrl",t),t.$inject=["$scope","$uibModalInstance","LocalStorageAdapter","LSKeys","format"]}}]);