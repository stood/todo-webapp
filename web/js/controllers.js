'use strict';

function TasksListController($scope, Tasks)
{
    $scope.tasks = Tasks.query();
}
TasksListController.$inject = ['$scope', 'Tasks'];

function TaskController($scope, $routeParams, Tasks)
{
    $scope.task = Tasks.get({'taskId': $routeParams.taskId});
}
TaskController.$inject = ['$scope', '$routeParams', 'Tasks'];
