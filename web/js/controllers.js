'use strict';

function TasksListController($scope, Tasks, Alerts)
{
    $scope.tasks = Tasks.query();

    $scope.create = function (raw) {
        Tasks.create({ raw: raw }, function (data) {
            $scope.tasks[data.id] = Tasks.get({'taskId': data.id});
            Alerts.add('success', data.message);
        }, function (response) {
            Alerts.add('danger', 'Couldn’t create task');
        });
    };

    $scope.complete = function (task) {
        Tasks.complete({'taskId': task.id}, task, function (data) {
            $scope.tasks[data.id] = Tasks.get({'taskId': data.id});
            Alerts.add('success', 'Task #' + data.id + ' completed.');
        }, function (response) {
            Alerts.add('danger', 'Task #' + response.config.data.id + ' couldn’t be complete.');
        });
    };

    $scope.uncomplete = function (task) {
        Tasks.uncomplete({'taskId': task.id}, task, function (data) {
            $scope.tasks[data.id] = Tasks.get({'taskId': data.id});
            Alerts.add('success', 'Task #' + data.id + ' uncompleted.');
        }, function (response) {
            Alerts.add('danger', 'Task #' + response.config.data.id + ' couldn’t be uncomplete.');
        });
    };

    $scope.save = function (task) {
        Tasks.save({'taskId': task.id}, task, function (data) {
            $scope.tasks[data.id] = Tasks.get({'taskId': data.id});
            Alerts.add('success', 'Task #' + data.id + ' updated.');
        }, function (response) {
            Alerts.add('danger', 'Task #' + response.config.data.id + ' couldn’t be update.');
        });
    };

    $scope.alerts = Alerts.all();

    $scope.closeAlert = function (index) {
        Alerts.close(index);
    }
}
TasksListController.$inject = ['$scope', 'Tasks', 'Alerts'];
