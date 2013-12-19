'use strict';

function TasksListController($scope, Tasks, Alerts)
{
    $scope.tasks = Tasks.query();

    $scope.update = function (task) {
        Tasks.update({'taskId': task.id}, task, function (data) {
            Alerts.add('success', 'Task #' + data.id + ' updated.');
        }, function (response) {
            Alerts.add('danger', 'Task #' + response.config.data.id + ' couldn’t be update.');
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
