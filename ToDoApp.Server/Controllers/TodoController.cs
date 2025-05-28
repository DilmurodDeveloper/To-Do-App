using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Services;
using ToDoApp.Server.Models;
using ToDoApp.Server.Hubs;

namespace ToDoApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _todoService;
        private readonly IHubContext<TodoHub> _hub;

        public TodoController(TodoService todoService, IHubContext<TodoHub> hub)
        {
            _todoService = todoService;
            _hub = hub;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var todos = await _todoService.GetAllAsync();
            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TodoItem item)
        {
            var createdItem = await _todoService.CreateAsync(item);
            await _hub.Clients.All.SendAsync("ReceiveTodoUpdate", createdItem);
            return Ok(createdItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TodoItem item)
        {
            if (id != item.Id)
                return BadRequest();

            var updated = await _todoService.UpdateAsync(item);
            if (!updated)
                return NotFound();

            await _hub.Clients.All.SendAsync("ReceiveTodoUpdate", item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _todoService.DeleteAsync(id);
            if (!deleted)
                return NotFound();

            await _hub.Clients.All.SendAsync("ReceiveTodoUpdate");
            return NoContent();
        }
    }
}
