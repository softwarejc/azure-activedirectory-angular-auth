using System.Threading.Tasks;

namespace MyTodoList.Hubs.Notes
{
    // Client calls
    public interface INotesCalls
    {
        // Add note
        Task AddNote(string note);

        // Remove note
        Task RemoveNote(int roomId);
    }
}