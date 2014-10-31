'use strict';

function LoginController($scope, $location, config)
{
    $scope.submit = function () {
        config.server = $scope.server;
        config.username = $scope.username;
        config.password = $scope.password;

        $location.path('/tasks');
    };

    $scope.logout = function () {
        $http.defaults.headers.common.Authorization = '';
        $scope.tasks = null;

        config.username = null;
        config.password = null;
        config.server = null;
    }
}
LoginController.$inject = ['$scope', '$location', 'config'];

function TasksListController($scope, Alerts, authService, $http, $location, config, $resource)
{
    if (config.server === null) {
        $location.path('/login');
    }
    else {
        var credential = btoa(config.username + ':' + config.password);
        $http.defaults.headers.common.Authorization = 'Basic ' + credential;
        authService.loginConfirmed();

        var Tasks = $resource(
            config.server + '/tasks/:taskId',
            {taskId: '@taskId'},
            {
                'save': { method: 'POST' },
                'update': { method: 'PUT' },
                'complete': { method: 'POST', url: config.server + '/tasks/:taskId/complete' },
                'uncomplete': { method: 'POST', url: config.server + '/tasks/:taskId/uncomplete' }
            }
        );
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
            $scope.tasks[data.id] = Tasks.get({'taskId': task.id});
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

    $scope.alerts = Alerts.all();

    $scope.closeAlert = function (index) {
        Alerts.close(index);
    }

    $scope.refresh();
}
TasksListController.$inject = ['$scope', 'Alerts', 'authService', '$http', '$location', 'config', '$resource'];
