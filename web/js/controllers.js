'use strict';

function TasksListController($scope, Tasks)
{
    $scope.tasks = Tasks.query();

    $scope.update = function (task) {
        Tasks.update({'taskId': task.id}, task);
    };
}
TasksListController.$inject = ['$scope', 'Tasks'];
