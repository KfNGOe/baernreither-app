PluginRegistry.add('route', {
    'url': '/aclmanagement',
    'module': 'graphdb.framework.aclmanagement',
    'path': 'aclmanagement/app',
    'chunk': 'aclmanagement',
    'controller': 'AclManagementCtrl',
    'templateUrl': 'pages/aclmanagement.html',
    'title': 'view.aclmanagement.title',
    'helpInfo': 'view.aclmanagement.helpInfo',
    'documentationUrl': 'managing-fgac-workbench.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "icon-settings",
            guideSelector: 'menu-setup'
        },
        {
            label: 'ACL Management',
            labelKey: 'menu.aclmanagement.label',
            href: 'aclmanagement',
            order: 6,
            parent: 'Setup',
            role: "ROLE_ADMIN",
            guideSelector: 'sub-menu-aclmanagement'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/autocomplete',
    'module': 'graphdb.framework.autocomplete',
    'path': 'autocomplete/app',
    'chunk': 'autocomplete',
    'controller': 'AutocompleteCtrl',
    'templateUrl': 'pages/autocomplete.html',
    'title': 'view.autocomplete.title',
    'helpInfo': 'view.autocomplete.helpInfo',
    'documentationUrl': 'autocomplete-index.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {label: 'Setup', labelKey: 'menu.setup.label', href: '#', order: 5, role: 'IS_AUTHENTICATED_FULLY', icon: "icon-settings", guideSelector: 'menu-setup'},
        {label: 'Autocomplete', labelKey: 'menu.autocomplete.label', href: 'autocomplete', order: 40, parent: 'Setup', role: "IS_AUTHENTICATED_FULLY", guideSelector: 'sub-menu-autocomplete'}
    ]
});

PluginRegistry.add('route', {
    'url': '/monitor/backup-and-restore',
    'module': 'graphdb.framework.monitoring.backupandrestore',
    'path': 'backup-and-restore/app',
    'chunk': 'monitor-backup-and-restore',
    'controller': 'BackupAndRestoreCtrl',
    'templateUrl': 'pages/monitor/backup-and-restore.html',
    'title': 'view.monitoring.backup_and_restore.title',
    'helpInfo': 'view.monitoring.backup_and_restore.helpInfo',
    'documentationUrl': 'backup-and-restore.html#monitoring-your-recovery-operations'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Backup and Restore',
            labelKey: 'menu.backup_and_restore.label',
            href: 'monitor/backup-and-restore',
            order: 2,
            parent: 'Monitor',
            guideSelector: 'sub-menu-backup-and-restore'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/cluster',
        'module': 'graphdb.framework.clustermanagement',
        'chunk': 'clustermanagement',
        'path': 'clustermanagement/app',
        'controller': 'ClusterManagementCtrl',
        'templateUrl': 'pages/cluster-management/clusterInfo.html',
        'helpInfo': 'view.clusterManagement.helpInfo',
        'title': 'view.clusterManagement.title',
        'documentationUrl': 'creating-a-cluster.html#using-the-workbench'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [{
        label: 'Cluster',
        labelKey: 'menu.cluster.label',
        href: 'cluster',
        order: 20,
        role: 'ROLE_USER',
        parent: 'Setup',
        guideSelector: 'sub-menu-cluster'
    }]
});


PluginRegistry.add('route', [
    {
        'url': '/resource',
        'module': 'graphdb.framework.explore',
        'chunk': 'explore',
        'path': 'explore/app',
        'controller': 'ExploreCtrl',
        'templateUrl': 'pages/explore.html',
        'title': 'view.resource.title'
    }, {
        'url': '/resource/edit',
        'module': 'graphdb.framework.explore',
        'chunk': 'explore',
        'path': 'explore/app',
        'controller': 'EditResourceCtrl',
        'templateUrl': 'pages/edit.html',
        'title': 'view.resource.title'
    }, {
        'url': '/resource/:any*',
        'module': 'graphdb.framework.explore',
        'chunk': 'explore',
        'path': 'explore/app',
        'controller': 'ExploreCtrl',
        'templateUrl': 'pages/explore.html',
        'title': 'view.resource.title'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [{
        label: 'Explore',
        labelKey: 'menu.explore.label',
        href: '#',
        order: 1,
        role: 'IS_AUTHENTICATED_FULLY',
        icon: "icon-data",
        guideSelector: 'menu-explore'
    }]
});

PluginRegistry.add('route', {
    'url': '/graphs',
    'module': 'graphdb.framework.impex.export',
    'path': 'export/app',
    'chunk': 'export',
    'controller': 'ExportCtrl',
    'templateUrl': 'pages/export.html',
    'title': 'menu.graphs.overview.label',
    'helpInfo': 'view.export.ctr.helpInfo ',
    'documentationUrl': 'working-with-workbench.html#wbmenu-graphs-overview'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Explore',
            labelKey: 'menu.explore.label',
            href: '#',
            order: 1,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-data',
            guideSelector: 'menu-explore'
        },
        {
            label: 'Graphs overview',
            labelKey: 'menu.graphs.overview.label',
            href: 'graphs',
            order: 0,
            role: 'IS_AUTHENTICATED_FULLY',
            parent: 'Explore',
            guideSelector: 'sub-menu-graph-overview'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/connectors',
    'module': 'graphdb.framework.externalsync',
    'path': 'externalsync/app',
    'chunk': 'externalsync',
    'controller': 'ConnectorsCtrl',
    'templateUrl': 'pages/connectorsInfo.html',
    'title': 'view.connector.management.title',
    'helpInfo': 'view.connector.management.helpInfo',
    'documentationUrl': 'connectors.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        },
        {
            label: 'Connectors',
            labelKey: 'menu.connectors.label',
            href: 'connectors',
            order: 10,
            parent: 'Setup',
            role: 'IS_AUTHENTICATED_FULLY',
            guideSelector: 'sub-menu-connectors'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/hierarchy',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'hierarchy',
        'controller': 'RdfClassHierarchyCtlr',
        'templateUrl': 'pages/rdfClassHierarchyInfo.html',
        'title': 'view.class.hierarchy.title',
        'reloadOnSearch': false,
        'helpInfo': 'view.class.hierarchy.helpInfo',
        'documentationUrl': 'explore-data-and-class-relationships.html#class-hierarchy'

    }, {
        'url': '/domain-range-graph',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'domain-range-graph',
        'controller': 'DomainRangeGraphCtlr',
        'templateUrl': 'pages/domainRangeInfo.html',
        'title': 'view.domain.range.graph.title',
        'helpInfo': 'view.domain.range.graph.helpInfo'
    }, {
        'url': '/relationships',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'relationships',
        'controller': 'DependenciesChordCtrl',
        'templateUrl': 'pages/dependencies.html',
        'title': 'view.class.relationships.title',
        'helpInfo': 'view.class.relationships.helpInfo',
        'documentationUrl': 'explore-data-and-class-relationships.html#class-relationships'
    }, {
        'url': '/graphs-visualizations',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'graphs-visualizations',
        'controller': 'GraphsVisualizationsCtrl',
        'templateUrl': 'pages/graphs-visualizations.html',
        'title': 'visual.graph.label',
        'reloadOnSearch': false,
        'helpInfo': 'view.visual.graph.helpInfo',
        'documentationUrl': 'visualize-and-explore.html#explore-resources-through-the-easy-graph'
    }, {
        'url': '/graphs-visualizations/config/save/:configName?',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'graph-config',
        'controller': 'GraphConfigCtrl',
        'templateUrl': 'pages/graph-config/saveGraphConfig.html',
        'title': 'view.create.visual.graph.title',
        'helpInfo': 'view.create.visual.graph.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Explore',
            labelKey: 'menu.explore.label',
            href: '#',
            order: 1,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-data',
            guideSelector: 'menu-explore'
        }, {
            label: 'Class relationships',
            labelKey: 'menu.class.relationships.label',
            href: 'relationships',
            order: 2,
            parent: 'Explore',
            guideSelector: 'sub-menu-class-relationships'
        }, {
            label: 'Class hierarchy',
            labelKey: 'menu.class.hierarchy.label',
            href: 'hierarchy',
            order: 1,
            parent: 'Explore',
            guideSelector: 'menu-class-hierarchy'
        }, {
            label: 'Visual graph',
            labelKey: 'visual.graph.label',
            href: 'graphs-visualizations',
            order: 5,
            parent: 'Explore',
            children: [{
                href: 'graphs-visualizations/config/save',
                children: []
            }],
            guideSelector: 'sub-menu-visual-graph'
        }
    ]
});

PluginRegistry.add('route', [
    {
        url: '/guides',
        module: 'graphdb.framework.guides',
        path: 'guides/app',
        templateUrl: 'pages/guides.html',
        title: 'view.guides.title',
        controller: 'GuidesCtrl',
        helpInfo: 'view.guides.helpInfo',
        documentationUrl: 'index.html'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Guides',
            labelKey: 'menu.guides.label',
            order: 0,
            parent: 'Help',
            icon: 'paste',
            href: 'guides',
            role: 'ROLE_USER',
            guideSelector: 'sub-menu-guide'
        }
    ]
});

