(function () {
    'use strict';
    var app = angular.module('App', ['ngResource', 'ngRoute','ngDialog']);
    app.config(['$routeProvider', function ($routeProvider) {  
        $routeProvider.when("/Items", {
            templateUrl: 'app/Items/Items.html',
            controller: 'ItemsCtrl',
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/ItemsStatistics',
            {
                templateUrl: 'app/ItemsStatistics/ItemsStatistics.html',
                controller: 'ItemsStatisticsCtrl',
                caseInsensitiveMatch: true
            });
        $routeProvider.otherwise({ redirectTo: '/Items' });
    }]);
    app.run([function () {
    }]);
})();