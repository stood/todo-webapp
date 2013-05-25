'use strict';

var app = angular.module('todo.txt', ['tasksServices']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/tasks', {
        templateUrl: 'partials/tasks.html',
        controller: TasksListController
    });
    $routeProvider.when('/tasks/:taskId', {
        templateUrl: 'partials/task.html',
        controller: TaskController
    });
    $routeProvider.otherwise({redirectTo: '/tasks'});
}]);
