(function () {
    'use strict';

    angular
        .module('notesModule')
        .controller('loginController', ['adalAuthenticationService','$scope', loginController]);

    function loginController(adalAuthenticationService, $scope) {
        var vm = this;

        //// ---------------- PUBLIC ----------------
        //// PUBLIC fields
        // true after connected to signalR

        //// PUBLIC Methods
        vm.activate = _activate;
        vm.isAuthenticated = $scope.userInfo && $scope.userInfo.isAuthenticated;
        vm.userName = $scope.userInfo.userName;
        vm.profile = angular.fromJson($scope.userInfo.profile);

        vm.login = _login;
        vm.logOut = _logOut;

        //// ---------------- CODE TO RUN -----------
        vm.activate();

        //// ---------------- PRIVATE ---------------
        //// PRIVATE fields

        //// PRIVATE Functions - Public Methods Implementation	
        function _activate() {
            if (vm.isAuthenticated) {
                console.debug($scope.userInfo);
            } else {
                console.debug("user not authenticated");
            }
        }

        function _login() {
            console.debug("login");
            adalAuthenticationService.login();
        }

        function _logOut() {
            console.debug("logout");
            adalAuthenticationService.logOut();
        }
    }
})();
