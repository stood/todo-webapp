angular.module('todo.txt', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/tasks', {
                templateUrl: '/partials/tasks.html',
                controller: TasksListController
            })
            .when('/tasks/:taskId', {
                templateUrl: '/partials/task.html',
                controller: TaskController
            })
            .otherwise({redirectTo: '/tasks'});
    }])
