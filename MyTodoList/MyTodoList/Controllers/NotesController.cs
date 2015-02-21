using System.Collections.Generic;
using System.Net;
using System.Net.Http;
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
        public HttpResponseMessage Post([FromBody]Note note)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            Note newNote = NotesService.Add(note.Text);

            // All connected clients will receive this call
            NotesHub.GetConnectedHub().Clients.All.BroadcastNewNote(newNote);

            // response back
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE: api/Notes
        public HttpResponseMessage Delete(int noteId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (NotesService.Remove(noteId))
            {
                // All connected clients will receive this call
                NotesHub.GetConnectedHub().Clients.All.BroadcastRemoveNote(noteId);
            }

            // response back
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
