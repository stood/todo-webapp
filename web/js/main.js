'use strict';

requirejs.config({
    baseUrl: 'js',
    paths: {
        angular: 'lib/angular/angular.min',
        angularRoute: 'lib/angular-route/angular-route.min',
        angularResource: 'lib/angular-resource/angular-resource.min',
        xeditable: 'lib/angular-xeditable/dist/js/xeditable.min',
        config: 'config/current'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': {
            deps: ['angular']
        },
        'angularResource': {
            deps: ['angular']
        },
        'xeditable': {
            deps: ['angular']
        },
        'config': {
            deps: ['angular']
        },
        'services': {
            deps: ['angular', 'angularResource']
        },
        'controllers': {
            deps: ['angular', 'services']
        },
        'app': {
            deps: [
                'config',
                'install',
                'controllers',
                'angularRoute',
                'xeditable'
            ]
        }
    },
    priority: [
        'angular'
    ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

requirejs(['angular', 'app'], function (angular) {
    angular.element().ready(function() {
        angular.resumeBootstrap([app['name']]);
    });
});