const reloadAndOpenInfoPanel = (services, clasInstanceSelector) => {
    services.$location.path('/hierarchy').search({});
    return services.GuideUtils.waitFor(clasInstanceSelector, 3)
        .then(() => {
            services.GuideUtils.classHierarchyFocus(clasInstanceSelector);
            // Wait a little time animation to complete.
            return services.GuideUtils.deferredShow(500)();
        });
};

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'class-hierarchy',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            options.mainAction = 'class-hierarchy';

            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'class-hierarchy',
                        showIntro: true
                    }, options)
                }, {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class_hierarchy_intro.content',
                        url: '/hierarchy',
                        elementSelector: '#classChart',
                        placement: 'left'
                    }, options)
                }
            ];

            if (options.introExtraContent) {
                steps.push({
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: '',
                        extraContent: options.introExtraContent,
                        url: '/hierarchy',
                        elementSelector: '#classChart #main-group',
                        class: 'clas-hierarchy-intro-guide-dialog',
                        placement: 'left'
                    }, options)
                });
            }

            if (angular.isArray(options.zoomIris)) {
                options.zoomIris.forEach((zoomIri) => {
                    const selector = GuideUtils.getGuideElementSelector('class-' + zoomIri.iri);
                    steps.push({
                        guideBlockName: 'clickable-element',
                        options: angular.extend({}, {
                            content: 'guide.step_plugin.class_hierarchy_zoom.content',
                            url: '/hierarchy',
                            placement: 'left',
                            elementSelector: selector,
                            class: 'class-hierarchy-zoom-content-guide-dialog',
                            onNextClick: (guide, step) => {
                                GuideUtils.classHierarchyZoom(step.elementSelector);
                                guide.next();
                            }
                        }, options, zoomIri)
                    });
                    if (zoomIri.postExtraContent) {
                        steps.push({
                            guideBlockName: 'read-only-element',
                            options: angular.extend({}, {
                                content: '',
                                extraContent: zoomIri.postExtraContent,
                                url: '/hierarchy',
                                placement: 'left',
                                beforeShowPromise: GuideUtils.deferredShow(800),
                                elementSelector: selector,
                                class: 'class-hierarchy-instances-guide-dialog'
                            }, options)
                        });
                    }
                });
            }

            return steps;
        }
    },
    {
        guideBlockName: 'class-hierarchy-instances',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $location = services.$location;
            const $route = services.$route;
            options.title = 'guide.step_plugin.class-hierarchy-instances.title';
            const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
            const clasInstanceSelector = GuideUtils.getGuideElementSelector('class-' + options.iri);
            const steps = [
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances.content',
                        url: '/hierarchy',
                        elementSelector: clasInstanceSelector,
                        class: 'class-hierarchy-instance-guide-dialog',
                        placement: 'top',
                        onNextClick: (guide) => {
                            GuideUtils.classHierarchyFocus(clasInstanceSelector);
                            guide.next();
                        },
                        initPreviousStep: () => {
                            if (!GuideUtils.isVisible(closeButtonSelector)) {
                                return reloadAndOpenInfoPanel({$location, $route, GuideUtils}, clasInstanceSelector);
                            }

                            return Promise.resolve();
                        }
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances-side-panel.content',
                        url: '/hierarchy',
                        elementSelector: '.rdf-info-side-panel div',
                        class: 'class-hierarchy-side-panel-info-guide-dialog',
                        canBePaused: false,
                        placement: 'left',
                        beforeShowPromise: GuideUtils.deferredShow(800),
                        onPreviousClick: () => new Promise(function (resolve) {
                            GuideUtils.waitFor(closeButtonSelector, 1)
                                .then(() => $(closeButtonSelector).trigger('click'));
                            resolve();
                        })
                    }, options)
                }
            ];

            if (angular.isArray(options.focusInstances)) {
                options.focusInstances.forEach((focusInstance) => {
                    if (!angular.isObject(focusInstance)) {
                        focusInstance = {
                            instance: focusInstance
                        };
                    }
                    steps.push({
                        guideBlockName: 'read-only-element',
                        options: angular.extend({}, {
                            content: 'guide.step_plugin.class-hierarchy-instances-focus.content',
                            url: '/hierarchy',
                            canBePaused: false,
                            elementSelector: GuideUtils.getGuideElementSelector('instance-' + focusInstance.instance),
                            class: 'class-hierarchy-side-bar-instance-info-guide-dialog',
                            focusInstance: focusInstance.instance,
                            extraContent: focusInstance.message
                        }, options)
                    });
                });
            }

            const instanceCountSelector = GuideUtils.getGuideElementSelector('instances-count');
            if (options.followCountLink) {
                steps.push({
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances-count.content',
                        url: '/hierarchy',
                        canBePaused: false,
                        elementSelector: instanceCountSelector,
                        class: 'class-hierarchy-side-panel-instances-count-guide-dialog',
                        onNextClick: (guide, step) => {
                            GuideUtils.waitFor(step.elementSelector, 3)
                                .then(() => $(step.elementSelector).trigger('click'));
                            guide.next();
                        }
                    }, options)
                });

                steps.push({
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances-query.content',
                        url: '/sparql',
                        elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR,
                        beforeShowPromise: () => GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR, 3)
                            .then(() => GuideUtils.deferredShow(500)()),
                        class: 'class-hierarchy-instances-query-guide-dialog',
                        scrollToHandler: GuideUtils.scrollToTop
                    }, options)
                });
                steps.push({
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances-results.content',
                        extraContent: options.showExtraCommentSparql !== false ?
                            'guide.step_plugin.class-hierarchy-instances-results.extraContent' : null,
                        url: '/sparql',
                        placement: 'top',
                        elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_SELECTOR,
                        class: 'class-hierarchy-instances-results-guide-dialog',
                        fileName: options.fileName,
                        scrollToHandler: GuideUtils.scrollToTop,
                        onNextClick: (guide) => {
                            window.history.back();
                            guide.next();
                        },
                        initPreviousStep: () => Promise.resolve()
                    }, options)
                });
            }

            steps.push({
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step_plugin.class-hierarchy-instances-side-panel-close.content',
                    url: '/hierarchy',
                    canBePaused: false,
                    elementSelector: closeButtonSelector,
                    class: 'class-hierarchy-side-panel-close-guide-dialog',
                    placement: 'left',
                    // If we followed the count link we come back here from another view
                    // and the side panel needs time to open
                    beforeShowPromise: options.followCountLink ? GuideUtils.deferredShow(1500) : Promise.resolve(),
                    advanceOn: {
                        selector: closeButtonSelector,
                        event: 'click'
                    },
                    onNextClick: () => GuideUtils.waitFor(closeButtonSelector, 3)
                        .then(() => $(closeButtonSelector).trigger('click')),
                    initPreviousStep: (services, stepId) => {

                        const currentStepId = services.ShepherdService.getCurrentStepId();
                        // If method is called from same step just click count link
                        if (currentStepId === stepId && options.followCountLink) {
                            return GuideUtils.waitFor(instanceCountSelector, 3)
                                .then(() => {
                                    $(instanceCountSelector).trigger('click');
                                    return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_SELECTOR, 3)
                                        .then(() => GuideUtils.deferredShow(50)());
                                });
                        }
                        // If is called from other step we have to reload and open the info panel.
                        return reloadAndOpenInfoPanel({$location, $route, GuideUtils}, clasInstanceSelector);
                    }
                }, options)
            });

            return steps;
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'create-repository',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            options.mainAction = 'create-repository';

            const repositoryIdInputSelector = GuideUtils.getGuideElementSelector('graphDBRepositoryIdInput');
            const repositoryId = options.repositoryId;
            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'repositories',
                        showIntro: true
                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.create_repository.create_repository_button.content',
                        class: 'create-repository-guide-dialog',
                        url: '/repository',
                        elementSelector: GuideUtils.getGuideElementSelector('createRepository'),
                        onNextClick: (guide) => GuideUtils.clickOnGuideElement('createRepository')().then(() => guide.next())

                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.create_repository.graph_db_repository.content',
                        class: 'create-gdb-repository-guide-dialog',
                        url: '/repository/create',
                        elementSelector: GuideUtils.getGuideElementSelector('createGraphDBRepository'),
                        onNextClick: GuideUtils.clickOnGuideElement('createGraphDBRepository')
                    }, options)
                }, {
                    guideBlockName: 'input-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.create_repository.repository_id.content',
                        class: 'gdb-repository-id-input-guide-dialog',
                        url: '/repository/create/graphdb',
                        elementSelector: repositoryIdInputSelector,
                        onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(repositoryIdInputSelector, repositoryId))
                    }, options)
                }
            ];

            if (options.rulesetName) {
                steps.push({
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.create_repository.ruleset_dropdown.content',
                        url: '/repository/create/graphdb',
                        class: 'gdb-repository-ruleset-select-guide-dialog',
                        elementSelector: GuideUtils.getGuideElementSelector('graphDBRepositoryRulesetSelect'),
                        show: () => () => {
                            GuideUtils.validateTextInput(repositoryIdInputSelector, repositoryId);
                        },
                        rulesetName: options.rulesetName
                    }, options)
                });
            }
            steps.push({
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step_plugin.create_repository.save_button.content',
                    url: '/repository/create/graphdb',
                    class: 'create-repository-button-guide-dialog',
                    elementSelector: GuideUtils.getGuideElementSelector('graphDBRepositoryCrateButton'),
                    show: () => () => {
                        GuideUtils.validateTextInput(repositoryIdInputSelector, repositoryId);
                    },
                    onNextClick: GuideUtils.clickOnGuideElement('graphDBRepositoryCrateButton')
                }, options)
            });

            return steps;
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'download-guide-resource',
        getSteps: (options, services) => {
            return {
                guideBlockName: 'info-message',
                options: angular.extend({}, {
                    title: 'guide.step_plugin.download-guide-resource.title',
                    content: 'guide.step_plugin.download-guide-resource.content',
                    canBePaused: true,
                    forceReload: true
                }, options)
            };
        }
    }]
);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'enable-autocomplete',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            options.mainAction = 'enable-autocomplete';

            const autocompleteCheckboxSelector = GuideUtils.getGuideElementSelector('autocompleteCheckbox');
            return [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'autocomplete',
                        showIntro: true
                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.enable-autocomplete.content',
                        url: '/autocomplete',
                        elementSelector: autocompleteCheckboxSelector,
                        class: 'enable-autocomplete-checkbox-guide-dialog',
                        // Disable default behavior of service when element is clicked.
                        advanceOn: undefined,
                        beforeShowPromise: () => GuideUtils.deferredShow(500)(),
                        show: (guide) => () => {
                            // Added listener to the element.
                            $(autocompleteCheckboxSelector)
                                .on('mouseup.autocompleteCheckboxClick', function () {
                                    // If autocomplete is enabled go to the next step.
                                    GuideUtils.deferredShow(20)()
                                        .then(() => {
                                            if (GuideUtils.isGuideElementChecked('autocompleteCheckbox', ' input')) {
                                                guide.next();
                                            }
                                        });
                                });
                        },
                        onNextClick: (guide) => {
                            if (!GuideUtils.isGuideElementChecked('autocompleteCheckbox', ' input')) {
                                $(autocompleteCheckboxSelector).trigger('click');
                            }
                            guide.next();
                        },
                        hide: () => () => {
                            // Remove ths listener from element. It is important when step is hided.
                            $(autocompleteCheckboxSelector).off('mouseup.autocompleteCheckboxClick');
                        }
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.enable-autocomplete.status_info.content',
                        url: '/autocomplete',
                        elementSelector: GuideUtils.getGuideElementSelector('autocompleteStatus'),
                        class: 'autocomplete-status-info-guide-dialog',
                        canBePaused: false
                    }, options)
                }
            ];
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'execute-sparql-query',
        getSteps: (options, services) => {
            const SPARQL_DIRECTIVE_SELECTOR = '#query-editor';
            const GuideUtils = services.GuideUtils;
            const YasguiComponentDirectiveUtil = services.YasguiComponentDirectiveUtil;
            const toastr = services.toastr;
            const $translate = services.$translate;
            const $interpolate = services.$interpolate;
            const $location = services.$location;
            options.mainAction = 'execute-sparql-query';

            const code = document.createElement('code');
            const copy = document.createElement('button');
            copy.className = 'btn btn-sm btn-secondary';
            copy.innerText = $translate.instant('guide.step_plugin.execute-sparql-query.copy-to-editor.button');
            copy.setAttribute('ng-click', 'copyQuery()');

            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'sparql',
                        showIntro: true
                    }, options)
                }
            ];

            const defaultQuery = 'select * where { \n\t?s ?p ?o .\n} limit 100 \n';
            const queries = {};
            queries[-1] = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nselect * where { \n\t?s ?p ?o .\n?o rdf:type ""\n} limit 100 ';

            let overwriteQuery = false;
            options.queries.forEach((queryDef, index) => {
                const query = queryDef.query;
                queries[index] = query;
                code.innerText = query;
                options.queryAsHtmlCodeElement = '<div class="shepherd-code">' + code.outerHTML + copy.outerHTML + '</div>';

                steps.push({
                    guideBlockName: 'input-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.execute-sparql-query.query-editor.content',
                        url: '/sparql',
                        elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR,
                        class: 'yasgui-query-editor-guide-dialog',
                        beforeShowPromise: () => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(SPARQL_DIRECTIVE_SELECTOR)
                            .then(() => GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR, 3))
                            .then(() => GuideUtils.deferredShow(500)())
                            .catch((error) => {
                                services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                                throw error;
                            }),
                        onNextValidate: () => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(SPARQL_DIRECTIVE_SELECTOR)
                            .then((yasgui) => yasgui.getQuery().then((query) => ({yasgui, queryFromEditor: query})))
                            .then(({yasgui, queryFromEditor}) => {
                                const editorQuery = GuideUtils.removeWhiteSpaces(queryFromEditor);
                                const stepQuery = GuideUtils.removeWhiteSpaces(query);
                                if (editorQuery !== stepQuery) {
                                    if (editorQuery === 'select*where{?s?p?o.}limit100' || overwriteQuery) {
                                        // The query is the default query OR we previously overwrote it => we can overwrite it
                                        yasgui.setQuery(query);
                                    } else {
                                        GuideUtils.noNextErrorToast(toastr, $translate, $interpolate,
                                            'guide.step_plugin.execute-sparql-query.query-not-same.error', options);
                                        return false;
                                    }
                                }
                                overwriteQuery = true;
                                return true;
                                }),
                        initPreviousStep: () => {
                            if (index === 0) {
                                return YasguiComponentDirectiveUtil.setQuery(SPARQL_DIRECTIVE_SELECTOR, defaultQuery);
                            }

                            const haveToReload = '/sparql' !== $location.url();
                            if (haveToReload) {
                                $location.path('/sparql').search({});
                            }

                            return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR)
                                .then(() => YasguiComponentDirectiveUtil.executeSparqlQuery("#query-editor", query));
                        },
                        scrollToHandler: GuideUtils.scrollToTop,
                        extraContent: queryDef.queryExtraContent,
                        onScope: (scope) => {
                            scope.copyQuery = () => YasguiComponentDirectiveUtil.setQuery(SPARQL_DIRECTIVE_SELECTOR, query).then(() => {});
                        }
                    }, options)
                });
                steps.push({
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.execute-sparql-query.run-sparql-query.content',
                        url: '/sparql',
                        elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_RUN_BUTTON_SELECTOR,
                        class: 'yasgui-run-button-guide-dialog',
                        onNextClick: (guide) => YasguiComponentDirectiveUtil.getOntotextYasguiElementAsync(SPARQL_DIRECTIVE_SELECTOR)
                                .then((yasgui) => {
                                    yasgui.query();
                                    guide.next();
                                }),
                        scrollToHandler: GuideUtils.scrollToTop,
                        canBePaused: false,
                        initPreviousStep: (services, stepId) => {
                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            return previousStep.options.initPreviousStep(services, previousStep.options.id)
                                .then(() => {
                                    const currentStepId = services.ShepherdService.getCurrentStepId();
                                    // Skip expanding of node if last step is "visual-graph-expand"
                                    if (currentStepId === stepId) {
                                        return Promise.resolve();
                                    }

                                    return YasguiComponentDirectiveUtil.executeSparqlQuery("#query-editor", query);
                                });
                        }
                    }, options)
                });
                steps.push({
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.execute-sparql-query.result-explain.content',
                        url: '/sparql',
                        placement: 'top',
                        elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_SELECTOR,
                        class: 'yasgui-query-results-guide-dialog',
                        fileName: options.fileName,
                        scrollToHandler: GuideUtils.scrollToTop,
                        extraContent: queryDef.resultExtraContent,
                        canBePaused: false,
                        initPreviousStep: (services, stepId) => {
                            if ('/sparql' !== $location.url()) {
                                $location.path('/sparql').search({});
                                return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_EDITOR_SELECTOR)
                                    .then(() => GuideUtils.deferredShow(500)())
                                    .then(() => YasguiComponentDirectiveUtil.executeSparqlQuery("#query-editor", query));
                            }

                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            return previousStep.options.initPreviousStep(services, previousStep.options.id)
                                .then(() => YasguiComponentDirectiveUtil.setQuery(SPARQL_DIRECTIVE_SELECTOR, query));
                        }
                    }, options)
                });
            });

            return steps;
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'import-rdf-file',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const toastr = services.toastr;
            const $translate = services.$translate;
            const $interpolate = services.$interpolate;
            const EventEmitterService = services.EventEmitterService;
            options.mainAction = 'import-file';

            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'import',
                        showIntro: true
                    }, options)
                }
            ];

            if (options.resourcePath) {
                steps.push(
                    {
                        guideBlockName: 'download-guide-resource',
                        options: angular.extend({}, {
                            title: ''
                        }, options)
                    }
                );
            }

            const importSettingsButtonSelector = GuideUtils.getGuideElementSelector('import-settings-import-button');
            let filesForUploadSelectedSubscription;
            steps.push(...[
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.content',
                        url: '/import',
                        elementSelector: GuideUtils.getGuideElementSelector('uploadRdfFileButton'),
                        class: 'upload-rdf-file-button-guide-dialog',
                        // Disable default behavior of service when element is clicked.
                        advanceOn: undefined,
                        show: (guide) => () => {
                            // Subscribes to event "filesForUploadSelected", when the step is showing, this will give opportunity
                            // to canceling uploading if user not choose correct file.
                            filesForUploadSelectedSubscription = EventEmitterService.subscribe('filesForUploadSelected', ((eventData) => {
                                const uploadedFiles = eventData.files || [];
                                if (uploadedFiles.some((uploadedFile) => uploadedFile.name === options.resourceFile)) {
                                    // When tha correct file is selected, the guide can continue.

                                    // Check for duplicated name, if import button for guide rdf data exist.
                                    if (GuideUtils.isVisible(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile))) {
                                        GuideUtils.getOrWaiteFor('.confirm-duplicate-files-dialog')
                                            .then(() => guide.next());
                                    } else {
                                        GuideUtils.getOrWaiteFor(importSettingsButtonSelector)
                                            .then(() => guide.next());
                                    }
                                } else {
                                    // Canceling the automatically uploading of files because the guide rdf file is not selected.
                                    eventData.cancel = true;
                                }
                            }));
                        },
                        hide: () => () => {
                            if (filesForUploadSelectedSubscription) {
                                filesForUploadSelectedSubscription();
                            }
                        },
                        onNextValidate: () => {
                            return Promise.allSettled([GuideUtils.getOrWaiteFor('.confirm-duplicate-files-dialog'), GuideUtils.getOrWaiteFor(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile))])
                                .then(([confirmDialogPromise, importButtonPromise]) => {
                                    // There are two ways to exit this step: if the duplication dialog is opened or if the import button for the guide file is displayed.
                                    // The first scenario indicates that the user is trying to upload the same file,
                                    // while the second scenario suggests that the guide has been started more than once.
                                    if ('rejected' === confirmDialogPromise.status && 'rejected' === importButtonPromise.status) {
                                        GuideUtils.noNextErrorToast(toastr, $translate, $interpolate, 'guide.step_plugin.import_rdf_file.file-must-be-uploaded', options);
                                        return false;
                                    }
                                    return true;
                                });
                        },
                        onNextClick: (guide) => {
                            GuideUtils.getOrWaiteFor(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile))
                                .then((element) => {
                                    // if we have file import button for the guide rdf file, this indicates that we go through this step for second time.
                                    // This can happen if user start guide for second time.
                                    element.click();
                                })
                                .catch((error) => {
                                    // This shouldn't be happening.
                                    console.log(error);
                                })
                                .finally(() => guide.next());
                        }
                    }, options)
                },
                // This step is optional and will only appear if the file we want to upload has already been uploaded.
                // If the file is already uploaded, a confirmation dialog will be opened, and this step will display the confirm button of the dialog.
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.confirm_duplicate_files_dialog.content',
                        elementSelector: GuideUtils.getElementSelector('.confirm-duplicate-files-dialog .confirm-overwrite-btn'),
                        url: '/import',
                        placement: 'bottom',
                        class: 'import-file-button-guide-dialog',
                        skipFromHistory: true,
                        // Checks whether the confirm dialog is currently open.
                        showOn: () => GuideUtils.isVisible(GuideUtils.getElementSelector('.confirm-duplicate-files-dialog')),
                        onNextClick: () => GuideUtils.clickOnElement('.confirm-duplicate-files-dialog .confirm-overwrite-btn')(),
                        onPreviousClick: () => {
                            if (GuideUtils.isVisible(GuideUtils.getElementSelector('.confirm-duplicate-files-dialog'))) {
                                return GuideUtils.clickOnElement('.confirm-duplicate-files-dialog .cancel-btn');
                            }
                            return Promise.resolve();
                        }
                    }, options)
                },
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.import-settings.import.button.content',
                        elementSelector: importSettingsButtonSelector,
                        placement: 'top',
                        class: 'import-settings-import-file-button-guide-dialog',
                        onPreviousClick: () => new Promise(function (resolve) {
                            GuideUtils.clickOnGuideElement('import-settings-cancel-button')()
                                .then(() => resolve());
                        }),
                        beforeShowPromise: () => services.GuideUtils.deferredShow(300)()
                            .then(() => GuideUtils.getOrWaiteFor(importSettingsButtonSelector, 3)
                                    .catch((error) => {
                                        services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                                        return Promise.reject(error);
                                    })
                            ),
                        onNextClick: () => GuideUtils.clickOnGuideElement('import-settings-import-button')(),
                        canBePaused: false
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_status_info.content',
                        url: '/import',
                        elementSelector: '.import-resource-message',
                        class: 'import-status-info-guide-dialog',
                        beforeShowPromise: () => {
                            if (GuideUtils.isVisible('.import-resource-message')) {
                                return Promise.resolve();
                            }
                            return GuideUtils.waitFor('.import-resource-message', 10);
                        },
                        onPreviousClick: () => GuideUtils.getOrWaiteFor(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile), 10)
                                .then((element) => { element.click() })
                    }, options)
                }
            ]);

            return steps;
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'click-main-menu',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const steps = [];

            let menuSelector;
            let menuTitle;
            let submenuSelector;
            let submenuTitle;
            let viewName;
            let helpInfo;
            let menuDialogClass = '';
            let submenuDialogClass = '';

            switch (options.menu) {
                case "repositories":
                    menuSelector = 'menu-setup';
                    menuTitle = 'menu.setup.label';
                    menuDialogClass = 'menu-setup-guide-dialog';
                    submenuSelector = 'sub-menu-repositories';
                    submenuTitle = 'menu.repositories.label';
                    submenuDialogClass = 'sub-menu-repositories-guide-dialog';
                    viewName = 'menu.repositories.label';
                    helpInfo = 'view.repositories.helpInfo';

                    break;
                case "import":
                    menuSelector = 'menu-import';
                    menuTitle = 'common.import';
                    menuDialogClass = 'menu-import-guide-dialog';
                    viewName = 'common.import';
                    helpInfo = 'view.import.helpInfo';

                    break;
                case "autocomplete":
                    menuSelector = 'menu-setup';
                    menuTitle = 'menu.setup.label';
                    menuDialogClass = 'menu-setup-guide-dialog';
                    submenuSelector = 'sub-menu-autocomplete';
                    submenuTitle = 'menu.autocomplete.label';
                    submenuDialogClass = 'sub-menu-autocomplete-guide-dialog';
                    viewName = 'view.autocomplete.title';
                    helpInfo = 'view.autocomplete.helpInfo';

                    break;
                case "visual-graph":
                    menuSelector = 'menu-explore';
                    menuTitle = 'menu.explore.label';
                    menuDialogClass = 'menu-explore-guide-dialog';
                    submenuSelector = 'sub-menu-visual-graph';
                    submenuTitle = 'visual.graph.label';
                    submenuDialogClass = 'sub-menu-visual-graph-guide-dialog';
                    viewName = 'visual.graph.label';
                    helpInfo = 'view.visual.graph.helpInfo';

                    break;
                case "sparql":
                    menuSelector = 'menu-sparql';
                    menuTitle = 'menu.sparql.label';
                    menuDialogClass = 'menu-sparql-guide-dialog';
                    viewName = 'view.sparql-editor.title';
                    helpInfo = 'view.sparql-editor.helpInfo';

                    break;
                case "class-hierarchy":
                    menuSelector = 'menu-explore';
                    menuTitle = 'menu.explore.label';
                    menuDialogClass = 'menu-explore-guide-dialog';
                    submenuSelector = 'menu-class-hierarchy';
                    submenuTitle = 'menu.class.hierarchy.label';
                    submenuDialogClass = 'sub-menu-class-hierarchy-guide-dialog';
                    viewName = 'view.class.hierarchy.title';
                    helpInfo = 'view.class.hierarchy.helpInfo';

                    break;
            }

            const mainMenuClickElementPostSelector = submenuSelector ? ' div' : ' a';
            options.viewName = viewName;

            // View intro element
            if (options.showIntro && options.mainAction) {
                steps.push({
                    guideBlockName: 'info-message',
                    options: angular.extend({}, {
                        content: 'guide.step-intro.' + options.mainAction,
                        extraContent: helpInfo,
                        extraContentClass: 'alert alert-help text-left',
                        skipPoint: true
                    }, options)
                });
            }

            // Main menu element
            steps.push({
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step-menu.click-menu',
                    menuLabelKey: menuTitle,
                    class: menuDialogClass,
                    elementSelector: GuideUtils.getGuideElementSelector(menuSelector),
                    showOn: () => {
                        // If submenu is visible this mean that we have to close menu.
                        if (!!submenuSelector && GuideUtils.isGuideElementVisible(submenuSelector)) {
                            GuideUtils.clickOnGuideElement(menuSelector, mainMenuClickElementPostSelector)();
                        }
                        return true;
                    },
                    onNextClick: (guide) =>
                        GuideUtils.clickOnGuideElement(menuSelector, mainMenuClickElementPostSelector)()
                            .then(() => {
                                if (!submenuSelector) {
                                    guide.next();
                                }
                            }),
                    initPreviousStep: (services, stepId) => {
                        const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                        if (previousStep) {
                            return previousStep.options.initPreviousStep(services, previousStep.options.id);
                        }

                        return Promise.resolve();
                    }
                }, options)
            });

            if (submenuSelector) {
                steps.push({
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step-menu.click-menu',
                        menuLabelKey: submenuTitle,
                        class: submenuDialogClass,
                        elementSelector: GuideUtils.getGuideElementSelector(submenuSelector),
                        placement: 'right',
                        canBePaused: false,
                        showOn: () => {
                            // If submenu is visible this mean that we have to close menu.
                            if (!GuideUtils.isGuideElementVisible(submenuSelector)) {
                                GuideUtils.clickOnGuideElement(menuSelector, ' div')();
                            }
                            return true;
                        },
                        onNextClick: (guide) => GuideUtils.clickOnGuideElement(submenuSelector, ' a')().then(() => guide.next()),
                        initPreviousStep: (services, stepId) => {
                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            if (previousStep) {
                                return previousStep.options.initPreviousStep(services, previousStep.options.id);
                            }

                            return Promise.resolve();
                        }
                    }, options)
                });
            }
            return steps;
        }
    }
]);

