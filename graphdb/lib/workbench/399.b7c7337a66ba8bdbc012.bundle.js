(window.webpackJsonp=window.webpackJsonp||[]).push([[399],{520:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='\x3c!-- Start editLocation.html --\x3e\n\n<div class="modal-header">\n\t<button class="close" ng-click="cancel();" aria-hidden="true"></button>\n\t<h3 class="modal-title">{{\'upload.repo.config.header\' | translate}}</h3>\n</div>\n<div class="modal-body">\n\t<div class="btn btn-outline-primary btn-lg btn-block" ng-if="!editRepoPage">\n\t\t<a ngf-select ngf-change="upload($files)" ngf-multiple="false" class="selectFiles pointer clearfix"\n\t\t   accept=".ttl" gdb-tooltip="{{\'select.repo.config.tooltip\' | translate}}">\n\t\t\t<em class="icon-upload icon-lg pull-left" gdb-tooltip="Select files"></em>\n\t\t\t<div class="pull-left">\n\t\t\t\t<span>{{\'upload.ttl.file.btn\' | translate}}</span>\n\t\t\t\t<br>\n\t\t\t\t<small ng-hide="uploadFile" class="text-muted">{{\'no.file.selected.error\' | translate}}</small>\n\t\t\t\t<small ng-show="uploadFile" class="text-muted"\n                   translate="selected.file.msg"\n                   translate-value-name="{{uploadFile.name}}"></small>\n\t\t\t</div>\n\t\t\t<div ng-show="uploadFileLoader" onto-loader size="48" class="ot-loader pull-right"></div>\n\t\t</a>\n\t</div>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-secondary" ng-click="cancel()">{{\'common.cancel.btn\' | translate}}</button>\n    <button class="btn btn-primary" ng-click="ok()">{{\'common.create.btn\' | translate}}</button>\n</div>\n\n\x3c!-- End editLocation.html --\x3e\n';return __p}}}]);