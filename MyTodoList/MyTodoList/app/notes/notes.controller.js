(function () {
    'use strict';

    angular
        .module('notesModule')
        .controller('notesController', ['notesService', '$cookies', '$scope', notesController]);

    function notesController(notesService, $cookies, $scope) {
        var vm = this;

        //// ---------------- PUBLIC ----------------
        //// PUBLIC fields
        // true after connected to signalR
        vm.connected = false;
        vm.connectionId = "not connected";
        vm.newNote = "";
        vm.notes = [];

        //// PUBLIC Methods
        vm.activate = _activate;
        vm.addNote = _addNote;
        vm.removeNote = _removeNote;

        //// ---------------- CODE TO RUN -----------
        vm.activate();

        //// ---------------- PRIVATE ---------------
        //// PRIVATE fields

        //// PRIVATE Functions - Public Methods Implementation	
        function _activate() {

            $scope.$on(signalR.onConnected, function (event, args) {
                connectedToSignalR(args.connectionId);
            });

            $scope.$on(notesSignalR.onNewNote, function (event, args) {
                $scope.$apply(function () {
                    vm.notes.unshift(args.note);
                });
            });

            $scope.$on(notesSignalR.onRemoveNote, function (event, args) {
                $scope.$apply(function () {
                    removeNote(args.noteId);
                });
            });

            notesService.initialize();
        }

        function _addNote() {
            notesService.addNote(vm.newNote);
            vm.newNote = "";
        }

        function _removeNote(id) {
            notesService.removeNote(id);
        }

        //// PRIVATE Functions
        function connectedToSignalR(connectionId) {
            // this needs to be executed within the apply, otherwise angular cannot update bindings
            // but sometimes is call within the scope... use safe apply -> uses scope apply only if digest is not in progress
            safeApply($scope, function () {
                vm.connected = true;
                vm.connectionId = connectionId;

                // load all notes
                notesService.getAllNotesAsync().then(function (notes) {
                    vm.notes = notes;
                });
            });
        }

        function removeNote(id) {
            vm.notes = _.without(vm.notes, _.findWhere(vm.notes, { id: id }));
        }
    }
})();
