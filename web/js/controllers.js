'use strict';

function LoginController($scope, $location, config)
{
    $scope.submit = function () {
        config.api = {
            server: $scope.server,
            username: $scope.username,
            password: $scope.password
        };

        if ($scope.remember) {
            config.save();
        }
        $location.path('/tasks');
    };
}
LoginController.$inject = ['$scope', '$location', 'config'];

function TasksListController($scope, Alerts, authService, $http, $location, config, $resource)
{
    if (config.api === null) {
        $location.path('/login');
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
        config.clear();
        $location.path('/login');
    }

    $scope.$on('event:auth-loginRequired', function() {
        $location.path('/login');
    });

    $scope.refresh = function () {
        $scope.tasks = Tasks.query();
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

    $scope.closeAlert = function (index) {
        Alerts.close(index);
    }

    $scope.refresh();
}
TasksListController.$inject = ['$scope', 'Alerts', 'authService', '$http', '$location', 'config', '$resource'];
