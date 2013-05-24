'use strict';

angular.module('tasksServices', ['ngResource'])
    .factory('Tasks', function ($resource) {
        return $resource('api/tasks/:taskId');
    });
