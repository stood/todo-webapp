'use strict';

var DEFAULT_SERVER = 'http://api.todo.homecomputing.fr';

function RegisterController($scope, $location, $resource, Alerts)
{
    $scope.server = DEFAULT_SERVER;

    $scope.register = function () {
        var Users = $resource(
            $scope.server + '/users/:userId',
            {userId: '@userId'},
            {
                'save': { method: 'POST' }
            }
        );

        Users.save({
            'username': $scope.username,
            'password': $scope.password,
            'email': $scope.email
        }, function (data) {
            Alerts.add('success', data.message);
            $location.path('/login');
        }, function (response) {
            Alerts.add('danger', 'Couldn’t register');
        });

    };
}
RegisterController.$inject = ['$scope', '$location', '$resource', 'Alerts'];

function LoginController($scope, $location, config, Alerts)
{
    $scope.server = DEFAULT_SERVER;

    $scope.login = function () {
        config.api = {};

        config.api.server = $scope.server;
        config.api.username = $scope.username;
        config.api.password = $scope.password;

        config.save();
        $location.path('/tasks');
    };
}
LoginController.$inject = ['$scope', '$location', 'config', 'Alerts'];

function getAuthorization(method, uri, param)
{
    var A1 = md5(param.username + ':' + param.realm + ':' + param.password);
    var A2 = md5(method + ':' + uri);
    var response = md5(A1 + ':' + param.nonce + ':' + param.nc + ':' + param.cnonce + ':' + param.qop + ':' + A2);
    return 'Digest username="' + param.username + '", realm="' + param.realm
        + '", nonce="' + param.nonce + '", uri="' + uri
        + '", cnonce="' + param.cnonce + '", nc="' + param.nc
        + '", qop="' + param.qop + '", response="' + response + '"';
}

function unq(quotedString) {
    return quotedString.substr(1, quotedString.length - 2).replace(/(?:(?:\r\n)?[ \t])+/g, ' ');
}

function TasksListController($scope, Alerts, authService, $http, $location, config, $resource)
{
    if (config.api === null) {
        $location.path('/login');
        return;
    }


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

    $scope.logout = function () {
        $http.defaults.headers.common.Authorization = '';
        $scope.tasks = null;
        $scope.projects = null;
        $scope.contexts = null;
        config.clear();
        $location.path('/login');
    }

    $scope.$on('event:auth-loginRequired', function (event, rejection) {
        var ws = '(?:(?:\\r\\n)?[ \\t])+',
            reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/,
            token = '(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2E\\x30-\\x39\\x3F\\x41-\\x5A\\x5E-\\x7A\\x7C\\x7E]+)',
            quotedString = '"(?:[\\x00-\\x0B\\x0D-\\x21\\x23-\\x5B\\\\x5D-\\x7F]|' + ws + '|\\\\[\\x00-\\x7F])*"',
            tokenizer = new RegExp(token + '(?:=(?:' + quotedString + '|' + token + '))?', 'g'),
            tokens = rejection.data.message.match(tokenizer),
            uri = reg.exec(rejection.config.url);

        config.api.nc = '00000001';
        config.api.uri = rejection.config.url;

        tokens.forEach(function (value) {
            if (value.match('nonce')) {
                config.api.nonce = unq(value.split('=')[1]);
            }
            if (value.match('realm')) {
                config.api.realm = unq(value.split('=')[1]);
            }
            if (value.match('qop')) {
                config.api.qop = unq(value.split('=')[1]);
            }
            if (value.match('cnonce')) {
                config.api.cnonce = unq(value.split('=')[1]);
            }
        });

        $http.defaults.headers.common.Authorization = getAuthorization(
            'GET',
            rejection.config.url,
            config.api
        );
        authService.loginConfirmed();

        //$location.path('/login');
    });

    $scope.refresh = function () {
        $scope.projects = [];
        $scope.contexts = [];
        $scope.tasks = Tasks.query(function (data) {
            data.forEach(function (d) {
                $scope.projects = $scope.projects.concat(d.projects);
                $scope.contexts = $scope.contexts.concat(d.contexts);
            });
            $scope.projects = $.unique($scope.projects.sort());
            $scope.contexts = $.unique($scope.contexts.sort());
        }, function (response) {
            if (response.status === 403) {
                Alerts.add('danger', 'Invalid username or password');
                $scope.logout();
            }
            else {
                Alerts.add('danger', 'Unable to update tasks: ' + response.statusText);
            }
        });
    };

    $scope.save = function (raw) {
        Tasks.save({'raw': raw}, function (data) {
            $scope.tasks[data.id] = Tasks.get({'taskId': data.id});
            $scope.query = '';
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

    $scope.hideMenu = function () {
        $('.navbar-collapse').collapse('hide');
    };

    $scope.toggleSidebar = function () {
        $('#wrapper').toggleClass('toggled');
    };

    $scope.alerts = Alerts.all();

    $scope.refresh();
}
TasksListController.$inject = ['$scope', 'Alerts', 'authService', '$http', '$location', 'config', '$resource'];

function AlertsController($scope, Alerts)
{
    $scope.alerts = Alerts.all();

    $scope.close = function (index) {
        Alerts.close(index);
    }
}
AlertsController.$inject = ['$scope', 'Alerts'];
