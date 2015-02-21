function signalR() {}
function notesSignalR() {}
function constants() {}

// Azure Active directory name
constants.adalTenant = 'softwarejc.onmicrosoft.com';
// Azure Active directory application id (this applications have a list of assigned users in azure)
constants.adalClientId = '280a49e9-ddab-4072-9bcd-2825bcd90330';

// connected event
signalR.onConnected = "signalRConnected";

// hub
notesSignalR.hubName = "notesHub";

// client calls
notesSignalR.addNote = "addNote";
notesSignalR.removeNote = "removeNote";
notesSignalR.getAllNotes = "getAllNotes";

// client callbacks
notesSignalR.onNewNote = "broadcastNewNote";
notesSignalR.onRemoveNote = "broadcastRemoveNote";


// Some helper methods
function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
}