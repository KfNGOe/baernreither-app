(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{70:function(r,i,e){"use strict";e.r(i);e(14);angular.module("graphdb.framework.explore.directives",["graphdb.framework.utils.uriutils"]).directive("uri",["UriUtils",function(r){return{require:"ngModel",link:function(i,e,t,n){n.$parsers.unshift((function(i){if(!angular.isUndefined(i)&&i.length>0){const e=r.validateRdfUri(i);return n.$setValidity("searchStr",e),e?i:void 0}return n.$setValidity("searchStr",!0),i})),n.$formatters.unshift((function(i){return angular.isUndefined(i)||n.$setValidity("searchStr",r.validateRdfUri),i}))}}}])}}]);
//# sourceMappingURL=65.efacd2d99b5baebd65c6.bundle.js.map