const getRepositoryName = (services, options) => {
    return services.$repositories.getRepositories().find((repo) => repo.id === options.repositoryId) ? options.repositoryId : options.repositoryIdBase;
};

const getRepositoryElementSelector = (services, options) => {
    return services.GuideUtils.getGuideElementSelector(`repository-${getRepositoryName(services, options)}-button`);
};

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'select-repository-dropdown',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            options.mainAction = 'select-repository';
            options.getRepositoryId = () => getRepositoryName(services, options);

            return [{
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    skipPoint: true,
                    content: 'guide.step_plugin.choose-repository.content',
                    elementSelector: GuideUtils.getGuideElementSelector('repositoriesGroupButton'),
                    class: 'repositories-group-button-guide-dialog',
                    onNextClick: (guide) => GuideUtils.clickOnGuideElement('repositoriesGroupButton')().then(() => guide.next())
                }, options)
            }, {
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step_plugin.select-repository.content',
                    elementSelector: () => {
                        return getRepositoryElementSelector(services, options);
                    },
                    class: 'repository-select-button-guide-dialog',
                    advanceOn: undefined,
                    beforeShowPromise: () => services.GuideUtils.waitFor(getRepositoryElementSelector(services, options), 1)
                        .catch((error) => {
                            services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                            throw (error);
                        }),
                    show: (guide) => () => {
                        $('#repositorySelectDropdown').addClass('autoCloseOff');
                        // Added listener to the element.
                        $(getRepositoryElementSelector(services, options))
                            .on('mouseup.selectRepositoryButtonClick', function () {
                                guide.next();
                            });
                    },
                    onNextClick: (guide) => {
                        $(getRepositoryElementSelector(services, options)).off('mouseup.selectRepositoryButtonClick');
                        $('#repositorySelectDropdown').removeClass('autoCloseOff');
                        GuideUtils.clickOnElement(getRepositoryElementSelector(services, options))().then(() => guide.next());
                    },
                    hide: () => () => {
                        $('#repositorySelectDropdown').removeClass('autoCloseOff');
                        // Remove ths listener from element. It is important when step is hided.
                        $(getRepositoryElementSelector(services, options)).off('mouseup.selectRepositoryButtonClick');
                    },
                    canBePaused: false
                }, options)
            }
            ];
        }
    },
    {
        guideBlockName: 'select-repository-plug',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            return [{
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step_plugin.select-repository-plug.content',
                    elementSelector: GuideUtils.getGuideElementSelector(`repository-${options.repositoryId}-plug`),
                    onNextClick: GuideUtils.getGuideElementSelector(`repository-${options.repositoryId}-plug`)
                }, options)
            }
            ];
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'table-graph-explore',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $location = services.$location;
            const $route = services.$route;
            options.mainAction = 'table-graph';

            const steps = [
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step-intro.table-graph',
                        scrollToHandler: GuideUtils.scrollToTop,
                        elementSelector: GuideUtils.getSparqlResultsSelectorForIri(options.iri),
                        class: 'table-graph-instance-guide-dialog',
                        placement: 'top',
                        onNextClick: (guide, step) => {
                            GuideUtils.waitFor(step.elementSelector, 3)
                                .then(() => $(step.elementSelector).trigger('click'))
                                .then(() => guide.next());
                        },
                        initPreviousStep: (services, stepId) => {
                            const currentStepId = services.ShepherdService.getCurrentStepId();
                            if (currentStepId === stepId) {
                                return Promise.resolve();
                            }
                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            return previousStep.options.initPreviousStep(services, previousStep.options.id);
                        }
                    }, options)
                }, {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.table-graph-overview',
                        scrollToHandler: GuideUtils.scrollToTop,
                        elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR,
                        class: 'table-graph-overview-guide-dialog',
                        placement: 'top',
                        beforeShowPromise: () => GuideUtils.waitFor(`.resource-info a.source-link[href="${options.iri}"]`, 3)
                            .then(() => GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR, 3)),
                        initPreviousStep: (services, stepId) => {
                            const currentStepId = services.ShepherdService.getCurrentStepId();
                            if (currentStepId === stepId) {
                                return GuideUtils.defaultInitPreviousStep(services, stepId);
                            }
                            const url = `/resource?uri=${options.iri}&role=subject`;
                            if (url !== decodeURIComponent($location.url())) {
                                $location.path('/resource').search({uri: options.iri, role: 'subject'});
                                return GuideUtils.waitFor(`.resource-info a.source-link[href="${options.iri}"]`, 3);
                            }
                            return Promise.resolve();
                        }
                    }, options)
                }
            ];

            if (angular.isArray(options.subSteps)) {
                options.subSteps.forEach((subStep) => {

                    switch (subStep.type) {
                        case 'link':
                            steps.push({
                                guideBlockName: 'clickable-element',
                                options: angular.extend({}, {
                                    content: 'guide.step_plugin.table-graph-link',
                                    elementSelector: GuideUtils.getSparqlResultsSelectorForIri(subStep.iri),
                                    class: 'table-graph-link-guide-dialog',
                                    onNextClick: (guide, step) => {
                                        GuideUtils.waitFor(step.elementSelector, 3)
                                            .then(() => $(step.elementSelector).trigger('click'))
                                            .then(() => guide.next());
                                    },
                                    initPreviousStep: (services, stepId) => {
                                        const linkUrl = `/resource?uri=${subStep.iri}&role=subject`;
                                        const tableGraphLinkUrl = `/resource?uri=${options.iri}&role=subject`;
                                        const url = decodeURIComponent($location.url());

                                        const currentStepId = services.ShepherdService.getCurrentStepId();
                                        if (currentStepId === stepId && tableGraphLinkUrl === url) {
                                            // this case is first link in the sequence before click the link, so we have to resolve it.
                                            return Promise.resolve();
                                        }

                                        if (linkUrl === url) {
                                            // this case is first link in the sequence after click the link, so we have to call previous step.
                                            return GuideUtils.defaultInitPreviousStep(services, stepId);
                                        }

                                        // this case is from second link we have to reload
                                        $location.url(linkUrl);
                                        $route.reload();
                                        return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR);
                                    }
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                        case 'role':
                            steps.push({
                                guideBlockName: 'clickable-element',
                                options: angular.extend({}, {
                                    content: 'guide.step_plugin.table-graph-role',
                                    elementSelector: GuideUtils.getGuideElementSelector('role-' + subStep.role),
                                    class: 'visual_graph-role-guide-dialog',
                                    onNextClick: (guide, step) => {
                                        GuideUtils.waitFor(step.elementSelector, 3)
                                            .then(() => $(step.elementSelector).trigger('click'))
                                            .then(() => guide.next());
                                    },
                                    initPreviousStep: (services, stepId) => {
                                        const currentStepId = services.ShepherdService.getCurrentStepId();
                                        if (currentStepId === stepId) {
                                            return Promise.resolve();
                                        }

                                        const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                                        return previousStep.options.initPreviousStep(services, previousStep.options.id)
                                            .then(() => {
                                                let url = $location.url();
                                                url = url.substring(0, url.indexOf('role=') + 5);
                                                url += subStep.role;
                                                $location.url(url);
                                                $route.reload();
                                                return GuideUtils.waitFor(GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR);
                                            });
                                    }
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                        case 'visual':
                            steps.push({
                                guideBlockName: 'clickable-element',
                                options: angular.extend({}, {
                                    content: 'guide.step_plugin.table-graph-visual',
                                    elementSelector: GuideUtils.getGuideElementSelector('explore-visual'),
                                    class: 'table-graph-visual-button-guide-dialog',
                                    onNextClick: (guide, step) => {
                                        GuideUtils.waitFor(step.elementSelector, 3)
                                            .then(() => $(step.elementSelector).trigger('click'));
                                    },
                                    initPreviousStep: (services, stepId) => {
                                        const currentStepId = services.ShepherdService.getCurrentStepId();
                                        if (currentStepId === stepId) {
                                            return Promise.resolve();
                                        }

                                        return GuideUtils.defaultInitPreviousStep(services, stepId);
                                    }
                                }, angular.extend({}, options, subStep))
                            });
                            steps.push({
                                guideBlockName: 'read-only-element',
                                options: angular.extend({}, {
                                    content: 'guide.step_plugin.visual_graph_intro.content',
                                    extraContent: subStep.extraContentVisualIntro,
                                    url: '/graphs-visualizations',
                                    elementSelector: '.graph-visualization',
                                    placement: 'left',
                                    canBePaused: false,
                                    forceReload: true,
                                    onNextClick: (guide) => {
                                        window.history.back();
                                        guide.next();
                                    }
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                        case 'row':
                            steps.push({
                                guideBlockName: 'read-only-element',
                                options: angular.extend({}, {
                                    elementSelector: GuideUtils.getSparqlResultsSelectorForRow(subStep.row),
                                    class: 'visual_graph-row-guide-dialog'
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                        case 'table':
                            steps.push({
                                guideBlockName: 'read-only-element',
                                options: angular.extend({}, {
                                    elementSelector: GuideUtils.CSS_SELECTORS.SPARQL_RESULTS_ROWS_SELECTOR,
                                    class: 'visual_graph-table-guide-dialog',
                                    placement: 'top'
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                    }
                });
            }

            return steps;
        }
    }
]);

const disableAllNodes = () => () => {
    $('.node-wrapper').addClass('disable-visual-graph-node');
};

const enableAllNodes = () => () => {
    $('.node-wrapper').removeClass('disable-visual-graph-node');
};

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'visual-graph',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $location = services.$location;
            const $route = services.$route;
            options.mainAction = 'visual-graph';

            return [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'visual-graph',
                        showIntro: true
                    }, options)
                }, {
                    guideBlockName: 'input-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.visual_graph_input_IRI.content',
                        forceReload: true,
                        url: '/graphs-visualizations',
                        elementSelector: GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input'),
                        class: 'visual-graph-input-iri-guide-dialog',
                        onNextValidate: (step) => Promise.resolve(GuideUtils.validateTextInput(step.elementSelector, step.easyGraphInputText))
                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.visual_graph_show_autocomplete.content',
                        url: '/graphs-visualizations',
                        elementSelector: GuideUtils.getGuideElementSelector(`autocomplete-${options.iri}`),
                        class: 'visual-graph-show-autocomplete-guide-dialog',
                        onNextClick: (guide, step) => GuideUtils.waitFor(step.elementSelector, 3).then(() => $(step.elementSelector).trigger('click')),
                        canBePaused: false,
                        forceReload: true
                    }, options)
                }, {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.visual_graph_intro.content',
                        url: '/graphs-visualizations',
                        elementSelector: '.graph-visualization',
                        placement: 'left',
                        onPreviousClick: () => {
                            $location.url('/graphs-visualizations');
                            // the page have to be reloaded because the "Search RDF resource..." input have to be visible, due to implementation
                            $route.reload();
                            const searchInputSelector = GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input');
                            return GuideUtils.waitFor(searchInputSelector, 3)
                                .then(() => {
                                    GuideUtils.validateTextInput(searchInputSelector, options.easyGraphInputText);
                                });
                        },
                        initPreviousStep: () => {
                            const url = '/graphs-visualizations?uri=' + options.iri;
                            if (url !== decodeURIComponent($location.url())) {
                                $location.path('/graphs-visualizations').search({uri: options.iri});
                                return GuideUtils.waitFor(`.node-wrapper[id^="${options.iri}"] circle`, 3);
                            }
                            return Promise.resolve();
                        },
                        canBePaused: false,
                        forceReload: true
                    }, options)
                }
            ];
        }
    },
    {
        guideBlockName: 'visual-graph-expand',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const $route = services.$route;
            const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;

            // Expands visual graph when a node is double-clicked.
            const dblClickFunction = (guide) => () => {
                GuideUtils.graphVizExpandNode(elementSelector);
                guide.getCurrentStep().hide();
                GuideUtils.awaitAlphaDropD3(null, $rootScope)()
                    .then(() => {
                        guide.next();
                    });
            };

            return [
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-expand.title',
                        content: 'guide.step_plugin.visual-graph-expand.content',
                        url: '/graphs-visualizations',
                        canBePaused: false,
                        class: 'visual-graph-expand-node-guide-dialog',
                        elementSelector,
                        // Disable default behavior of service when element is clicked.
                        advanceOn: undefined,
                        onNextClick: (guide) => {
                            GuideUtils.graphVizExpandNode(elementSelector);
                            guide.getCurrentStep().hide();
                            GuideUtils.awaitAlphaDropD3(null, $rootScope)()
                                .then(() => {
                                    guide.next();
                                });
                        },
                        show: (guide) => () => {
                            // Add "dblclick" listener to the element. Processing of double-click event is disabled for the visual graph when guide is started.
                            // So we have expanded the graph manually when a selected node is double-clicked.
                            $(elementSelector).on('dblclick.onNodeDbClicked', dblClickFunction(guide));
                        },
                        hide: () => () => {
                            // Remove the "dblclick" listener of element. It is important when step is hided.
                            $(elementSelector).off('dblclick.onNodeDbClicked');
                        },
                        beforeShowPromise: () => {
                            $route.reload();
                            return GuideUtils.deferredShow(50)()
                                .then(() => {
                                    GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope)();
                                });
                        },
                        initPreviousStep: (services, stepId) => {
                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            return previousStep.options.initPreviousStep(services, previousStep.id)
                                .then(() => {
                                    const currentStepId = services.ShepherdService.getCurrentStepId();
                                    // Skip expanding of node if last step is "visual-graph-expand"
                                    if (currentStepId === stepId) {
                                        return Promise.resolve;
                                    }

                                    GuideUtils.graphVizExpandNode(elementSelector);
                                    return GuideUtils.deferredShow(50)()
                                        .then(() => {
                                            return GuideUtils.awaitAlphaDropD3(null, $rootScope)();
                                        });
                                });
                        }
                    }, options)
                }
            ];
        }
    },
    {
        guideBlockName: 'visual-graph-properties',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;

            let mouseClickTimeStamp;
            let mouseEventTimer;

            // Expands Node info sidebar panel when a node is clicked.
            const onClick = (services, guide) => (event) => {
                if (mouseEventTimer) {
                    // Cancels expansion of the sidebar panel if user double-clicked.
                    if (event.timeStamp - mouseClickTimeStamp < 400) {
                        services.$timeout.cancel(mouseEventTimer);
                        mouseEventTimer = null;
                    }
                } else {
                    mouseClickTimeStamp = event.timeStamp;
                    mouseEventTimer = services.$timeout(function () {
                        GuideUtils.graphVizShowNodeInfo(elementSelector);
                        mouseEventTimer = null;
                        guide.next();
                    }, 500);
                }
            };

            const steps = [
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-properties.title',
                        content: 'guide.step_plugin.visual-graph-properties.content',
                        url: '/graphs-visualizations',
                        class: 'visual-graph-show-properties-intro-guide-dialog',
                        elementSelector,
                        canBePaused: false,
                        // Disable default behavior of service when element is clicked.
                        advanceOn: undefined,
                        show: (guide) => () => {
                            // Add "click" listener to the element. Processing of click event is disabled for the visual graph when guide is started.
                            // So we have to open side panel info manually when a selected node is clicked.
                            $(elementSelector).on('click.onNodeClicked', onClick(services, guide));
                        },
                        hide: () => () => {
                            // Remove the "click" listener of element. It is important when step is hided.
                            $(elementSelector).off('click.onNodeClicked');
                        },
                        onNextClick: (guide, step) => {
                            GuideUtils.graphVizShowNodeInfo(step.elementSelector);
                            guide.next();
                        },
                        beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope)
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-properties-side-panel.title',
                        content: 'guide.step_plugin.visual-graph-properties-side-panel.content',
                        url: '/graphs-visualizations',
                        elementSelector: '.rdf-side-panel-content',
                        class: 'visual-graph-side-panel-content-guide-dialog',
                        canBePaused: false,
                        placement: 'left',
                        beforeShowPromise: GuideUtils.deferredShow(500),
                        onPreviousClick: () => new Promise(function (resolve) {
                            GuideUtils.waitFor(closeButtonSelector, 3)
                                .then(() => {
                                    $(closeButtonSelector).trigger('click');
                                    resolve();
                                }).catch(() => resolve());
                        })
                    }, options)
                }
            ];

            if (angular.isArray(options.focusProperties)) {
                options.focusProperties.forEach((focusProperty) => {
                    if (!angular.isObject(focusProperty)) {
                        focusProperty = {
                            property: focusProperty
                        };
                    }
                    const translationIdSuffix = focusProperty.property === 'types' ? '-types' : '-property';
                    const content = focusProperty.skipGenericMessage && focusProperty.message ?
                        null : 'guide.step_plugin.visual-graph-properties-focus' + translationIdSuffix + '.content';
                    steps.push({
                        guideBlockName: 'read-only-element',
                        options: angular.extend({}, {
                            title: 'guide.step_plugin.visual-graph-properties-focus' + translationIdSuffix + '.title',
                            content: content,
                            url: '/graphs-visualizations',
                            class: 'visual-graph-properties-focus-guide-dialog',
                            canBePaused: false,
                            placement: 'left',
                            elementSelector: GuideUtils.getGuideElementSelector('graph-visualization-node-info-' + focusProperty.property),
                            focusProperty: focusProperty.property,
                            extraContent: focusProperty.message
                        }, options)
                    });
                });
            }

            const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
            steps.push({
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    title: 'guide.step_plugin.visual-graph-properties-side-panel-close.title',
                    content: 'guide.step_plugin.visual-graph-properties-side-panel-close.content',
                    url: '/graphs-visualizations',
                    canBePaused: false,
                    placement: 'left',
                    class: 'visual-graph-properties-side-panel-close-guide-dialog',
                    elementSelector: closeButtonSelector,
                    advanceOn: {
                        selector: closeButtonSelector,
                        event: 'click'
                    },
                    beforeShowPromise: () => {
                        // We have to be sure that node info sidebar is open. It is needed when this step is loaded when next step "Previous"
                        // button is clicked.
                        GuideUtils.graphVizShowNodeInfo(elementSelector);
                        return GuideUtils.deferredShow(500)();
                    },
                    onNextClick: () => GuideUtils.waitFor(closeButtonSelector, 3).then(() => $(closeButtonSelector).trigger('click'))
                }, options)
            });

            return steps;
        }
    },
    {
        guideBlockName: 'visual-graph-link-focus',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const elementSelector = `.link-wrapper[id^="${options.fromIri}>${options.toIri}"]`;
            return [
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-link-focus.title',
                        content: 'guide.step_plugin.visual-graph-link-focus.content',
                        url: '/graphs-visualizations',
                        canBePaused: false,
                        class: 'visual-graph-link-focus-guide-dialog',
                        elementSelector,
                        show: disableAllNodes,
                        hide: enableAllNodes,
                        beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope)
                    }, options)
                }
            ];
        }
    },
    {
        guideBlockName: 'visual-graph-node-focus',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;
            return [
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-node-focus.title',
                        content: 'guide.step_plugin.visual-graph-node-focus.content',
                        url: '/graphs-visualizations',
                        canBePaused: false,
                        elementSelector,
                        class: 'visual-graph-node-focus-guide-dialog',
                        show: disableAllNodes,
                        hide: enableAllNodes,
                        beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope),
                        initPreviousStep: (services, stepId) => {
                            if (GuideUtils.isVisible(elementSelector)) {
                                return Promise.resolve();
                            }

                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            return previousStep.options.initPreviousStep(services, previousStep.id);
                        }
                    }, options)
                }
            ];
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'welcome',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $translate = services.$translate;
            const $interpolate = services.$interpolate;

            return [
                {
                    guideBlockName: 'info-message',
                    options: {
                        title: 'guide.step_plugin.welcome.title',
                        content: 'guide.step_plugin.welcome.content',
                        infoIconHint: GuideUtils.translateLocalMessage($translate, $interpolate, 'guide.step_plugin.welcome.info-icon-hint', options),
                        mouseIconHint: GuideUtils.translateLocalMessage($translate, $interpolate, 'guide.step_plugin.welcome.mouse-icon-hint', options),
                        inputIconHint: GuideUtils.translateLocalMessage($translate, $interpolate, 'guide.step_plugin.welcome.input-icon-hint', options)
                    }
                },
                {
                    guideBlockName: 'info-message',
                    options: {
                        title: 'guide.step_plugin.welcome.title',
                        content: 'guide.step_plugin.welcome-what.content'
                    }
                }
            ];
        }
    }
]);


