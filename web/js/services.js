'use strict';

angular.module('tasksServices', ['ngResource', 'config'])
    .factory('Tasks', function ($resource, API_END_POINT) {
        return $resource(
            'http://:api_end_point/tasks/:taskId',
            {api_end_point: API_END_POINT, taskId: '@taskId'},
            {
                'create': { method: 'POST' },
                'update': { method: 'PATCH' },
                'save': { method: 'PUT' }
            }
        );
    })
    .factory('Alerts', function() {
        var alerts = [];

        return {
            all: function() {
                return alerts;
            },
            add: function(type, message) {
                alerts.push({ type: type, message: message });
            },
            close: function(index) {
                alerts.splice(index, 1);
            }
        }
    });
