(window.webpackJsonp=window.webpackJsonp||[]).push([[110,290],{307:function(e,r,t){"use strict";t.r(r);var n=t(540);angular.module("graphdb.framework.resources.directives",[]).directive("chart",["$rootScope",function(e){return{restrict:"AE",scope:{chart:"="},link:function(r,t){let s;const a=e.$on("$translateChangeSuccess",()=>{r.chart.translateLabels(),s.setOption(r.chart.chartOptions)});function o(){s.setOption(r.chart.chartOptions),r.chart.updateRange(r.chart.dataHolder),s.hideLoading()}function c(e){r.chart.setSelectedSeries(e.selected)}function i(){s.resize()}r.$watch("chart",(function(){s=n.a(t[0],null,{renderer:"svg"}),s.setOption(r.chart.chartOptions),s.showLoading(),s.on("legendselectchanged",c),r.chart.registerRefreshHandler(o),r.chart.translateLabels(),window.addEventListener("resize",i)})),r.$on("$destroy",(function(){s.on("legendselectchanged"),s.dispose(),r.chart.unregisterRefreshHandler(o),a(),window.removeEventListener("resize",i)}))}}}])},392:function(e,r,t){"use strict";t.r(r);t(9),t(40),t(208),t(41),t(540),t(307);angular.module("graphdb.framework.jmx.resources",["toastr","ui.bootstrap","graphdb.framework.jmx.resources.controllers","graphdb.framework.core.services.repositories","graphdb.framework.core.directives","graphdb.framework.resources.directives"])}}]);