const BASIC_STEP = {
    title: '',
    content: '',
    elementSelector: undefined,
    placement: 'bottom',
    url: undefined,
    type: 'read-only-element',
    maxWaitTime: 3,
    canBePaused: true,
    onNextClick: undefined,
    onNextValidate: () => Promise.resolve(true),
    onPreviousClick: undefined,
    skipPoint: false,
    class: ''
};

/**
 * This function will be called before show a step. Step will be shown after promise is resolve. It waits element of step to be visible on the page.
 * @param {*} services
 * @param {string} elementSelector
 * @param {number} maxWaitTime
 * @return {function(): *}
 */
const beforeShowPromise = (services, elementSelector, maxWaitTime) => {
    return () => {
        return services.GuideUtils.waitFor(elementSelector, maxWaitTime)
            .catch((error) => {
                // error is caught just to show notification in generic way.
                services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                // throw the error, otherwise guide will continue with the next step.
                throw error;
            });
    };
};

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'clickable-element',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'clickable'
            };

            const stepDescription = angular.extend({}, BASIC_STEP, {
                advanceOn: {
                    selector: options.elementSelector,
                    event: 'click'
                },
                initPreviousStep: services.GuideUtils.defaultInitPreviousStep
            }, options, notOverridable);

            if (!stepDescription.beforeShowPromise) {
                stepDescription.beforeShowPromise = beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
            }
            return stepDescription;
        }
    },
    {
        guideBlockName: 'read-only-element',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'readonly'
            };
            const stepDescription = angular.extend({}, BASIC_STEP, {
                    initPreviousStep: services.GuideUtils.defaultInitPreviousStep
                },
                options, notOverridable);
            if (!stepDescription.beforeShowPromise) {
                stepDescription.beforeShowPromise = beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
            }
            return stepDescription;
        }
    },
    {
        guideBlockName: 'input-element',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'input'
            };
            const stepDescription = angular.extend({}, BASIC_STEP, {
                initPreviousStep: services.GuideUtils.defaultInitPreviousStep
            }, options, notOverridable);
            if (!stepDescription.beforeShowPromise) {
                stepDescription.beforeShowPromise = beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
            }
            return stepDescription;
        }
    },
    {
        guideBlockName: 'info-message',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'readonly'
            };
            return angular.extend({}, BASIC_STEP, {
                initPreviousStep: services.GuideUtils.defaultInitPreviousStep
            }, options, notOverridable);
        }
    },
    {
        guideBlockName: 'guide-end',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'readonly',
                title: 'guide.step_plugin.guide-ended.title',
                content: 'guide.step_plugin.guide-ended.content',
                show: (guide) => () => {
                    guide.options.confirmCancel = false;
                },
                hide: (guide) => () => {
                    guide.options.confirmCancel = true;
                }
            };
            return angular.extend({}, BASIC_STEP, {
                initPreviousStep: services.GuideUtils.defaultInitPreviousStep
            }, options, notOverridable);
        }
    }
]);

