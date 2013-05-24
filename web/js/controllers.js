function TasksListController($scope, $http)
{
    $http.get('/api/tasks').success(function (data) {
        $scope.tasks = data.tasks;
    });
}
TasksListController.$inject = ['$scope', '$http'];

function TaskController($scope, $http, $routeParams)
{
    var url = '/api/tasks/' + $routeParams.taskId;
    $http.get(url).success(function (data) {
        $scope.task = data;
    });
}
TaskController.$inject = ['$scope', '$http', '$routeParams'];
