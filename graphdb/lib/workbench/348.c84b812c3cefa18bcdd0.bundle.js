(window.webpackJsonp=window.webpackJsonp||[]).push([[348],{467:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<link href="css/cluster-nodes-configuration.css?v=2.8.2" rel="stylesheet"/>\n\n<div onto-loader-new ng-if="loader" class="create-cluster-loader" message="getLoaderMessage" size="100"></div>\n<div class="add-node-wrapper pull-right mb-1">\n    <button ng-click="addNode()" ng-disabled="editedNodeIndex !== undefined"\n            class="btn btn-primary add-node-btn"\n            gdb-tooltip="{{\'cluster_management.update_cluster_group_dialog.actions.add_node_tooltip\' | translate}}">\n        <i class="fa fa-plus"></i> {{\'cluster_management.update_cluster_group_dialog.actions.add_node\' |\n        translate}}\n    </button>\n</div>\n<div class="table-responsive">\n    <form name="form" id="updateClusterGroupForm">\n        <table class="cluster-group table table-striped table-hover cluster-group-table" aria-describedby="cluster group table">\n            <thead>\n            <tr class="labels-row">\n                <th scope="col" class="index-column">\n                    {{\'cluster_management.update_cluster_group_dialog.column.index\' | translate}}\n                </th>\n                <th scope="col" class="location-column">\n                    {{\'cluster_management.update_cluster_group_dialog.column.location\' | translate}}\n                </th>\n                <th scope="col" class="info-column">\n                    {{\'cluster_management.update_cluster_group_dialog.column.info\' | translate}}\n                </th>\n                <th scope="col" class="status-column">\n                    {{\'cluster_management.update_cluster_group_dialog.column.status\' | translate}}\n                </th>\n                <th scope="col" class="empty-column"></th>\n                <th scope="col" class="actions-column"></th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr ng-if="!viewModel.length">\n                <td colspan="5" class="no-data">\n                    {{\'cluster_management.update_cluster_group_dialog.messages.no_cluster\' | translate}}\n                </td>\n            </tr>\n\n            <tr ng-repeat-start="node in viewModel track by $index" ng-if="0"></tr>\n            <tr ng-if="$index !== editedNodeIndex" class="node preview-node-row" data-endpoint="{{node.endpoint}}"\n                capture-height="$index"\n                ng-class="{\'selected\': $index === selectedNode || $index === editedNodeIndex}">\n                <td class="index-cell"><span ng-if="!node.isDeleted">{{node.index + 1}}</span></td>\n                <td class="location-cell data"  ng-class="{\'deleting\': node.isDeleted, \'adding\': !node.item.address}">\n                    <div class="location-item">\n                        {{node.item.endpoint}}\n                    </div>\n                </td>\n                <td class="info-cell data">\n                    <span ng-if="node.isLocal">\n                        {{\'cluster_management.update_cluster_group_dialog.current_node\' | translate}}<span ng-if="node.item.nodeState">, </span>\n                    </span>\n\n                    <span ng-if="node.item.nodeState">\n                        {{ (\'cluster_management.update_cluster_group_dialog.\' + node.item.nodeState.toLowerCase()) |\n                        translate }}\n                    </span>\n                </td>\n                <td class="status-cell data">\n                    <div ng-if="!node.item.address" class="adding">\n                        <i class="fa fa-circle-check status-icon"></i>\n                        {{\'cluster_management.update_cluster_group_dialog.new_node\' | translate}}\n                    </div>\n                    <div ng-if="node.isDeleted" class="deleting">\n                        <i class="fa fa-xmark status-icon"></i>\n                        {{\'cluster_management.update_cluster_group_dialog.deleted_node\' | translate}}\n                    </div>\n                </td>\n                <td class="empty-cell"></td>\n                <td class="actions-cell">\n                    <div ng-if="editedNodeIndex === undefined && !node.isDeleted" class="actions-group">\n                        <button ng-click="deleteNode($index, node)" ng-disabled="!canDeleteNode"\n                                class="btn btn-link delete-node-btn secondary"\n                                gdb-tooltip="{{ canDeleteNode ? (\'cluster_management.update_cluster_group_dialog.actions.delete_node\' | translate) : (\'cluster_management.update_cluster_group_dialog.actions.cannot_delete_node\' | translate) }}"\n                                title-class="delete-node-tooltip">\n                            <i class="fa fa-xmark"></i>\n                        </button>\n                        <button ng-click="replaceNode($index, node)" class="btn btn-link replace-node-btn"\n                                gdb-tooltip="{{\'cluster_management.update_cluster_group_dialog.actions.replace_node\' | translate}}">\n                            <i class="fa fa-arrow-right-arrow-left"></i>\n                        </button>\n                    </div>\n                    <div ng-if="editedNodeIndex === undefined && node.isDeleted" class="actions-group">\n                        <button ng-click="restoreNode(node)"\n                                class="btn btn-link restore-node-btn secondary"\n                                gdb-tooltip="{{\'cluster_management.update_cluster_group_dialog.actions.restore_node\' | translate}}">\n                            <i class="fa fa-rotate-left"></i>\n                        </button>\n                    </div>\n                </td>\n            </tr>\n            <tr ng-if="$index === editedNodeIndex" class="node edit-node-row" data-endpoint="{{node.endpoint}}"\n                style="{{getRowHeight}}"\n                ng-class="{\'selected table-info\': $index === editedNodeIndex}">\n                <td class="index-cell"><span ng-if="!node.isDeleted">{{node.index + 1}}</span></td>\n                <td class="data location-cell">\n                    <div class="autocomplete-container">\n                            <textarea type="text" name="location" required\n                                      ng-model="node.endpoint"\n                                      ng-change="filterSuggestions(node)"\n                                      ng-blur="hideSuggestions(node)"\n                                      ng-click="filterSuggestions(node)"\n                                      auto-grow\n                                      validate-url exclude="/repositories" exclude-protocol="ftp,ftps"\n                                      validate-duplicate-url excluded-urls="clusterNodesEndpoints"\n                                      allow-empty="false"\n                                      autocomplete="off"\n                                      class="form-control form-control-sm textarea-edit"\n                                      uib-tooltip="{{\'remote.location.enter.url.msg\' | translate}}"\n                                      tooltip-placement="top"\n                                      placeholder="{{\'cluster_management.update_cluster_group_dialog.field_placeholders.location\' | translate}}">\n                            </textarea>\n                        <ul ng-show="suggestions.length > 0 && showDropdown" class="autocomplete-dropdown">\n                            <li ng-repeat="suggestion in suggestions"\n                                ng-mouseup="selectSuggestion(node, suggestion)">\n                                {{ suggestion }}\n                            </li>\n                        </ul>\n                    </div>\n                </td>\n                <td class="info-cell data">\n                    <span ng-if="node.isLocal">\n                        {{\'cluster_management.update_cluster_group_dialog.current_node\' | translate}}<span ng-if="node.item.nodeState">, </span>\n                    </span>\n\n                    <span ng-if="node.item.nodeState">\n                        {{ (\'cluster_management.update_cluster_group_dialog.\' + node.item.nodeState.toLowerCase()) |\n                        translate }}\n                    </span>\n                </td>\n                <td class="status-cell"></td>\n                <td class="empty-cell"></td>\n                <td class="actions-cell">\n                    <div class="crud-actions-group">\n                        <button ng-click="cancel()"\n                                class="btn btn-link cancel-node-replace-btn secondary"\n                                gdb-tooltip="{{\'cluster_management.update_cluster_group_dialog.actions.cancel\' | translate}}">\n                            <i class="fa fa-xmark"></i>\n                        </button>\n                        <button ng-click="saveNode(node.endpoint)"\n                                class="btn btn-link save-rule-btn"\n                                ng-disabled="!form.location.$valid"\n                                gdb-tooltip="{{form.location.$valid ? \'cluster_management.update_cluster_group_dialog.actions.add_node\' : \'cluster_management.update_cluster_group_dialog.messages.invalid_form\' | translate}}">\n                            <i class="fa fa-check"></i>\n                        </button>\n                    </div>\n                </td>\n            </tr>\n            <tr ng-repeat-end ng-if="0"></tr>\n            <tr ng-if="addNewLocation" class="node edit-node-row">\n                <td class="index-cell"></td>\n                <td class="data location-cell">\n                    <div class="autocomplete-container">\n                            <textarea type="text" name="location" required\n                                      ng-model="newLocation.endpoint"\n                                      ng-change="filterSuggestions(newLocation)"\n                                      ng-blur="hideSuggestions(newLocation)"\n                                      ng-click="filterSuggestions(newLocation)"\n                                      auto-grow\n                                      validate-url exclude="/repositories" exclude-protocol="ftp,ftps"\n                                      validate-duplicate-url excluded-urls="clusterNodesEndpoints"\n                                      allow-empty="false"\n                                      autocomplete="off"\n                                      class="form-control form-control-sm textarea-edit"\n                                      uib-tooltip="{{\'remote.location.enter.url.msg\' | translate}}"\n                                      tooltip-placement="top"\n                                      placeholder="{{\'cluster_management.update_cluster_group_dialog.field_placeholders.location\' | translate}}">\n                            </textarea>\n                        <ul ng-show="suggestions.length > 0 && showDropdown" class="autocomplete-dropdown">\n                            <li ng-repeat="suggestion in suggestions"\n                                ng-mouseup="selectSuggestion(newLocation, suggestion)">\n                                {{ suggestion }}\n                            </li>\n                        </ul>\n                    </div>\n                </td>\n                <td class="info-cell data"></td>\n                <td class="status-cell"></td>\n                <td class="empty-cell"></td>\n                <td class="actions-cell">\n                    <div class="crud-actions-group">\n                        <button ng-click="cancel()"\n                                class="btn btn-link cancel-node-replace-btn secondary"\n                                gdb-tooltip="{{\'cluster_management.update_cluster_group_dialog.actions.cancel\' | translate}}">\n                            <i class="fa fa-xmark"></i>\n                        </button>\n                        <button ng-click="saveNode(newLocation.endpoint)"\n                                class="btn btn-link save-rule-btn"\n                                ng-disabled="!form.location.$valid"\n                                gdb-tooltip="{{form.location.$valid ? \'cluster_management.update_cluster_group_dialog.actions.add_node\' : \'cluster_management.update_cluster_group_dialog.messages.invalid_form\' | translate}}">\n                            <i class="fa fa-check"></i>\n                        </button>\n                    </div>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n        <div class="errors">\n            <div class="error-message"\n                 ng-show="form.location.$error.validUrl && !form.location.$pristine">\n                * {{\'valid.remote.location.warning\' | translate}} http://server.example.com:7200/.\n            </div>\n            <div class="error-message"\n                 ng-show="form.location.$error.duplicateUrl && !form.location.$pristine">\n                * {{\'duplicate.remote.location.warning\' | translate}}\n            </div>\n            <div ng-repeat="error in errors" class="error-message">\n                {{error}}\n            </div>\n        </div>\n        <div class="form-horizontal" ng-if="!hasCluster">\n            <div class="form-group">\n                <div class="indented-div">\n                        <span class="padding-label wrapper-div"\n                              gdb-tooltip="{{\'cluster_management.cluster_page.advanced_options_tooltip\' | translate}}">\n                            <button type="button"\n                                    class="text-btn advanced-options-btn text-left"\n                                    data-toggle="collapse"\n                                    data-target="#advancedOptions">\n                                <i class="{{getAdvancedOptionsClass()}} advanced-options-toggle" aria-hidden="true"></i>\n                                {{\'cluster_management.cluster_page.advanced_options\' | translate}}\n                            </button>\n                        </span>\n                </div>\n\n                <div id="advancedOptions" class="collapse pb-1 pl-2">\n                    <div class="form-group">\n                        <div class="input-group"\n                             ng-class="{\'has-danger\': clusterConfigurationForm.electionMinTimeout.$invalid}">\n                            <label for="election-minimum-timeout" class="col-xs-4 col-form-label">{{\'cluster_management.cluster_configuration_properties.election_min_timeout\'\n                                | translate}}*</label>\n                            <div class="col-xs-8"\n                                 gdb-tooltip="{{\'cluster_management.cluster_configuration_properties.election_min_timeout_tooltip\' | translate}}">\n                                <input class="form-control" placeholder="{{\'required.field\' | translate}}"\n                                       type="number" ng-model="clusterConfiguration.electionMinTimeout"\n                                       required id="election-minimum-timeout" min="0" pattern="[0-9]+"\n                                       name="electionMinTimeout">\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.electionMinTimeout.$error.required">\n                                    {{\'required.field\' | translate}}\n                                </div>\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.electionMinTimeout.$error.pattern">\n                                    {{\'cluster_management.cluster_page.errors.only_positive_integers\' | translate}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <div class="input-group"\n                             ng-class="{\'has-danger\': clusterConfigurationForm.electionRangeTimeout.$invalid}">\n                            <label for="election-range-timeout" class="col-xs-4 col-form-label">{{\'cluster_management.cluster_configuration_properties.election_range_timeout\'\n                                | translate}}*</label>\n                            <div class="col-xs-8"\n                                 gdb-tooltip="{{\'cluster_management.cluster_configuration_properties.election_range_timeout_tooltip\' | translate}}">\n                                <input class="form-control" placeholder="{{\'required.field\' | translate}}"\n                                       type="number" ng-model="clusterConfiguration.electionRangeTimeout"\n                                       required id="election-range-timeout" min="0" pattern="[0-9]+"\n                                       name="electionRangeTimeout">\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.electionRangeTimeout.$error.required">\n                                    {{\'required.field\' | translate}}\n                                </div>\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.electionRangeTimeout.$error.pattern">\n                                    {{\'cluster_management.cluster_page.errors.only_positive_integers\' | translate}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <div class="input-group"\n                             ng-class="{\'has-danger\': clusterConfigurationForm.heartbeatInterval.$invalid}">\n                            <label for="heartbeat-interval" class="col-xs-4 col-form-label">{{\'cluster_management.cluster_configuration_properties.heartbeat_interval\'\n                                | translate}}*</label>\n                            <div class="col-xs-8"\n                                 gdb-tooltip="{{\'cluster_management.cluster_configuration_properties.heartbeat_interval_tooltip\' | translate}}">\n                                <input class="form-control" placeholder="{{\'required.field\' | translate}}"\n                                       type="number" ng-model="clusterConfiguration.heartbeatInterval"\n                                       required id="heartbeat-interval" min="0" pattern="[0-9]+"\n                                       name="heartbeatInterval">\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.heartbeatInterval.$error.required">\n                                    {{\'required.field\' | translate}}\n                                </div>\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.heartbeatInterval.$error.pattern">\n                                    {{\'cluster_management.cluster_page.errors.only_positive_integers\' | translate}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <div class="input-group"\n                             ng-class="{\'has-danger\': clusterConfigurationForm.messageSizeKB.$invalid}">\n                            <label for="message-size" class="col-xs-4 col-form-label">{{\'cluster_management.cluster_configuration_properties.message_size_kb\'\n                                | translate}}*</label>\n                            <div class="col-xs-8"\n                                 gdb-tooltip="{{\'cluster_management.cluster_configuration_properties.message_size_kb_tooltip\' | translate}}">\n                                <input class="form-control" placeholder="{{\'required.field\' | translate}}"\n                                       type="number" ng-model="clusterConfiguration.messageSizeKB"\n                                       required id="message-size" min="0" pattern="[0-9]+" name="messageSizeKB">\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.messageSizeKB.$error.required">\n                                    {{\'required.field\' | translate}}\n                                </div>\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.messageSizeKB.$error.pattern">\n                                    {{\'cluster_management.cluster_page.errors.only_positive_integers\' | translate}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="form-group">\n                        <div class="input-group"\n                             ng-class="{\'has-danger\': clusterConfigurationForm.verificationTimeout.$invalid}">\n                            <label for="verification-timeout" class="col-xs-4 col-form-label">{{\'cluster_management.cluster_configuration_properties.verification_timeout\'\n                                | translate}}*</label>\n                            <div class="col-xs-8"\n                                 gdb-tooltip="{{\'cluster_management.cluster_configuration_properties.verification_timeout_tooltip\' | translate}}">\n                                <input class="form-control" placeholder="{{\'required.field\' | translate}}"\n                                       type="number" ng-model="clusterConfiguration.verificationTimeout"\n                                       required id="verification-timeout" min="0" pattern="[0-9]+"\n                                       name="verificationTimeout">\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.verificationTimeout.$error.required">\n                                    {{\'required.field\' | translate}}\n                                </div>\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.verificationTimeout.$error.pattern">\n                                    {{\'cluster_management.cluster_page.errors.only_positive_integers\' | translate}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="input-group"\n                             ng-class="{\'has-danger\': clusterConfigurationForm.transactionLogMaximumSizeGB.$invalid}">\n                            <label for="verification-timeout" class="col-xs-4 col-form-label">{{\'cluster_management.cluster_configuration_properties.transaction_log_maximum_size_gb\'\n                                | translate}}*</label>\n                            <div class="col-xs-8"\n                                 gdb-tooltip="{{\'cluster_management.cluster_configuration_properties.transaction_log_maximum_size_gb_tooltip\' | translate}}">\n                                <input class="form-control" placeholder="{{\'required.field\' | translate}}"\n                                       type="number" ng-model="clusterConfiguration.transactionLogMaximumSizeGB"\n                                       required id="transaction-log-maximum-size-gb"\n                                       pattern="-?[1-9][0-9]*(\\.[0-9]+)?" name="transaction_log_maximum_size_gb">\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.transactionLogMaximumSizeGB.$error.required">\n                                    {{\'required.field\' | translate}}\n                                </div>\n                                <div class="form-control-feedback"\n                                     ng-show="clusterConfigurationForm.transactionLogMaximumSizeGB.$error.pattern">\n                                    {{\'cluster_management.cluster_page.errors.small_transaction_log_max_size\' |\n                                    translate}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="input-group" ng-class="{\'has-danger\': clusterConfigurationForm.batchUpdateInterval.$invalid}">\n                            <label for="batch-update-interval" class="col-xs-4 col-form-label">\n                                {{\'cluster_management.cluster_configuration_properties.batch_update_interval\' | translate}}*\n                            </label>\n                            <div class="col-xs-8" gdb-tooltip="{{\'cluster_management.cluster_configuration_properties.batch_update_interval_tooltip\' | translate}}">\n                                <input\n                                    class="form-control"\n                                    placeholder="{{\'required.field\' | translate}}"\n                                    type="number"\n                                    ng-model="clusterConfiguration.batchUpdateInterval"\n                                    required\n                                    id="batch-update-interval"\n                                    min="0"\n                                    name="batchUpdateInterval">\n                                <div class="form-control-feedback" ng-show="clusterConfigurationForm.batchUpdateInterval.$error.required">\n                                    {{\'required.field\' | translate}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n';return __p}}}]);