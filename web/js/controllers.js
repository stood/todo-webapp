'use strict';

function TasksListController($scope, Tasks, Alerts)
{
    $scope.refresh = function () {
        $scope.tasks = Tasks.query();
    };

    $scope.save = function (raw) {
        Tasks.save({ raw: raw }, function (data) {
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
TasksListController.$inject = ['$scope', 'Tasks', 'Alerts'];
