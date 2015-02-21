using System.Collections.Generic;
using System.Web.Http;
using MyTodoList.Hubs.Notes;
using MyTodoList.Models.Notes;

namespace MyTodoList.Controllers
{
    [Authorize]
    public class NotesController : ApiController
    {
        // GET: api/Notes
        public IEnumerable<Note> Get()
        {
            return NotesService.GetAll();
        }

        // POST: api/Notes
        public void Post([FromBody]string note)
        {
            NotesHub.GetConnectedHub().Clients.All.AddNote(note);
        }


        // DELETE: api/Notes
        public void Delete(int noteId)
        {
            NotesHub.GetConnectedHub().Clients.All.RemoveNote(noteId);
        }
    }
}
