(window.webpackJsonp=window.webpackJsonp||[]).push([[176],{348:function(e,i){PluginRegistry.add("guide.step",[{guideBlockName:"click-main-menu",getSteps:(e,i)=>{const t=i.GuideUtils,l=[];let n,o,s,u,a,r,m="",p="";switch(e.menu){case"repositories":n="menu-setup",o="menu.setup.label",m="menu-setup-guide-dialog",s="sub-menu-repositories",u="menu.repositories.label",p="sub-menu-repositories-guide-dialog",a="menu.repositories.label",r="view.repositories.helpInfo";break;case"import":n="menu-import",o="common.import",m="menu-import-guide-dialog",a="common.import",r="view.import.helpInfo";break;case"autocomplete":n="menu-setup",o="menu.setup.label",m="menu-setup-guide-dialog",s="sub-menu-autocomplete",u="menu.autocomplete.label",p="sub-menu-autocomplete-guide-dialog",a="view.autocomplete.title",r="view.autocomplete.helpInfo";break;case"visual-graph":n="menu-explore",o="menu.explore.label",m="menu-explore-guide-dialog",s="sub-menu-visual-graph",u="visual.graph.label",p="sub-menu-visual-graph-guide-dialog",a="visual.graph.label",r="view.visual.graph.helpInfo";break;case"sparql":n="menu-sparql",o="menu.sparql.label",m="menu-sparql-guide-dialog",a="view.sparql-editor.title",r="view.sparql-editor.helpInfo";break;case"class-hierarchy":n="menu-explore",o="menu.explore.label",m="menu-explore-guide-dialog",s="menu-class-hierarchy",u="menu.class.hierarchy.label",p="sub-menu-class-hierarchy-guide-dialog",a="view.class.hierarchy.title",r="view.class.hierarchy.helpInfo"}const c=s?" div":" a";return e.viewName=a,e.showIntro&&e.mainAction&&l.push({guideBlockName:"info-message",options:angular.extend({},{content:"guide.step-intro."+e.mainAction,extraContent:r,extraContentClass:"alert alert-help text-left",skipPoint:!0},e)}),l.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step-menu.click-menu",menuLabelKey:o,class:m,elementSelector:t.getGuideElementSelector(n),showOn:()=>(s&&t.isGuideElementVisible(s)&&t.clickOnGuideElement(n,c)(),!0),onNextClick:e=>t.clickOnGuideElement(n,c)().then(()=>{s||e.next()}),initPreviousStep:(e,i)=>{const t=e.ShepherdService.getPreviousStepFromHistory(i);return t?t.options.initPreviousStep(e,t.options.id):Promise.resolve()}},e)}),s&&l.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step-menu.click-menu",menuLabelKey:u,class:p,elementSelector:t.getGuideElementSelector(s),placement:"right",canBePaused:!1,showOn:()=>(t.isGuideElementVisible(s)||t.clickOnGuideElement(n," div")(),!0),onNextClick:e=>t.clickOnGuideElement(s," a")().then(()=>e.next()),initPreviousStep:(e,i)=>{const t=e.ShepherdService.getPreviousStepFromHistory(i);return t?t.options.initPreviousStep(e,t.options.id):Promise.resolve()}},e)}),l}}])}}]);