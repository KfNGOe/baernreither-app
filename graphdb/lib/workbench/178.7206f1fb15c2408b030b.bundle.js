(window.webpackJsonp=window.webpackJsonp||[]).push([[178],{350:function(e,t){PluginRegistry.add("guide.step",[{guideBlockName:"table-graph-explore",getSteps:(e,t)=>{const r=t.GuideUtils,l=t.$location,o=t.$route;e.mainAction="table-graph";const i=[{guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step-intro.table-graph",scrollToHandler:r.scrollToTop,elementSelector:r.getSparqlResultsSelectorForIri(e.iri),class:"table-graph-instance-guide-dialog",placement:"top",onNextClick:(e,t)=>{r.waitFor(t.elementSelector,3).then(()=>$(t.elementSelector).trigger("click")).then(()=>e.next())},initPreviousStep:(e,t)=>{if(e.ShepherdService.getCurrentStepId()===t)return Promise.resolve();const r=e.ShepherdService.getPreviousStepFromHistory(t);return r.options.initPreviousStep(e,r.options.id)}},e)},{guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.table-graph-overview",scrollToHandler:r.scrollToTop,elementSelector:r.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR,class:"table-graph-overview-guide-dialog",placement:"top",beforeShowPromise:()=>r.waitFor(`.resource-info a.source-link[href="${e.iri}"]`,3).then(()=>r.waitFor(r.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR,3)),initPreviousStep:(t,o)=>{if(t.ShepherdService.getCurrentStepId()===o)return r.defaultInitPreviousStep(t,o);return`/resource?uri=${e.iri}&role=subject`!==decodeURIComponent(l.url())?(l.path("/resource").search({uri:e.iri,role:"subject"}),r.waitFor(`.resource-info a.source-link[href="${e.iri}"]`,3)):Promise.resolve()}},e)}];return angular.isArray(e.subSteps)&&e.subSteps.forEach(t=>{switch(t.type){case"link":i.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.table-graph-link",elementSelector:r.getSparqlResultsSelectorForIri(t.iri),class:"table-graph-link-guide-dialog",onNextClick:(e,t)=>{r.waitFor(t.elementSelector,3).then(()=>$(t.elementSelector).trigger("click")).then(()=>e.next())},initPreviousStep:(i,n)=>{const a=`/resource?uri=${t.iri}&role=subject`,s=`/resource?uri=${e.iri}&role=subject`,u=decodeURIComponent(l.url());return i.ShepherdService.getCurrentStepId()===n&&s===u?Promise.resolve():a===u?r.defaultInitPreviousStep(i,n):(l.url(a),o.reload(),r.waitFor(r.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR))}},angular.extend({},e,t))});break;case"role":i.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.table-graph-role",elementSelector:r.getGuideElementSelector("role-"+t.role),class:"visual_graph-role-guide-dialog",onNextClick:(e,t)=>{r.waitFor(t.elementSelector,3).then(()=>$(t.elementSelector).trigger("click")).then(()=>e.next())},initPreviousStep:(e,i)=>{if(e.ShepherdService.getCurrentStepId()===i)return Promise.resolve();const n=e.ShepherdService.getPreviousStepFromHistory(i);return n.options.initPreviousStep(e,n.options.id).then(()=>{let e=l.url();return e=e.substring(0,e.indexOf("role=")+5),e+=t.role,l.url(e),o.reload(),r.waitFor(r.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR)})}},angular.extend({},e,t))});break;case"visual":i.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.table-graph-visual",elementSelector:r.getGuideElementSelector("explore-visual"),class:"table-graph-visual-button-guide-dialog",onNextClick:(e,t)=>{r.waitFor(t.elementSelector,3).then(()=>$(t.elementSelector).trigger("click"))},initPreviousStep:(e,t)=>e.ShepherdService.getCurrentStepId()===t?Promise.resolve():r.defaultInitPreviousStep(e,t)},angular.extend({},e,t))}),i.push({guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.visual_graph_intro.content",extraContent:t.extraContentVisualIntro,url:"/graphs-visualizations",elementSelector:".graph-visualization",placement:"left",canBePaused:!1,forceReload:!0,onNextClick:e=>{window.history.back(),e.next()}},angular.extend({},e,t))});break;case"row":i.push({guideBlockName:"read-only-element",options:angular.extend({},{elementSelector:r.getSparqlResultsSelectorForRow(t.row),class:"visual_graph-row-guide-dialog"},angular.extend({},e,t))});break;case"table":i.push({guideBlockName:"read-only-element",options:angular.extend({},{elementSelector:r.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR,class:"visual_graph-table-guide-dialog",placement:"top"},angular.extend({},e,t))})}}),i}}])}}]);