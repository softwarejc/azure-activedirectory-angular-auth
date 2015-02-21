(function () {
    'use strict';

    angular
        .module('notesModule')
        .service('notesService', ['$resource', '$rootScope', '$q', notesService]);

    function notesService($resource, $rootScope, $q) {

        // REST calls
        var _notesResource = $resource('/api/notes/:id');

        //// privates
        var _hubConnection = $.hubConnection();
        var _notesHubProxy = undefined;
        var _initialized = false;

        //// Service methods implementation
        function _initialize() {

            // Execute initialization only once...
            if (_initialized && _hubConnection.id) {
                connectedToSignalR();
                return;
            } else {
                _initialized = true;
            }

            // Hub Proxy (allows to make calls and register callbacks handlers)
            _notesHubProxy = _hubConnection.createHubProxy(notesSignalR.hubName);

            // signalR callbacks handlers
            _notesHubProxy.on(notesSignalR.onNewNote, broadcastNewNote);
            _notesHubProxy.on(notesSignalR.onRemoveNote, broadcastRemoveNote);

            // connect
            _hubConnection.start()
                .done(connectedToSignalR)
                .fail(function () { console.error('Error connecting to signalR'); });
        }

        function broadcastNewNote(note) {
            $rootScope.$broadcast(notesSignalR.onNewNote, { note: note });
        }

        function broadcastRemoveNote(noteId) {
            $rootScope.$broadcast(notesSignalR.onRemoveNote, { noteId: noteId });
        }

        function connectedToSignalR() {
            console.debug('connected to signalR, connection ID =' + _hubConnection.id);
            $rootScope.$broadcast(signalR.onConnected, { connectionId: _hubConnection.id });
        }

        function _addNote(note) {
            _notesHubProxy.invoke(notesSignalR.addNote, note);
        }

        function _removeNote(noteId) {
            _notesHubProxy.invoke(notesSignalR.removeNote, noteId);
        }

        function _getAllNotesAsync() {

            var deferred = $q.defer();

            _notesResource.query(function (notes) {
                deferred.resolve(notes);
            });

            return deferred.promise;
        }

        //// Service public methods
        // SignalR hub
        this.notesHubProxy = _notesHubProxy;

        this.initialize = _initialize;
        this.addNote = _addNote;
        this.removeNote = _removeNote;
        this.getAllNotesAsync = _getAllNotesAsync;

    }
})();
