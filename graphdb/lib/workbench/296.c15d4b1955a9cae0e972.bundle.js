(window.webpackJsonp=window.webpackJsonp||[]).push([[296],{246:function(e,t){angular.module("graphdb.framework.rest.export.service",[]).factory("ExportRestService",n),n.$inject=["$http","$repositories","$translate"];function n(e,t,n){return{getExportedStatementsAsJSONLD:function(t,n,o,r,a){const i=`repositories/${n.id}/statements?infer=false`,s={location:n.location},c={accept:a.accept};Array.isArray(t)?s.context=t.map(e=>decodeURIComponent(e)):t&&(s.context=decodeURIComponent(o[t.value].exportUri));r&&(s.authToken=r);a.link&&""!==a.link&&(c.link=a.link);return e({url:i,method:"GET",params:s,headers:c,responseType:"blob"}).then((function(e){const t=e.data;let n=e.headers()["content-disposition"].split("filename=")[1];return n=n.substring(0,n.length),{data:t,filename:n}}))}}}}}]);