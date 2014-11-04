'use strict';

var DEFAULT_SERVER = 'https://api.todo.homecomputing.fr';

function RegisterController($scope, $location, $resource, Alerts)
{
    $scope.server = DEFAULT_SERVER;

    $scope.register = function () {
        var Users = $resource(
            $scope.server + '/users/:userId',
            {userId: '@userId'},
            {
                'save': { method: 'POST' }
            }
        );

        Users.save({
            'username': $scope.username,
            'password': $scope.password,
            'email': $scope.email
        }, function (data) {
            Alerts.add('success', data.message);
            $location.path('/login');
        }, function (response) {
            Alerts.add('danger', 'Couldn’t register');
        });

    };
}
RegisterController.$inject = ['$scope', '$location', '$resource', 'Alerts'];

function LoginController($scope, $location, config, Alerts)
{
    $scope.server = DEFAULT_SERVER;

    $scope.login = function () {
        config.api = {
            server: $scope.server,
            username: $scope.username,
            password: $scope.password
        };

        config.save($scope.remember);
        $location.path('/tasks');
    };
}
LoginController.$inject = ['$scope', '$location', 'config', 'Alerts'];

function TasksListController($scope, Alerts, authService, $http, $location, config, $resource)
{
    if (config.api === null) {
        $location.path('/login');
        return;
    }
    else {
        var credential = btoa(config.api.username + ':' + config.api.password);
        $http.defaults.headers.common.Authorization = 'Basic ' + credential;
        authService.loginConfirmed();

        var Tasks = $resource(
            config.api.server + '/tasks/:taskId',
            {taskId: '@taskId'},
            {
                'save': { method: 'POST' },
                'update': { method: 'PUT' },
                'complete': { method: 'POST', url: config.api.server + '/tasks/:taskId/complete' },
                'uncomplete': { method: 'POST', url: config.api.server + '/tasks/:taskId/uncomplete' }
            }
        );
    }

    $scope.logout = function () {
        $http.defaults.headers.common.Authorization = '';
        $scope.tasks = null;
        $scope.projects = null;
        $scope.contexts = null;
        config.clear();
        $location.path('/login');
    }

    $scope.$on('event:auth-loginRequired', function() {
        $location.path('/login');
    });

    $scope.refresh = function () {
        $scope.projects = [];
        $scope.contexts = [];
        $scope.tasks = Tasks.query(function (data) {
            data.forEach(function (d) {
                $scope.projects = $scope.projects.concat(d.projects);
                $scope.contexts = $scope.contexts.concat(d.contexts);
            });
            $scope.projects = $.unique($scope.projects.sort());
            $scope.contexts = $.unique($scope.contexts.sort());
        }, function (response) {
            if (response.status === 403) {
                Alerts.add('danger', 'Invalid username or password');
                $scope.logout();
            }
            else {
                Alerts.add('danger', 'Unable to update tasks: ' + response.statusText);
            }
        });
    };

    $scope.save = function (raw) {
        Tasks.save({'raw': raw}, function (data) {
            $scope.tasks[data.id] = Tasks.get({'taskId': data.id});
            Alerts.add('success', data.message);
        }, function (response) {
            Alerts.add('danger', 'Couldn’t create task');
        });
    };

    $scope.do = function (action, task) {
        var f = eval('Tasks.' + action);

        f({'taskId': task.id}, task, function (data) {
            $scope.tasks[task.id] = Tasks.get({'taskId': task.id});
            Alerts.add('success', data.message);
        }, function (response) {
            Alerts.add('danger', 'Task ' + task.id + ' couldn’t be update');
        });
    };

    $scope.complete = function (task) {
        $scope.do('complete', task);
    };

    $scope.uncomplete = function (task) {
        $scope.do('uncomplete', task);
    };

    $scope.update = function (task) {
        $scope.do('update', task);
    };

    $scope.hasDetail = function (task) {
        return task.created || task.completed;
    };

    $scope.alerts = Alerts.all();

    $scope.refresh();

    $scope.hideMenu = function () {
        $('.navbar-collapse').collapse('hide');
    };

    $scope.toggleSidebar = function () {
        $('#wrapper').toggleClass('toggled');
    };
}
TasksListController.$inject = ['$scope', 'Alerts', 'authService', '$http', '$location', 'config', '$resource'];

function AlertsController($scope, Alerts)
{
    $scope.alerts = Alerts.all();

    $scope.close = function (index) {
        Alerts.close(index);
    }
}
AlertsController.$inject = ['$scope', 'Alerts'];
