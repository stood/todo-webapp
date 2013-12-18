'use strict';

function TasksListController($scope, Tasks)
{
    $scope.tasks = Tasks.query();

    $scope.update = function (task) {
        Tasks.update({'taskId': task.id}, task);
    };

    $scope.save = function (task) {
        Tasks.save({'taskId': task.id}, task, function (data) {
            $scope.tasks[data.id] = Tasks.get({'taskId': data.id});
        });
    };
}
TasksListController.$inject = ['$scope', 'Tasks'];
