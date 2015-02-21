using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace MyTodoList.Hubs.Notes
{
    [HubName(Name)]
    public class NotesHub : Hub
    {
        public const string Name = "notesHub";

        /// <summary>
        /// Gets the connected signalR hub.
        /// </summary>
        public static IHubContext GetConnectedHub()
        {
            return GlobalHost.ConnectionManager.GetHubContext(Name);
        }
    }
}