PluginRegistry.add('route', {
    'url': '/import',
    'module': 'graphdb.framework.impex.import',
    'path': 'import/app',
    'chunk': 'import',
    'controller': 'ImportViewCtrl',
    'templateUrl': 'pages/import.html',
    'title': 'common.import',
    'reloadOnSearch': false,
    'helpInfo': 'view.import.helpInfo',
    'documentationUrl': 'loading-data-using-the-workbench.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Import',
            labelKey: 'common.import',
            href: 'import',
            order: 0,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-import',
            guideSelector: 'menu-import'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/jdbc',
        'module': 'graphdb.framework.jdbc',
        'path': 'jdbc/app',
        'chunk': 'jdbc',
        'controller': 'JdbcListCtrl',
        'templateUrl': 'pages/jdbc.html',
        'title': 'view.jdbc.title',
        'helpInfo': 'view.jdbc.helpInfo',
        'documentationUrl': 'sql-access-over-jdbc.html'
    },
    {
        'url': '/jdbc/configuration/create',
        'module': 'graphdb.framework.jdbc',
        'path': 'jdbc/app',
        'chunk': 'jdbc',
        'controller': 'JdbcCreateCtrl',
        'templateUrl': 'pages/jdbc-create.html',
        'title': 'view.jdbc.create.title',
        'helpInfo': 'view.jdbc.create.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {label: 'Setup', labelKey: 'menu.setup.label', href: '#', order: 5, role: 'IS_AUTHENTICATED_FULLY', icon: "icon-settings", guideSelector: 'menu-setup'},
        {label: 'JDBC', labelKey: 'menu.jdbc.label', href: 'jdbc', order: 50, parent: 'Setup', role: "IS_AUTHENTICATED_FULLY", guideSelector: 'sub-menu-jdbs'}
    ]
});

