'use strict';

var app = angular.module('todo.txt', ['ngRoute', 'tasksServices']);

var serialize = function(obj, prefix) {
    var str = [];
    for(var p in obj) {
        if (p.substr(0, 1) !== '$') {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                    serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.transformRequest = function (data) {
        if (data !== undefined) {
            data = serialize(data);
        }
        return data;
    };
    $httpProvider.defaults.headers.put['Content-Type']
        = $httpProvider.defaults.headers.post['Content-Type']
        = 'application/x-www-form-urlencoded; charset=UTF-8';
}]);

app.config(['$routeProvider', function($routeProvider) {
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
