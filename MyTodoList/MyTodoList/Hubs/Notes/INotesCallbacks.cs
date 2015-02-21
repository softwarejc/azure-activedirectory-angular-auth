using System.Threading.Tasks;
using MyTodoList.Models.Notes;

namespace MyTodoList.Hubs.Notes
{
    // Client callbacks
    public interface INotesCallbacks
    {
        // Notify note added
        Task BroadcastNewNote(Note newNote);
        // Notify note removed
        Task BroadcastRemoveNote(int noteId);
    }
}