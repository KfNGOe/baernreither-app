(window.webpackJsonp=window.webpackJsonp||[]).push([[358],{477:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<link href="css/rdf-resource-search.css?v=2.8.2" rel="stylesheet"/>\n\n<div ng-cloak>\n    <div id="search-box"\n         class="card search-rdf-input"\n         ng-class="{\'show-rdf-search-box-visible\': showRdfSearchInput, \'show-rdf-search-box-invisible\': !showRdfSearchInput}"\n         ng-keydown="onKeyDown($event)">\n        <div class="card-block">\n            <search-resource-input\n                                   repository-namespaces="repositoryNamespaces"\n                                   is-autocomplete-enabled="isAutocompleteEnabled"\n                                   empty="empty"\n                                   open-in-new-tab="true"\n                                   preserve-search="true"\n                                   radio-buttons="true"\n                                   clear-input-icon="true">\n            </search-resource-input>\n            <button class="btn btn-link close-rdf-search-btn"\n                    gdb-tooltip="{{\'search.resource.close.msg\' | translate}}" tooltip-placement="bottom"\n                    ng-click="hideInput()">\n                <i class="icon-close icon-2x" aria-hidden="true"></i>\n            </button>\n        </div>\n    </div>\n    <button class="btn btn-link search-rdf-btn"\n            ng-if="!showRdfSearchInput"\n            gdb-tooltip="{{\'search.resources.msg\' | translate}}"\n            tooltip-placement="bottom"\n            ng-click="showInput()">\n        <i class="icon-search" aria-hidden="true"></i>\n    </button>\n</div>\n';return __p}}}]);