'use strict';

angular.module('tasksServices', ['ngResource'])
    .service('config', function () {
        this.api = JSON.parse(
            (
                window.localStorage.getItem('config.api')
                || window.sessionStorage.getItem('config.api')
            )
        );

        self = this;
        this.save = function (persistent) {
            if (persistent === true) {
                window.localStorage.setItem('config.api', JSON.stringify(self.api));
            }
            else {
                window.sessionStorage.setItem('config.api', JSON.stringify(self.api));
            }
        };

        this.clear = function () {
            window.localStorage.removeItem('config.api');
            window.sessionStorage.removeItem('config.api');
        };
    })
    .factory('Alerts', function() {
        var alerts = [];

        return {
            all: function() {
                return alerts;
            },
            add: function(type, message) {
                alerts.unshift({ type: type, message: message });
            },
            close: function(index) {
                alerts.splice(index, 1);
            }
        }
    });