PluginRegistry.add('route', {
    'url': '/namespaces',
    'module': 'graphdb.framework.namespaces',
    'chunk': 'namespaces',
    'path': 'namespaces/app',
    'controller': 'NamespacesCtrl',
    'templateUrl': 'pages/namespaces.html',
    'title': 'menu.namespaces.label',
    'helpInfo': 'view.namespaces.helpInfo',
    'documentationUrl': 'configuring-a-repository.html#namespaces-defined-for-the-repository'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "icon-settings",
            guideSelector: 'menu-setup'
        }, {
            label: 'Namespaces',
            labelKey: 'menu.namespaces.label',
            href: 'namespaces',
            order: 30,
            parent: 'Setup',
            guideSelector: 'sub-menu-namespaces'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/',
    'module': 'graphdb.workbench',
    'chunk': 'home',
    'path': 'controllers',
    'controller': 'homeCtrl',
    'templateUrl': 'pages/home.html'
});

PluginRegistry.add('route', {
    'url': '/plugins',
    'module': 'graphdb.framework.plugins',
    'path': 'plugins/app',
    'chunk': 'plugins',
    'controller': 'PluginsCtrl',
    'templateUrl': 'pages/plugins.html',
    'title': 'menu.plugins.label',
    'helpInfo': 'view.plugins.helpInfo',
    'documentationUrl': 'using-plugins.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "icon-settings",
            guideSelector: 'menu-setup'
        },
        {
            label: 'Plugins',
            labelKey: 'menu.plugins.label',
            href: 'plugins',
            order: 25,
            parent: 'Setup',
            role: "IS_AUTHENTICATED_FULLY",
            guideSelector: 'sub-menu-plugins'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/monitor/queries',
    'module': 'graphdb.framework.jmx.queries',
    'path': 'queries/app',
    'chunk': 'monitor-queries',
    'controller': 'QueriesCtrl',
    'templateUrl': 'pages/monitor/queries.html',
    'title': 'view.query.and.update.monitoring.title',
    'helpInfo': 'view.query.and.update.monitoring.helpInfo',
    'documentationUrl': 'query-monitoring.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Monitor',
            labelKey: 'menu.monitor.label',
            href: '#',
            order: 3,
            // Changed to role user as now users can monitor their own queries
            role: 'ROLE_USER',
            icon: 'icon-monitoring',
            guideSelector: 'menu-monitor'
        }, {
            label: 'Queries and Updates',
            labelKey: 'menu.queries.and.updates.label',
            href: 'monitor/queries',
            order: 1,
            parent: 'Monitor',
            guideSelector: 'sub-menu-queries-and-updates'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/rdfrank',
    'module': 'graphdb.framework.rdfrank',
    'path': 'rdfrank/app',
    'chunk': 'rdfrank',
    'controller': 'RDFRankCtrl',
    'templateUrl': 'pages/rdfrank.html',
    'title': 'view.rdf.rank.title',
    'helpInfo': 'view.rdf.rank.helpInfo',
    'documentationUrl': 'ranking-results.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        },
        {
            label: 'RDF Rank',
            labelKey: 'view.rdf.rank.title',
            href: 'rdfrank',
            order: 45,
            parent: 'Setup',
            role: 'IS_AUTHENTICATED_FULLY',
            guideSelector: 'sub-menu-rdf-rank'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/repository',
        'module': 'graphdb.framework.repositories',
        'path': 'repositories/app',
        'chunk': 'repositories',
        'controller': 'LocationsAndRepositoriesCtrl',
        'templateUrl': 'pages/repositories.html',
        'title': 'menu.repositories.label',
        'helpInfo': 'view.repositories.helpInfo',
        'documentationUrl': 'creating-a-repository.html'
    }, {
        'url': '/repository/create',
        'module': 'graphdb.framework.repositories',
        'path': 'repositories/app',
        'chunk': 'repositories',
        'controller': 'ChooseRepositoryCtrl',
        'templateUrl': 'pages/choose-repository-type.html',
        'title': 'view.choose.repo.title'
    }, {
        'url': '/repository/create/:repositoryType',
        'module': 'graphdb.framework.repositories',
        'path': 'repositories/app',
        'chunk': 'repositories',
        'controller': 'AddRepositoryCtrl',
        'templateUrl': 'pages/repository.html',
        'title': 'Create Repository'
    }, {
        'url': '/repository/edit/:repositoryId',
        'module': 'graphdb.framework.repositories',
        'path': 'repositories/app',
        'chunk': 'repositories',
        'controller': 'EditRepositoryCtrl',
        'templateUrl': 'pages/repository.html',
        'title': 'Edit Repository'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        },
        {
            label: 'Repositories',
            labelKey: 'menu.repositories.label',
            href: 'repository',
            order: 1,
            role: 'ROLE_REPO_MANAGER',
            parent: 'Setup',
            children: [{
                href: 'repository/create',
                children: []
            }],
            guideSelector: 'sub-menu-repositories'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/monitor/system',
    'module': 'graphdb.framework.jmx.resources',
    'path': 'resources/app',
    'chunk': 'resources',
    'controller': 'ResourcesCtrl',
    'templateUrl': 'pages/monitor/resources.html',
    'title': 'view.resource.monitoring.title',
    'helpInfo': 'view.resource.monitoring.helpInfo',
    'reloadOnSearch': false,
    'documentationUrl': 'system-monitoring.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Monitor',
            labelKey: 'menu.monitor.label',
            href: '#',
            order: 3,
            role: 'ROLE_MONITORING',
            icon: 'icon-monitoring',
            guideSelector: 'menu-monitor'
        }, {
            label: 'Resources',
            labelKey: 'menu.resources.label',
            href: 'monitor/system',
            // Added role requirement here to assert that users cannot see Resources menu item
            role: 'ROLE_MONITORING',
            order: 3,
            parent: 'Monitor',
            guideSelector: 'sub-menu-resources'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/users',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'UsersCtrl',
        'templateUrl': 'js/angular/security/templates/users.html',
        'title': 'menu.users.and.access.label',
        'helpInfo': 'view.users.access.helpInfo',
        'documentationUrl': 'working-with-workbench.html#wbmenu-users-and-access'
    }, {
        'url': '/user/create',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'AddUserCtrl',
        'templateUrl': 'js/angular/security/templates/user.html',
        'title': 'Create new user'
    }, {
        'url': '/login',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'LoginCtrl',
        'templateUrl': 'pages/login.html',
        'title': 'view.login.title'
    }, {
        'url': '/user/:userId',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'EditUserCtrl',
        'templateUrl': 'js/angular/security/templates/user.html',
        'title': 'Edit user'
    }, {
        'url': '/settings',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'UserSettingsController',
        'templateUrl': 'js/angular/security/templates/user.html',
        'title': 'view.settings.title',
        'documentationUrl': 'customizing-workbench-behavior.html#user-settings'
    }, {
        'url': '/accessdenied',
        'templateUrl': 'pages/accessdenied.html',
        'title': 'view.access.denied.title'
    }, {
        'url': '/rolesmappings',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'RolesMappingController',
        'templateUrl': 'js/angular/security/templates/roles.html',
        'title': 'view.roles.mapping.title'
    }, {
        'url': '/ux-test1',
        'templateUrl': 'pages/ux-test1.html',
        'controller': 'uxTestCtrl',
        'title': 'UX Test'
    }, {
        'url': '/ux-test2',
        'templateUrl': 'pages/ux-test2.html',
        'controller': 'uxTestCtrl',
        'title': 'UX Test'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        },
        {
            label: 'Users and Access', labelKey: 'menu.users.and.access.label', href: 'users', order: 2, parent: 'Setup', role: 'ROLE_ADMIN',
            children: [{
                href: 'user/create',
                children: []
            }],
            guideSelector: 'sub-menu-user-and-access'
        },
        {
            label: 'My Settings',
            labelKey: 'menu.my.settings.label',
            href: 'settings',
            order: 6,
            parent: 'Setup',
            role: 'ROLE_USER',
            guideSelector: 'sub-menu-my-settings'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/license/register',
        'module': 'graphdb.framework.settings',
        'path': 'settings/app',
        'chunk': 'settings',
        'controller': 'RegisterLicenseCtrl',
        'templateUrl': 'pages/registerLicenseInfo.html',
        'title': 'view.register.license.title',
        'helpInfo': 'view.register.license.helpInfo'
    }, {
        'url': '/license',
        'module': 'graphdb.framework.settings',
        'path': 'settings/app',
        'chunk': 'settings',
        'controller': 'LicenseCtrl',
        'templateUrl': 'pages/licenseInfo.html',
        'title': 'view.existing.license.title',
        'helpInfo': 'view.existing.license.helpInfo',
        'documentationUrl': 'working-with-workbench.html#wbmenu-license'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [{
        label: 'License',
        labelKey: 'menu.license.label',
        href: 'license',
        order: 100,
        role: 'ROLE_ADMIN',
        parent: 'Setup',
        guideSelector: 'sub-menu-license'
    }]
});

PluginRegistry.add('route', [
    {
        'url': '/similarity',
        'module': 'graphdb.framework.similarity',
        'path': 'similarity/app',
        'chunk': 'similarity',
        'controller': 'SimilarityCtrl',
        'templateUrl': 'pages/similarity-indexes.html',
        'title': 'view.similarity.indexes.title',
        'helpInfo': 'view.similarity.indexes.helpInfo',
        'documentationUrl': 'semantic-similarity-searches.html#text-based-similarity-searches'
    }, {
        'url': '/similarity/index/create',
        'module': 'graphdb.framework.similarity',
        'path': 'similarity/app',
        'chunk': 'similarity',
        'controller': 'CreateSimilarityIdxCtrl',
        'templateUrl': 'pages/create-index.html',
        'title': 'view.create.similarity.index.title',
        'helpInfo': 'view.create.similarity.index.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'sub-menu-setup'
        },
        {
            label: 'Similarity',
            labelKey: 'menu.similarity.label',
            href: 'similarity',
            order: 40,
            parent: 'Explore',
            role: 'IS_AUTHENTICATED_FULLY',
            children: [{
                href: 'similarity/index/create',
                children: []
            }],
            guideSelector: 'sub-menu-similarity'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/sparql',
    'module': 'graphdb.framework.sparql-editor',
    'path': 'sparql-editor/app',
    'chunk': 'sparql',
    'controller': 'SparqlEditorCtrl',
    'templateUrl': 'pages/sparql-editor.html',
    'title': 'view.sparql-editor.title',
    'helpInfo': 'view.sparql-editor.helpInfo',
    'reloadOnSearch': false,
    'documentationUrl': 'sparql-queries.html'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'SPARQL',
            labelKey: 'menu.sparql.label',
            href: 'sparql',
            order: 2,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "icon-sparql",
            guideSelector: 'menu-sparql'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/sparql-templates',
        'module': 'graphdb.framework.sparql-template',
        'path': 'sparql-template/app',
        'chunk': 'sparql-template',
        'controller': 'SparqlTemplatesCtrl',
        'templateUrl': 'pages/sparql-templates.html',
        'title': 'view.sparql.template.title',
        'helpInfo': 'view.sparql.template.helpInfo',
        'documentationUrl': 'updating-data.html#from-the-sparql-editor'
    },
    {
        'url': '/sparql-template/create',
        'module': 'graphdb.framework.sparql-template',
        'path': 'sparql-template/app',
        'chunk': 'sparql-template',
        'controller': 'SparqlTemplateCreateCtrl',
        'templateUrl': 'pages/sparql-template-create.html',
        'title': 'view.create.sparql.template.title',
        'helpInfo': 'view.create.sparql.template.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "icon-settings",
            guideSelector: 'menu-setup'
        },
        {
            label: 'SPARQL Templates',
            labelKey: 'menu.sparql.template.label',
            href: 'sparql-templates',
            order: 51,
            parent: 'Setup',
            role: "IS_AUTHENTICATED_FULLY",
            guideSelector: 'sub-menu-sparql-templates'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/sysinfo',
        'module': 'graphdb.framework.stats',
        'path': 'stats/app',
        'chunk': 'stats',
        'controller': 'AdminInfoCtrl',
        'templateUrl': 'pages/info.html',
        'title': 'view.system.information.title',
        'helpInfo': 'view.system.information.helpInfo',
        'documentationUrl': 'diagnosing-and-reporting-critical-errors.html#running-a-system-report'
    }, {
        'url': '/webapi',
        'templateUrl': 'pages/webapi.html',
        'title': 'view.rest.api.documentation.title',
        'helpInfo': 'view.rest.api.documentation.helpInfo',
        'documentationUrl': 'using-the-graphdb-rest-api.html'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 7,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        }, {
            label: 'Help',
            labelKey: 'menu.help.label',
            href: '#',
            order: 8,
            icon: 'icon-help',
            guideSelector: 'menu-help'
        }, {
            label: 'System information',
            labelKey: 'menu.system.information.label',
            href: 'sysinfo',
            order: 50,
            parent: 'Help',
            role: 'ROLE_ADMIN',
            guideSelector: 'sub-menu-system-information'
        }, {
            label: 'REST API',
            labelKey: 'menu.rest.api.label',
            href: 'webapi',
            order: 1,
            parent: 'Help',
            guideSelector: 'sub-menu-rest-api'
        }, {
            label: 'Documentation',
            labelKey: 'menu.documentation.label',
            order: 2,
            parent: 'Help',
            icon: 'icon-external',
            hrefFun: function (productInfo, urlResolver) {
                return urlResolver(productInfo.productShortVersion, 'index.html');
            },
            guideSelector: 'sub-menu-documentation'
        }, {
            label: 'Tutorials',
            labelKey: 'menu.tutorials.label',
            order: 3,
            parent: 'Help',
            icon: 'icon-external',
            hrefFun: function (productInfo, urlResolver) {
                return urlResolver(productInfo.productShortVersion, 'tutorials.html');
            },
            guideSelector: 'sub-menu-developer-hub'
        }, {
            label: 'Support',
            labelKey: 'menu.support.label',
            order: 4,
            parent: 'Help',
            icon: 'icon-external',
            hrefFun: function (productInfo, urlResolver) {
                return urlResolver(productInfo.productShortVersion, 'support.html');
            },
            guideSelector: 'sub-menu-support'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/ttyg',
        'templateUrl': 'js/angular/ttyg/templates/ttyg.html',
        'module': 'graphdb.framework.ttyg',
        'path': 'ttyg/app',
        'controller': 'TTYGViewCtrl',
        'title': 'menu.ttyg.label',
        'helpInfo': 'ttyg.helpInfo',
        'documentationUrl': 'talk-to-graph.html'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Lab',
            labelKey: 'menu.lab.label',
            href: '#',
            order: 6,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "fa-regular fa-flask",
            guideSelector: 'menu-lab'
        },
        {
            label: 'Talk to Your Graph',
            labelKey: 'menu.ttyg.label',
            href: 'ttyg',
            order: 20,
            role: 'ROLE_USER',
            parent: 'Lab',
            guideSelector: 'sub-menu-ttyg'
        }]
});

