(window.webpackJsonp=window.webpackJsonp||[]).push([[383],{502:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<div class="modal-header">\n    <button type="button" class="close" ng-click="cancel()"></button>\n    <h4 class="modal-title">{{\'import.text_snippet_dialog.title\' | translate}}</h4>\n</div>\n\n<div class="modal-body">\n    <form name="snippetForm" id="snippetForm">\n        <div class="form-group">\n            <label for="wb-import-textarea">{{\'import.text_snippet_dialog.text_snippet.label\' | translate}}</label>\n            <textarea id="wb-import-textarea" name="rdfSnippet" class="form-control" rows="10" ng-model="rdfText"\n                      ng-maxlength="sizeLimit-1"\n                      placeholder="{{\'import.text_snippet_dialog.text_snippet.placeholder\' | translate}}"></textarea>\n            <div class="text-right">\n                <sub ng-if="!snippetForm.rdfSnippet.$error.maxlength">{{sizeLimit - rdfText.length}}/{{sizeLimit}}</sub>\n            </div>\n            <div ng-if="snippetForm.rdfSnippet.$error.maxlength" class="alert alert-danger">\n                {{\'import.text_snippet_dialog.text_snippet.validation_message\' | translate: {limit: sizeLimit} }}\n            </div>\n        </div>\n    </form>\n</div>\n\n<div class="modal-footer">\n    <div class="mb-1">\n        <span\n            uib-popover="{{\'import.text_snippet_dialog.auto_start.tooltip\' | translate}}"\n            popover-trigger="mouseenter"\n            popover-placement="top">\n            <input id="import-now-checkbox" type="checkbox" ng-model="startImport"/>\n            <label for="import-now-checkbox">{{\'import.text_snippet_dialog.auto_start.label\' | translate}}</label>\n        </span>\n    </div>\n    <div>\n        <button type="button" ng-click="cancel()" class="btn btn-secondary">{{\'common.cancel.btn\' | translate}}</button>\n        <div class="btn-group import-format-dropdown" uib-dropdown>\n            <button type="button" class="btn btn-secondary dropdown-toggle import-format-dropdown-btn"\n                    uib-dropdown-toggle>\n                {{\'import.text_snippet_dialog.import_format_menu.label\' | translate}}: {{importFormat.name}}\n            </button>\n            <ul class="dropdown-menu" role="menu">\n                <li ng-repeat="format in importFormats">\n                    <a ng-click="setFormat(format)" class="dropdown-item">{{format.name}}</a>\n                </li>\n            </ul>\n        </div>\n        <button id="wb-import-importText" class="btn btn-primary" type="button"\n                ng-click="ok()" ng-disabled="snippetForm.$invalid">\n            <em class="icon-import"></em>{{\'common.import\' | translate}}\n        </button>\n    </div>\n</div>\n';return __p}}}]);