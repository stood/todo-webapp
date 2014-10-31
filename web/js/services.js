'use strict';

angular.module('tasksServices', ['ngResource'])
    .service('config', function () {
        this.server = null;
        this.username = null;
        this.password = null;
    })
    .factory('Alerts', function() {
        var alerts = [];

        return {
            all: function() {
                return alerts;
            },
            add: function(type, message) {
                alerts.push({ type: type, message: message });
            },
            close: function(index) {
                alerts.splice(index, 1);
            }
        }
    });
