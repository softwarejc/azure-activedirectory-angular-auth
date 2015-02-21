using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using MyTodoList.Models.Notes;

namespace MyTodoList.Hubs.Notes
{

    [HubName(NotesHub.Name)]
    public class NotesHub : Hub<INotesCallbacks>, INotesCalls
    {
        public const string Name = "notesHub";

        public static IHubContext<INotesCalls> GetConnectedHub()
        {
            return GlobalHost.ConnectionManager.GetHubContext<INotesCalls>(NotesHub.Name);
        }

        public async Task AddNote(string note)
        {
            Note newNote = NotesService.Add(note);

            // All connected clients will receive this call
            await Clients.All.BroadcastNewNote(newNote);
        }

        public async Task RemoveNote(int noteId)
        {
            if (NotesService.Remove(noteId))
            {
                // All connected clients will receive this call
                await Clients.All.BroadcastRemoveNote(noteId);
            }
        }
    }


}