angular.module('todo.txt', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/tasks', {
                templateUrl: '/partials/tasks.html',
                controller: TasksListController
            })
            .otherwise({redirectTo: '/tasks'});
    }])
