(window.webpackJsonp=window.webpackJsonp||[]).push([[357],{476:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<link href="css/operations-statuses-monitor.css?v=2.8.2" rel="stylesheet"/>\n\n<div ng-if="activeOperations && activeOperations.operations && activeOperations.operations.length > 0"\n     class="operations-statuses btn-group">\n    <button type="button"\n            class="btn btn-secondary operations-statuses-dropdown-toggle dropdown-toggle" data-toggle="dropdown"\n            ng-if="operationsSummary && operationsSummary.length > 0"\n            ng-class="{\n            \'btn-fade-danger\': OPERATION_STATUS.CRITICAL === activeOperations.status,\n            \'btn-fade-warning\': OPERATION_STATUS.WARNING === activeOperations.status\n            }">\n        <div class="operation-status-header" ng-repeat="operationGroup in operationsSummary">\n            <div ng-class="{\n            \'icon-import\': OPERATION_GROUP_TYPE.IMPORT_OPERATION === operationGroup.type,\n            \'icon-exchange\': OPERATION_GROUP_TYPE.QUERIES_OPERATION === operationGroup.type,\n            \'fa fa-archive\': OPERATION_GROUP_TYPE.BACKUP_AND_RESTORE_OPERATION === operationGroup.type,\n            \'fa fa-sitemap\': OPERATION_GROUP_TYPE.CLUSTER_OPERATION === operationGroup.type,\n            \'status-critical\': OPERATION_STATUS.CRITICAL === operationGroup.status,\n            \'status-information\': OPERATION_STATUS.INFORMATION === operationGroup.status,\n            \'status-warning\': OPERATION_STATUS.WARNING === operationGroup.status}">\n            </div>\n            <span ng-if="operationGroup.runningOperations" class="running-operation-count">\n                <sup class="tag-info">{{operationGroup.runningOperations}}</sup>\n            </span>\n        </div>\n        <span class="caret"></span>\n    </button>\n    <ul role="menu" class="dropdown-menu dropdown-menu-right">\n        <div class="operations-statuses-content">\n            <li ng-repeat="operationStatus in activeOperations.operations">\n                <a class="operation-status-content btn btn-secondary row" target="_blank" ng-attr-href="{{operationStatus.monitoringViewUrl}}"\n                   ng-class="{\n                   \'status-critical\': OPERATION_STATUS.CRITICAL === operationStatus.status,\n                   \'status-information\': OPERATION_STATUS.INFORMATION === operationStatus.status,\n                   \'status-warning\': OPERATION_STATUS.WARNING === operationStatus.status\n                   }">\n                    <div class="operation-icon col-sm-1" ng-style="noPadding">\n                        <div ng-class="{\n                       \'icon-import\': OPERATION_TYPE.IMPORTS === operationStatus.type,\n                       \'icon-exchange\': OPERATION_TYPE.QUERIES === operationStatus.type || OPERATION_TYPE.UPDATES === operationStatus.type,\n                       \'fa fa-archive\': OPERATION_TYPE.BACKUP_RESTORE === operationStatus.type,\n                       \'fa fa-sitemap\': OPERATION_TYPE.CLUSTER_STATUS === operationStatus.type}">\n                        </div>\n                    </div>\n                    <div class="col-sm-8 operation-status-label">\n                        {{ \'global.operations_statuses.\' + operationStatus.titleLabelKey + \'.title\' | translate }}\n                    </div>\n                    <div class="operation-number col-sm-3">\n                        <div ng-if="operationStatus.runningOperationCount" class="operation-status-running-operation-count tag-info">\n                            {{operationStatus.runningOperationCount}}\n                        </div>\n                    </div>\n                </a>\n            </li>\n        </div>\n    </ul>\n</div>\n';return __p}}}]);