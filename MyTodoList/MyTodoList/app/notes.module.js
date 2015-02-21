(function () {
    'use strict';

    var notesModule = angular.module('notesModule', [
        // Angular modules 
        'ngAnimate',
        'ngResource',
        'ngCookies',

        // Custom modules 

        // 3rd Party Modules
        'ui.router',
        'ui.bootstrap',
        'AdalAngular'
    ]);

    notesModule.config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'adalAuthenticationServiceProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, adalAuthenticationServiceProvider) {

            // For any unmatched URL redirect to main URL
            $urlRouterProvider.otherwise("/login");

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $stateProvider

                 .state('notes', {
                     url: "/notes",
                     views: {
                         'main': {
                             templateUrl: "app/notes/notes.view.html",
                             controller: "notesController as vm"
                         }
                     },
                     requireADLogin: true
                 })

                 .state('login', {
                     url: "/login",
                     views: {
                         'main': {
                             templateUrl: "app/login/login.view.html",
                             controller: "loginController as vm"
                         }
                     }
                 })

            ;

            // Azure identification
            adalAuthenticationServiceProvider.init(
                {
                    tenant: constants.adalTenant,
                    clientId: constants.adalClientId,
                    extraQueryParameter: 'nux=1',
                    cacheLocation: 'localStorage' // optional cache location default is sessionStorage
                },
                $httpProvider);
        }]);

})();