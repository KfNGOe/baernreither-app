(window.webpackJsonp=window.webpackJsonp||[]).push([[302],{103:function(e,r){angular.module("graphdb.framework.rest.similarity.service",[]).factory("SimilarityRestService",t),t.$inject=["$http","$repositories"];function t(e){return{getIndexes:function(r,t){if(r)return e.get("rest/similarity",{headers:{"X-GraphDB-Repository":r,"X-GraphDB-Repository-Location":t}});return e.get("rest/similarity")},getSearchQueries:function(){return e.get("rest/similarity/config")},rebuildIndex:function(e){return r("PUT",e.name,e.options,e.selectQuery,e.searchQuery,e.analogicalQuery,e.stopList,e.infer,e.sameAs,e.type)},deleteIndex:function(r){return e.delete("rest/similarity?name="+r.name)},createIndex:r,getSamples:function(){return e.get("rest/similarity/samples")},getQuery:function(r){return e.get("rest/similarity/query",{params:{name:r.indexName,options:r.indexOptions,stopList:r.indexStopList,selectQuery:r.query,infer:r.queryInference,sameAs:r.querySameAs,type:r.viewType,analyzer:r.indexAnalyzer}})},saveSearchQuery:function(r){return e({method:"put",url:"rest/similarity/search-query",data:r})}};function r(r,t,i,n,a,s,o,u,y,c,l){return e({method:r,url:"rest/similarity",noCancelOnRouteChange:!0,data:{name:t,options:i,selectQuery:n,stopList:o,infer:u,sameAs:y,type:c,analyzer:l,searchQuery:a,analogicalQuery:s}})}}}}]);