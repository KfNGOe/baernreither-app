(window.webpackJsonp=window.webpackJsonp||[]).push([[410],{531:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<link href="css/ttyg/agent-settings-modal.css?v=2.8.2" rel="stylesheet"/>\n\n<div class="modal-header">\n    <button type="button" class="close" ng-click="close()"></button>\n    <h4 class="modal-title">{{(\n        operation === AGENT_OPERATION.EDIT ? \'ttyg.agent.create_agent_modal.title.edit \'\n        : operation === AGENT_OPERATION.CLONE ? \'ttyg.agent.create_agent_modal.title.clone\'\n        : \'ttyg.agent.create_agent_modal.title.create\') | translate}}</h4>\n</div>\n\n<div class="modal-body">\n    <form novalidate name="agentSettingsForm" id="agentSettingsForm" class="agent-settings-form">\n        <div class="form-group agent-name-label">\n            <label for="name" uib-popover="{{\'ttyg.agent.create_agent_modal.form.agent_name.tooltip\' | translate}}"\n                   popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.agent_name.label\'\n                | translate}}</label>\n            <input type="text" class="form-control" id="name" name="name" ng-model="agentFormModel.name"\n                   required autocomplete="off"\n                   placeholder="{{\'ttyg.agent.create_agent_modal.form.agent_name.placeholder\' | translate}}">\n            <div class="alert alert-danger"\n                 ng-if="agentSettingsForm.name.$touched && agentSettingsForm.name.$invalid">\n                {{\'required.field\' | translate}}\n            </div>\n        </div>\n        <div class="form-group repository-id">\n            <label for="repositoryId"\n                   uib-popover="{{\'ttyg.agent.create_agent_modal.form.repository.tooltip\' | translate}}"\n                   popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.repository.label\' |\n                translate}}</label>\n            <select class="form-control" id="repositoryId" name="repositoryId" ng-model="agentFormModel.repositoryId"\n                    required ng-change="onRepositoryChange()"\n                    ng-options="repository.value as repository.label for repository in activeRepositoryList">\n            </select>\n            <div class="alert alert-danger"\n                 ng-if="agentSettingsForm.repositoryId.$touched && agentSettingsForm.repositoryId.$invalid">\n                {{\'required.field\' | translate}}\n            </div>\n        </div>\n        <div class="form-group extraction-methods-group">\n            <label for="extractionMethods"\n                   uib-popover="{{\'ttyg.agent.create_agent_modal.form.extraction_method.tooltip\' | translate}}"\n                   popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.extraction_method.label\' |\n                translate}}</label>\n            <div id="extractionMethods" name="extractionMethods"\n                 ng-model="agentFormModel.assistantExtractionMethods.extractionMethods"\n                 required class="accordion extraction-methods"\n                 ng-class="{\'has-error\': agentSettingsForm.extractionMethods.$touched && agentSettingsForm.extractionMethods.$invalid}">\n                <div ng-repeat="extractionMethod in agentFormModel.assistantExtractionMethods.extractionMethods"\n                     class="extraction-method">\n                    <div id="{{extractionMethod.method + \'_method_heading\'}}" class="extraction-method-heading"\n                         ng-class="{\'selected\': extractionMethod.selected}">\n                        <div class="mr-0 extraction-method-toggle">\n                            <input type="checkbox" id="{{extractionMethod.method + \'_checkbox\'}}"\n                                   name="{{extractionMethod}}" class="switch"\n                                   ng-click="toggleExtractionMethod(extractionMethod, $event)"\n                                   ng-model="extractionMethod.selected"/>\n                            <label for="{{extractionMethod.method + \'_checkbox\'}}"></label>\n                        </div>\n                        <a class="btn btn-link panel-toggle-link"\n                           aria-expanded="false" aria-controls="{{extractionMethod.method + \'_method_content\'}}"\n                           ng-click="onExtractionMethodPanelToggle(extractionMethod)">\n                            <span class="mr-1"\n                                  uib-popover="{{\'ttyg.agent.create_agent_modal.form.\' + extractionMethod.method + \'.tooltip\' | translate}}"\n                                  popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.\' + extractionMethod.method + \'.label\' | translate}}</span>\n                            <i class="fa fa-chevron-down toggle-icon"\n                               ng-class="{\'expanded\': extractionMethod.expanded}">\n                            </i>\n                        </a>\n                    </div>\n\n                    <div id="{{extractionMethod.method + \'_method_content\'}}"\n                         class="show extraction-method-content"\n                         aria-labelledby="{{extractionMethod.method + \'_method_heading\'}}"\n                         data-parent="#extractionMethods">\n\n                        \x3c!-- SPARQL method settings --\x3e\n\n                        <div ng-if="extractionMethod.expanded && extractionMethod.method === extractionMethods.SPARQL"\n                             class="extraction-method-options"\n                             ng-class="{\'has-error\': extractionMethod.selected && !extractionMethod.sparqlOption}">\n                            <div class="sparql-option ontology-graph-option">\n                                <label class="radio-inline"\n                                       uib-popover="{{\'ttyg.agent.create_agent_modal.form.ontology_graph.tooltip\' | translate}}"\n                                       popover-trigger="mouseenter">\n                                    <input type="radio" name="sparqlOption" ng-required="extractionMethod.selected"\n                                           ng-model="extractionMethod.sparqlOption" value="ontologyGraph">\n                                    {{\'ttyg.agent.create_agent_modal.form.ontology_graph.label\' | translate}}\n                                </label>\n                                <div class="panel" ng-show="extractionMethod.sparqlOption === \'ontologyGraph\'">\n                                    <div class="form-group">\n                                        <input type="text" class="form-control" id="ontologyGraph"\n                                               name="ontologyGraph"\n                                               ng-required="extractionMethod.selected && extractionMethod.sparqlOption === \'ontologyGraph\'"\n                                               ng-model="extractionMethod.ontologyGraph">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="sparql-option sparql-query-option">\n                                <label class="radio-inline"\n                                       uib-popover="{{\'ttyg.agent.create_agent_modal.form.construct_query.tooltip\' | translate}}"\n                                       popover-trigger="mouseenter">\n                                    <input type="radio" name="sparqlOption" ng-required="extractionMethod.selected"\n                                           ng-model="extractionMethod.sparqlOption" value="sparqlQuery">\n                                    {{\'ttyg.agent.create_agent_modal.form.construct_query.label\' | translate}}\n                                </label>\n                                <div class="panel" ng-show="extractionMethod.sparqlOption === \'sparqlQuery\'">\n                                    <div class="form-group">\n                                            <textarea type="text" class="form-control" id="sparqlQuery"\n                                                      name="sparqlQuery" rows="10"\n                                                      ng-required="extractionMethod.selected && extractionMethod.sparqlOption === \'sparqlQuery\'"\n                                                      ng-minlength="extractionMethod.sparqlQuery.minLength"\n                                                      ng-maxlength="extractionMethod.sparqlQuery.maxLength"\n                                                      ng-model="extractionMethod.sparqlQuery.value">\n                                            </textarea>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="alert alert-danger sparql-method-option-required-error mb-0"\n                                 ng-if="extractionMethod.selected && !extractionMethod.sparqlOption">\n                                {{\'ttyg.agent.create_agent_modal.form.sparql_search.required_option\' | translate}}\n                            </div>\n                            <div class="add-missing-namespaces-option mt-1">\n                                <input id="addMissingNamespaces" name="addMissingNamespaces" type="checkbox"\n                                       ng-model="extractionMethod.addMissingNamespaces">\n                                <label for="addMissingNamespaces"\n                                       uib-popover="{{\'ttyg.agent.create_agent_modal.form.add_missing_namespaces.tooltip\' | translate}}"\n                                       popover-trigger="mouseenter">{{\n                                    \'ttyg.agent.create_agent_modal.form.add_missing_namespaces.label\' | translate\n                                    }}</label>\n                            </div>\n                        </div>\n\n                        \x3c!-- FTS method settings --\x3e\n\n                        <div\n                            ng-if="extractionMethod.expanded && extractionMethod.method === extractionMethods.FTS_SEARCH"\n                            ng-class="{\'has-error\': agentSettingsForm.$error.FTSDisabled}"\n                            class="extraction-method-options">\n                            <button class="btn btn-link btn-sm pull-right"\n                                    ng-click="checkIfFTSEnabled()"\n                                    gdb-tooltip="{{\'ttyg.agent.create_agent_modal.form.fts_search.btn.reload.tooltip\' | translate}}">\n                                <i class="fa fa-arrows-rotate"></i>\n                            </button>\n                            <div class="alert alert-danger missing-repositoryid-error mb-0"\n                                 ng-if="!agentFormModel.repositoryId">\n                                {{\'ttyg.agent.create_agent_modal.form.fts_search.missing_repository_id\' | translate}}\n                            </div>\n                            <div ng-if="!ftsEnabled && agentFormModel.repositoryId" class="fts-disabled-message"\n                                 ng-bind-html="getFTSDisabledHelpMessage()">\n                            </div>\n                            <div class="form-group max-triples" ng-show="ftsEnabled && agentFormModel.repositoryId">\n                                <label for="{{extractionMethods.FTS_SEARCH + \'_maxNumberOfTriplesPerCall\'}}"\n                                       uib-popover="{{\'ttyg.agent.create_agent_modal.form.fts_search_max_number_of_triples_per_call.tooltip\' | translate}}"\n                                       popover-trigger="mouseenter">\n                                    {{\'ttyg.agent.create_agent_modal.form.fts_search_max_number_of_triples_per_call.label\'\n                                    |\n                                    translate}}\n                                </label>\n                                <input type="number" class="form-control"\n                                       id="{{extractionMethods.FTS_SEARCH + \'_maxNumberOfTriplesPerCall\'}}"\n                                       name="maxNumberOfTriplesPerCall" min="0"\n                                       ng-model="extractionMethod.maxNumberOfTriplesPerCall"\n                                       placeholder="{{\'ttyg.agent.create_agent_modal.form.fts_search_max_number_of_triples_per_call.placeholder\' | translate}}">\n                            </div>\n                        </div>\n\n                        \x3c!-- Similarity method settings --\x3e\n\n                        <div\n                            ng-if="extractionMethod.expanded && extractionMethod.method === extractionMethods.SIMILARITY"\n                            ng-class="{\'has-error\': agentSettingsForm.$error.missingIndex}"\n                            class="extraction-method-options">\n                            <button class="btn btn-link btn-sm pull-right"\n                                    ng-click="updateSimilaritySearchPanel()"\n                                    ng-disabled="disabled"\n                                    gdb-tooltip="{{\'ttyg.agent.create_agent_modal.form.similarity_index.btn.reload.tooltip\' | translate}}">\n                                <i class="fa fa-arrows-rotate"></i>\n                            </button>\n                            <div ng-if="!similarityIndexes.length" class="no-similarity-index-message">\n                                {{\'ttyg.agent.create_agent_modal.form.similarity_index.no_similarity_index.message_1\' |\n                                translate}}\n                                <a href="#" ng-click="goToCreateSimilarityView()">\n                                    {{\'ttyg.agent.create_agent_modal.form.similarity_index.no_similarity_index.message_2\'\n                                    | translate}}\n                                </a>\n                                {{\'ttyg.agent.create_agent_modal.form.similarity_index.no_similarity_index.message_3\' |\n                                translate}}.\n                            </div>\n                            <div ng-show="similarityIndexes.length">\n                                <div class="form-group similarity-index">\n                                    <label for="similarityIndex"\n                                           uib-popover="{{\'ttyg.agent.create_agent_modal.form.similarity_index.tooltip\' | translate}}"\n                                           popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.similarity_index.label\'\n                                        | translate}}</label>\n                                    <span ng-if="extractionMethodLoaderFlags.similarity_search" onto-loader-fancy\n                                          size="16"></span>\n                                    <select class="form-control" id="similarityIndex" name="similarityIndex"\n                                            ng-required="extractionMethod.selected"\n                                            ng-if="!extractionMethodLoaderFlags.similarity_search"\n                                            ng-model="extractionMethod.similarityIndex"\n                                            ng-options="similarityIndex.value as similarityIndex.label for similarityIndex in similarityIndexes">\n                                    </select>\n                                    <div class="alert alert-danger"\n                                         ng-if="extractionMethod.similarityIndex.$touched && extractionMethod.similarityIndex.$invalid">\n                                        {{\'required.field\' | translate}}\n                                    </div>\n                                </div>\n                                <div class="form-group similarity-index-threshold">\n                                    <label for="similarityIndexThreshold"\n                                           uib-popover="{{\'ttyg.agent.create_agent_modal.form.similarity_threshold.tooltip\' | translate}}"\n                                           popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.similarity_threshold.label\'\n                                        | translate}}</label>\n                                    <input type="text" class="form-control" id="similarityIndexThreshold"\n                                           name="similarityIndexThreshold" readonly\n                                           ng-model="extractionMethod.similarityIndexThreshold.value">\n                                    <input id="similarityIndexThresholdSlider" name="similarityIndexThreshold"\n                                           type="range" ng-required="extractionMethod.selected"\n                                           min="{{extractionMethod.similarityIndexThreshold.minValue}}"\n                                           max="{{extractionMethod.similarityIndexThreshold.maxValue}}"\n                                           step="0.1"\n                                           ng-model="extractionMethod.similarityIndexThreshold.value"/>\n                                </div>\n                                <div class="form-group similarity-max-triples">\n                                    <label for="{{extractionMethods.SIMILARITY + \'_maxNumberOfTriplesPerCall\'}}"\n                                           uib-popover="{{\'ttyg.agent.create_agent_modal.form.similarity_search_max_number_of_triples_per_call.tooltip\' | translate}}"\n                                           popover-trigger="mouseenter">\n                                        {{\'ttyg.agent.create_agent_modal.form.similarity_search_max_number_of_triples_per_call.label\'\n                                        | translate}}</label>\n                                    <input type="number" class="form-control"\n                                           id="{{extractionMethods.SIMILARITY + \'_maxNumberOfTriplesPerCall\'}}"\n                                           name="maxNumberOfTriplesPerCall" min="0"\n                                           ng-model="extractionMethod.maxNumberOfTriplesPerCall"\n                                           placeholder="{{\'ttyg.agent.create_agent_modal.form.similarity_search_max_number_of_triples_per_call.placeholder\' | translate}}">\n                                </div>\n                            </div>\n                        </div>\n\n                        \x3c!-- Retrieval method settings --\x3e\n\n                        <div\n                            ng-if="extractionMethod.expanded && extractionMethod.method === extractionMethods.RETRIEVAL"\n                            ng-class="{\'has-error\': agentSettingsForm.$error.missingConnector}"\n                            class="extraction-method-options">\n                            <button class="btn btn-link btn-sm pull-right"\n                                    ng-click="updateRetrievalConnectorPanel()"\n                                    ng-disabled="disabled"\n                                    gdb-tooltip="{{\'ttyg.agent.create_agent_modal.form.retrieval_search.btn.reload.tooltip\' | translate}}">\n                                <i class="fa fa-arrows-rotate"></i>\n                            </button>\n                            <div ng-if="!retrievalConnectors.length" class="no-retrieval-connector-message">\n                                {{\'ttyg.agent.create_agent_modal.form.retrieval_search.no_retrieval_connectors.message_1\'\n                                | translate}}\n                                <a href="#" ng-click="goToConnectorsView()">\n                                    {{\'ttyg.agent.create_agent_modal.form.retrieval_search.no_retrieval_connectors.message_2\'\n                                    | translate}}\n                                </a>\n                                {{\'ttyg.agent.create_agent_modal.form.retrieval_search.no_retrieval_connectors.message_3\'\n                                | translate}}.\n                            </div>\n                            <div ng-show="retrievalConnectors.length">\n                                <div class="form-group retrieval-connector">\n                                    <label for="retrievalConnectorInstance"\n                                           uib-popover="{{\'ttyg.agent.create_agent_modal.form.connector_id.tooltip\' | translate}}"\n                                           popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.connector_id.label\'\n                                        | translate}}</label>\n                                    <span ng-if="extractionMethodLoaderFlags.retrieval_search" onto-loader-fancy\n                                          size="16"></span>\n                                    <select class="form-control" id="retrievalConnectorInstance"\n                                            name="retrievalConnectorInstance"\n                                            ng-required="extractionMethod.selected"\n                                            ng-if="!extractionMethodLoaderFlags.retrieval_search"\n                                            ng-model="extractionMethod.retrievalConnectorInstance"\n                                            ng-options="retrievalConnector.value as retrievalConnector.label for retrievalConnector in retrievalConnectors">\n                                    </select>\n                                    <div class="alert alert-danger"\n                                         ng-if="extractionMethod.retrievalConnectorInstance.$touched && extractionMethod.retrievalConnectorInstance.$invalid">\n                                        {{\'required.field\' | translate}}\n                                    </div>\n                                </div>\n                                <div class="form-group query-template">\n                                    <label for="queryTemplate"\n                                           uib-popover="{{\'ttyg.agent.create_agent_modal.form.query_template.tooltip\' | translate}}"\n                                           popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.query_template.label\'\n                                        |\n                                        translate}}</label>\n                                    <textarea type="text" class="form-control" id="queryTemplate" name="queryTemplate"\n                                              rows="10" ng-required="extractionMethod.selected"\n                                              ng-minlength="extractionMethod.queryTemplate.minLength"\n                                              ng-maxlength="extractionMethod.queryTemplate.maxLength"\n                                              ng-model="extractionMethod.queryTemplate.value">\n                                    </textarea>\n                                    <div class="alert alert-danger"\n                                         ng-if="extractionMethod.name.$touched && extractionMethod.name.$invalid">\n                                        {{\'required.field\' | translate}}\n                                    </div>\n                                </div>\n                                <div class="form-group retrieval-connector-max-triples">\n                                    <label for="{{extractionMethods.RETRIEVAL + \'_maxNumberOfTriplesPerCall\'}}"\n                                           uib-popover="{{\'ttyg.agent.create_agent_modal.form.retrieval_search_max_number_of_triples_per_call.tooltip\' | translate}}"\n                                           popover-trigger="mouseenter">\n                                        {{\'ttyg.agent.create_agent_modal.form.retrieval_search_max_number_of_triples_per_call.label\'\n                                        | translate}}</label>\n                                    <input type="number" class="form-control"\n                                           id="{{extractionMethods.RETRIEVAL + \'_maxNumberOfTriplesPerCall\'}}"\n                                           name="maxNumberOfTriplesPerCall" min="0"\n                                           ng-model="extractionMethod.maxNumberOfTriplesPerCall"\n                                           placeholder="{{\'ttyg.agent.create_agent_modal.form.retrieval_search_max_number_of_triples_per_call.placeholder\' | translate}}">\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n            <div class="alert alert-danger extraction-method-required-error"\n                 ng-if="agentSettingsForm.extractionMethods.$touched && agentSettingsForm.extractionMethods.$invalid">\n                {{\'ttyg.agent.create_agent_modal.form.extraction_method.required\' | translate}}\n            </div>\n        </div>\n\n        <div class="form-group additional-extraction-methods">\n            <label uib-popover="{{\'ttyg.agent.create_agent_modal.form.additional_query_methods.tooltip\' | translate}}"\n                   popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.additional_query_methods.label\' |\n                translate}}</label>\n            <div\n                ng-repeat="additionalExtractionMethod in agentFormModel.additionalExtractionMethods.additionalExtractionMethods"\n                class="additional-extraction-method">\n                <input type="checkbox" id="{{additionalExtractionMethod.method + \'_checkbox\'}}"\n                       name="{{additionalExtractionMethod.method}}" class="switch"\n                       ng-model="additionalExtractionMethod.selected"/>\n                <label for="{{additionalExtractionMethod.method + \'_checkbox\'}}"></label>\n                <a class="btn btn-link extraction-method-label" uib-popover="{{\'ttyg.agent.create_agent_modal.form.additional_query_methods.method.\' +\n                    additionalExtractionMethod.method + \'.tooltip\' | translate}}"\n                   popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.additional_query_methods.method.\'\n                    +\n                    additionalExtractionMethod.method + \'.label\' | translate}}</a>\n            </div>\n        </div>\n\n        <div class="form-row clearfix">\n            <div class="form-group gpt-model col-md-4">\n                <label for="model" uib-popover="{{\'ttyg.agent.create_agent_modal.form.model.tooltip\' | translate}}"\n                       popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.model.label\' |\n                    translate}}</label>\n                <input type="text" class="form-control" id="model" name="model" ng-model="agentFormModel.model"\n                       required autocomplete="off">\n                <small id="modelHelp" class="form-text text-muted"\n                       ng-bind-html="getModelHelpMessage()">\n                </small>\n                <div class="alert alert-danger"\n                     ng-if="agentSettingsForm.model.$touched && agentSettingsForm.model.$invalid">\n                    {{\'required.field\' | translate}}\n                </div>\n            </div>\n            <div class="form-group temperature col-md-4">\n                <label for="temperature">\n                    <span uib-popover="{{\'ttyg.agent.create_agent_modal.form.temperature.tooltip\' | translate}}"\n                          popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.temperature.label\' | translate}}</span>\n                    <i class="fa fa-triangle-exclamation text-warning high-temperature-warning"\n                       ng-if="showHighTemperatureWarning"\n                       uib-popover="{{\'ttyg.agent.create_agent_modal.form.temperature.high_temperature_warning\' | translate}}"\n                       popover-trigger="mouseenter"></i>\n                </label>\n                <input type="text" id="temperature" name="temperature" readonly\n                       class="form-control" ng-class="{\'has-warning\': showHighTemperatureWarning}"\n                       ng-model="agentFormModel.temperature.value">\n                <input id="temperatureSlider" name="temperature" type="range"\n                       min="{{agentFormModel.temperature.minValue}}"\n                       max="{{agentFormModel.temperature.maxValue}}" step="{{agentFormModel.temperature.step}}"\n                       ng-change="onTemperatureChange()"\n                       ng-model="agentFormModel.temperature.value"/>\n            </div>\n            <div class="form-group top-p col-md-4">\n                <label for="topP" uib-popover="{{\'ttyg.agent.create_agent_modal.form.top_p.tooltip\' | translate}}"\n                       popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.top_p.label\' |\n                    translate}}</label>\n                <input type="text" class="form-control" id="topP" name="topP" readonly\n                       ng-model="agentFormModel.topP.value">\n                <input id="topPSlider" name="topP" type="range" min="{{agentFormModel.topP.minValue}}"\n                       max="{{agentFormModel.topP.maxValue}}" step="{{agentFormModel.topP.step}}"\n                       ng-model="agentFormModel.topP.value"/>\n            </div>\n            \x3c!--            Hidden for now because currently this property doesn\'t work in openai, but in the future it will --\x3e\n            \x3c!--            <div class="form-group seed col-md-4 pr-0">--\x3e\n            \x3c!--                <label for="seed">{{\'ttyg.agent.create_agent_modal.form.seed.label\' | translate}}</label>--\x3e\n            \x3c!--                <input type="number" class="form-control" id="seed" name="seed" min="0" ng-model="agentFormModel.seed"--\x3e\n            \x3c!--                       placeholder="{{\'ttyg.agent.create_agent_modal.form.seed.hint\' | translate}}">--\x3e\n            \x3c!--            </div>--\x3e\n        </div>\n\n        <div class="form-group user-instructions">\n            <div class="toolbar">\n                <label for="userInstruction"\n                       uib-popover="{{\'ttyg.agent.create_agent_modal.form.user_instruction.tooltip\' | translate}}"\n                       popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.user_instruction.label\' |\n                    translate}}</label>\n                <div class="actions">\n                    <copy-to-clipboard\n                        tooltip-text="ttyg.agent.create_agent_modal.form.user_instruction.btn.copy_instruction.tooltip"\n                        text-to-copy="{{agentFormModel.instructions.userInstruction}}"></copy-to-clipboard>\n                    <button class="btn btn-link btn-sm create-chat-btn"\n                            ng-click="onRestoreDefaultUserInstructions()"\n                            gdb-tooltip="{{\'ttyg.agent.create_agent_modal.form.user_instruction.btn.restore_default.tooltip\' | translate}}">\n                        <i class="fa fa-arrow-rotate-left"></i>\n                    </button>\n                </div>\n            </div>\n            <textarea type="text" class="form-control" id="userInstruction" name="userInstruction" rows="5"\n                      ng-model="agentFormModel.instructions.userInstruction"\n                      placeholder="{{\'ttyg.agent.create_agent_modal.form.user_instruction.placeholder\' | translate}}">\n                </textarea>\n        </div>\n\n        <div class="text-xs-center">\n            <button type="button" ng-click="showAdvancedSettings = !showAdvancedSettings"\n                    class="btn btn-link btn-sm toggle-advanced-settings">\n                <span ng-hide="showAdvancedSettings">{{\'ttyg.agent.create_agent_modal.advanced_settings.show\' | translate}}<em\n                    class="icon-caret-down"></em></span>\n                <span ng-show="showAdvancedSettings">{{\'ttyg.agent.create_agent_modal.advanced_settings.hide\' | translate}}<em\n                    class="icon-caret-up"></em></span>\n            </button>\n        </div>\n\n        <div ng-show="showAdvancedSettings" class="advanced-settings">\n            <div class="form-group system-instructions">\n                <div class="toolbar">\n                    <label for="systemInstruction">\n                        <span\n                            uib-popover="{{\'ttyg.agent.create_agent_modal.form.system_instruction.tooltip\' | translate}}"\n                            popover-trigger="mouseenter">{{\'ttyg.agent.create_agent_modal.form.system_instruction.label\' | translate}}</span>\n                        <i class="fa fa-triangle-exclamation text-warning overriding-system-instructions-warning"\n                           ng-if="showSystemInstructionWarning"\n                           uib-popover="{{\'ttyg.agent.create_agent_modal.form.system_instruction.overriding_system_instruction_warning.body\' | translate}}"\n                           popover-trigger="mouseenter"></i>\n                    </label>\n                    <div class="actions">\n                        <copy-to-clipboard\n                            tooltip-text="ttyg.agent.create_agent_modal.form.system_instruction.btn.copy_instruction.tooltip"\n                            text-to-copy="{{agentFormModel.instructions.systemInstruction}}"></copy-to-clipboard>\n                        <button class="btn btn-link btn-sm create-chat-btn"\n                                ng-click="onRestoreDefaultSystemInstructions()"\n                                gdb-tooltip="{{\'ttyg.agent.create_agent_modal.form.system_instruction.btn.restore_default.tooltip\' | translate}}">\n                            <i class="fa fa-arrow-rotate-left"></i>\n                        </button>\n                    </div>\n                </div>\n                <textarea type="text" class="form-control" id="systemInstruction" name="systemInstruction" rows="5"\n                          placeholder="{{\'ttyg.agent.create_agent_modal.form.system_instruction.placeholder\' | translate}}"\n                          ng-class="{\'has-warning\': showSystemInstructionWarning}"\n                          ng-model="agentFormModel.instructions.systemInstruction"\n                          ng-change="onSystemInstructionChange()">\n                </textarea>\n            </div>\n        </div>\n    </form>\n</div>\n\n<div class="modal-footer">\n    <button type="button" ng-click="onExplainAgentSettings()" class="btn explain-agent-settings-btn">\n        {{\'ttyg.agent.create_agent_modal.btn.explain_settings.label\' | translate}}\n    </button>\n    <div>\n        <button type="button" ng-click="cancel()" class="btn cancel-btn">\n            {{\'ttyg.agent.create_agent_modal.btn.cancel.label\' | translate}}\n        </button>\n        <button type="button" ng-click="ok()" ng-disabled="agentSettingsForm.$invalid || savingAgent"\n                class="btn btn-primary save-agent-settings-btn">\n            <span>{{(operation === AGENT_OPERATION.EDIT ? \'ttyg.agent.create_agent_modal.btn.save.label\'\n            : operation === AGENT_OPERATION.CLONE ? \'ttyg.agent.create_agent_modal.btn.save.label\'\n            : \'ttyg.agent.create_agent_modal.btn.create.label\') | translate}}</span>\n            <span class="saving-agent-loader" ng-if="savingAgent" onto-loader-fancy hide-message="true"\n                  size="15"></span>\n        </button>\n    </div>\n</div>\n';return __p}}}]);