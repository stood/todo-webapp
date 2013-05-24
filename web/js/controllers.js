'use strict';

function TasksListController($scope, $http, Tasks)
{
    $scope.tasks = Tasks.query();
}
TasksListController.$inject = ['$scope', '$http', 'Tasks'];

function TaskController($scope, $http, $routeParams, Tasks)
{
    $scope.task = Tasks.get({'taskId': $routeParams.taskId});
}
TaskController.$inject = ['$scope', '$http', '$routeParams', 'Tasks'];
