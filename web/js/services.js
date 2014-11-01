'use strict';

angular.module('tasksServices', ['ngResource'])
    .service('config', function () {
        this.api = JSON.parse(
            window.localStorage.getItem('config.api')
        );

        self = this;
        this.save = function () {
            window.localStorage.setItem('config.api', JSON.stringify(self.api));
        };

        this.clear = function () {
            window.localStorage.removeItem('config.api');
        };
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
