(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{209:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<div class="modal-header">\n    <button type="button" class="close" ng-click="cancel()"></button>\n    <h3 class="modal-title">{{\'cluster_management.remove_nodes_dialog.title\' | translate}}</h3>\n</div>\n<div class="modal-body">\n    <form name="form" id="removeNodesForm">\n        <h5>{{\'cluster_management.remove_nodes_dialog.content\' | translate}}</h5>\n        <div class="row">\n            <div class="col-xs-12 mb-1 mt-1">\n                <h5>{{\'cluster_management.cluster_page.cluster_nodes_list\' | translate}}</h5>\n                <ul ng-if="clusterNodes.length" class="list-group nodes-list">\n                    <li ng-repeat="node in clusterNodes" ng-class="{\'list-group-item-danger\': node.shouldRemove}"\n                        class="list-group-item list-group-item-action list-group-item-node">\n                        <a ng-click="toggleNode($index, node)" class="d-flex justify-content-between align-items-center">\n                            <div class="location-item">\n                                <div class="logo-image"></div>\n                                {{node.endpoint}}\n                            </div>\n                        </a>\n                    </li>\n                </ul>\n                <div class="row">\n                    <div class="col-xs-12">\n                        <div ng-if="leftNodesLessThanTwo" class="not-enough-nodes-error alert alert-danger mt-1">\n                            {{\'cluster_management.cluster_page.errors.at_least_two_nodes\' | translate}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-secondary" ng-click="cancel()">{{\'common.cancel.btn\' | translate}}</button>\n    <button id="wb-remove-nodes-from-cluster-submit" class="btn btn-primary"\n            ng-disabled="!nodesToRemoveCount || leftNodesLessThanTwo" form="removeNodesForm"\n            ng-click="ok()" type="submit">{{\'common.ok.btn\' | translate}}\n    </button>\n</div>\n';return __p}}}]);
//# sourceMappingURL=144.61b3801de8b8d5828223.bundle.js.map