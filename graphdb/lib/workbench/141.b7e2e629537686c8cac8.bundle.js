(window.webpackJsonp=window.webpackJsonp||[]).push([[141],{135:function(i,r){angular.module("graphdb.framework.core.directives.ascii-validator",[]).directive("asciiValidator",(function(){return{restrict:"A",require:"ngModel",link:function(i,r,t,e){function a(i){const r=/^[\x21-\x7E]*$/.test(i);return e.$setValidity("asciiValidator",r),i}e.$parsers.push(a),e.$formatters.push(a)}}}))}}]);