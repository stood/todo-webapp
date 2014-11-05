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

app.directive('onLongPress', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $elm, $attrs) {
            $elm.bind('touchstart', function(evt) {
                // Locally scoped variable that will keep track of the long press
                $scope.longPress = true;

                // We'll set a timeout for 600 ms for a long press
                $timeout(function() {
                    if ($scope.longPress) {
                        // If the touchend event hasn't fired,
                        // apply the function given in on the element's on-long-press attribute
                        $scope.$apply(function() {
                            $scope.$eval($attrs.onLongPress)
                        });
                    }
                }, 600);
            });

            $elm.bind('touchend', function(evt) {
                // Prevent the onLongPress event from firing
                $scope.longPress = false;
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function() {
                        $scope.$eval($attrs.onTouchEnd)
                    });
                }
            });
        }
    };
})

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});
