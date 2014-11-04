'use strict';

var app = angular.module('todo.txt', ['ngRoute', 'tasksServices', 'xeditable', 'http-auth-interceptor']);

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
    $routeProvider.when('/register', {
        templateUrl: 'partials/register.html',
        controller: RegisterController
    });

    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
        controller: LoginController
    });

    $routeProvider.when('/tasks', {
        templateUrl: 'partials/tasks.html',
        controller: TasksListController
    });

    $routeProvider.otherwise({redirectTo: '/tasks'});
}]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
