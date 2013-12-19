'use strict';

angular.module('tasksServices', ['ngResource', 'config'])
    .factory('Tasks', function ($resource, API_END_POINT) {
        return $resource(
            'http://:api_end_point/tasks/:taskId',
            {api_end_point: API_END_POINT, taskId: '@taskId'},
            {
                'save': { method: 'POST' },
                'update': { method: 'PUT' },
                'complete': { method: 'POST', url: 'http://:api_end_point/tasks/:taskId/complete' },
                'uncomplete': { method: 'POST', url: 'http://:api_end_point/tasks/:taskId/uncomplete' }
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