PluginRegistry.add('themes', {
    // The name of the theme. Must contain only lowercase letters, hyphen, underscore. This is the differentiator
    // property for all registered themes.
    'name': 'default-theme',
    // The theme label or a key for a label from i18n resource bundle.
    'label': 'security.workbench.settings.theme.default-theme',
    // CSS variables, "foo: bar" becomes "--foo: bar"
    'variables': {
        // Primary color, like a main brand color. This is in a HSL format composed by three values below
        'primary-color-hue': '13.4',
        'primary-color-saturation': '87.9%',
        'primary-color-lightness': '33%',
        // Secondary color, like a contrast main brand color. This is in a HSL format composed by three values below
        'secondary-color-hue': '207.3',
        'secondary-color-saturation': '100%',
        'secondary-color-lightness': '19.4%',
        // Tertiary color, like a complimentary color. This is in a HSL format composed by three values below
        'tertiary-color-hue': '174.6',
        'tertiary-color-saturation': '97.7%',
        'tertiary-color-lightness': '33.5%',
        // A color used for the font/svg icons when placed on a primary color background.
        'icon-on-primary-color': 'rgba(255, 255, 255, 0.8)',
        'gray-color': '#97999C',
        'gray-color-dark': '#575757',
        // Colors for the toastr notifications, the tag-xxx and the text-xxx classes in any of their four states
        // (i.e. dark colored things)
        'color-danger-dark': 'hsl(353, 78%, 36%)',
        'color-success-dark': 'hsl(var(--tertiary-color-hue), var(--tertiary-color-saturation), calc(var(--tertiary-color-lightness)*0.5))',
        'color-warning-dark': 'var(--primary-color-dark)',
        'color-info-dark': 'var(--secondary-color-light)',
        // Colors for the alert boxes (i.e. light colored things).
        // Success and info are the same color since we don't use success much if at all
        'color-danger-light': '#a4142433',
        'color-success-light': 'hsla(var(--tertiary-color-hsl), 0.15)',
        'color-warning-light': 'hsla(var(--primary-color-hsl), 0.07)',
        'color-info-light': 'hsla(var(--tertiary-color-hsl), 0.15)',
        'color-help-light': 'hsla(var(--secondary-color-hsl), 0.1)',
        // Colors for fading danger/warning buttons, these are intermediate in intensity between dark and light,
        // and they should not use alpha channel because that doesn't play nice with border color
        'color-danger-medium': 'hsl(353, 78%, 83%)',
        'color-warning-medium': 'hsl(var(--primary-color-hue), var(--primary-color-saturation), 83%)',
        // Colors for the logo - logo proper, text in logo, logo background
        'logo-color': 'var(--primary-color-light)',
        'logo-text-color': 'white',
        'logo-background-color': 'var(--secondary-color-dark)'
    },
    // Dark theme
    'dark': {
        'variables': {
            // Dark definition variables that affect things at a global scale
            'body-filter': 'invert(95%) hue-rotate(180deg)',
            'html-background': '#0d0d0d',
            'media-filter': 'invert(100%) hue-rotate(180deg)',
            'alert-filter': 'contrast(2)',
            'checkbox-filter': 'invert(100%) hue-rotate(180deg)',
            'toast-filter': 'invert(95%) hue-rotate(180deg) contrast(1.2)',
            // Slightly different colors that work better in dark mode
            'primary-color-lightness': '60%',
            'secondary-color-saturation': '70%',
            'color-warning-light': 'hsla(var(--primary-color-hsl), 0.15)',
            'logo-color': 'var(--primary-color-dark)'
        },
        // CSS properties, "foo: bar" becomes "foo: bar"
        'properties': {
            // Notify browser that we support dark theme, makes checkboxes look better
            'color-scheme': 'light dark'
        }
    }
});

