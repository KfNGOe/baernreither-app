(window.webpackJsonp=window.webpackJsonp||[]).push([[140],{205:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<div class="modal-header">\n    <button type="button" class="close" ng-click="cancel()"></button>\n    <h3 class="modal-title">{{\'cluster_management.add_nodes_dialog.title\' | translate}}</h3>\n</div>\n<div class="modal-body">\n    <form name="form" id="addNodesForm">\n        <div class="row">\n            <div class="col-lg-6">\n                <h4>{{\'cluster_management.cluster_page.cluster_nodes_list\' | translate}}</h4>\n                <ul ng-if="clusterNodes && clusterNodes.length" class="list-group nodes-list">\n                    <li ng-repeat="node in clusterNodes" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">\n                        <div class="location-item">\n                            <div class="logo-image"></div>\n                            {{node.endpoint}}\n                        </div>\n                        <div ng-if="node.isLocal">\n                            {{\'cluster_management.cluster_page.current_node\' | translate}}\n                        </div>\n                    </li>\n                </ul>\n            </div>\n            <div class="col-lg-6">\n                <h4>{{\'cluster_management.cluster_page.remote_locations\' | translate}}</h4>\n                <div class="pre-scrollable locations-list mb-1">\n                    <div class="location-item hoverable" ng-repeat="location in locations | orderBy: [\'endpoint\']"\n                         ng-class="!location.rpcAddress ? \'list-group-item-danger\' : \'\'"\n                         tooltip="{{location.rpcAddress ? \'\' : \'cluster_management.cluster_page.errors.no_rpc_address\' | translate: {error: location.error} }}"\n                         ng-click="addNodeToList(location)">\n                        <div class="logo-image"></div>\n                        {{location.endpoint}}\n                    </div>\n                </div>\n                <button type="button" id="addLocation" ng-click="addLocation()" class="btn btn-primary"><span class="icon-plus"></span>{{\'attach.remote.location\' | translate}}</button>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col-xs-12 mb-1 mt-1">\n                <h5>{{\'cluster_management.add_nodes_dialog.nodes_to_add_label\' | translate}}</h5>\n                <ul ng-if="nodes.length" class="list-group nodes-list">\n                    <li ng-repeat="node in nodes" class="list-group-item list-group-item-action list-group-item-node">\n                        <a ng-click="removeNodeFromList($index, node)" class="d-flex justify-content-between align-items-center"\n                           tooltip="{{\'cluster_management.cluster_page.remove_node_btn_tooltip\' | translate}}" tooltip-placement="top">\n                            <div class="location-item">\n                                <div class="logo-image"></div>\n                                {{node.endpoint}}\n                            </div>\n                        </a>\n                    </li>\n                </ul>\n                <div ng-if="!nodes.length" class="at-least-one-error alert alert-warning mt-1">\n                    {{\'cluster_management.cluster_page.select_from_locations_hint\' | translate}}\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-secondary" ng-click="cancel()">{{\'common.cancel.btn\' | translate}}</button>\n    <button id="wb-add-nodes-to-cluster-submit" form="addNodesForm" class="btn btn-primary" ng-disabled="!nodes.length" ng-click="ok()" type="submit">{{\'common.ok.btn\' | translate}}</button>\n</div>\n';return __p}}}]);
//# sourceMappingURL=140.8f22a20a0689c072368f.bundle.js.map