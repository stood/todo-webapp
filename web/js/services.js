'use strict';

angular.module('tasksServices', ['ngResource', 'config'])
    .factory('Tasks', function ($resource, API_END_POINT) {
        return $resource(
            'http://:api_end_point/tasks/:taskId',
            {api_end_point: API_END_POINT, taskId: '@taskId'}
        );
    });