PluginRegistry.add('themes', {
    'name': 'onto-original-theme',
    'label': 'security.workbench.settings.theme.onto-original-theme',
    'variables': {
        'primary-color-hue': '17',
        'primary-color-saturation': '87.9%',
        'primary-color-lightness': '49%',
        'secondary-color-hue': '207.3',
        'secondary-color-saturation': '100%',
        'secondary-color-lightness': '19.4%',
        'tertiary-color-hue': '174.6',
        'tertiary-color-saturation': '97.7%',
        'tertiary-color-lightness': '33.5%',
        'icon-on-primary-color': 'rgba(255, 255, 255, 0.8)',
        'gray-color': '#97999C',
        'gray-color-dark': '#575757',
        'color-danger-dark': '#bd362f',
        'color-success-dark': '#51a351',
        'color-warning-dark': '#f89406',
        'color-info-dark': '#2f96b4',
        'color-danger-light': 'rgba(242, 222, 222, 0.7)',
        'color-success-light': 'rgba(219, 252, 202, 0.7)',
        'color-warning-light': 'rgba(252, 248, 227, 0.7)',
        'color-info-light': 'rgba(203, 238, 234, 0.7)',
        'color-help-light': '#e8f5fe',
        'color-danger-medium': 'hsl(353, 78%, 83%)',
        'color-warning-medium': 'hsl(var(--primary-color-hue), var(--primary-color-saturation), 83%)',
        'logo-color': '#E84E0F;',
        'logo-text-color': '#FFFFFF',
        'logo-background-color': 'var(--secondary-color)'
    },
    'dark': {
        'variables': {
            'body-filter': 'invert(95%) hue-rotate(180deg)',
            'html-background': '#0d0d0d',
            'media-filter': 'invert(100%) hue-rotate(180deg)',
            'alert-filter': 'brightness(0.8)',
            'checkbox-filter': 'invert(100%) hue-rotate(180deg)',
            'toast-filter': 'invert(90%) hue-rotate(180deg) contrast(1.2)',

            'primary-color-hue': '14',
            'primary-color-saturation': '78%',
            'primary-color-lightness': '64%'
        },
        'properties': {
            'color-scheme': 'light dark'
        }
    }
});
