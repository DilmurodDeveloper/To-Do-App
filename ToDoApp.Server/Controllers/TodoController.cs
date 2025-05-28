using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.Server.Models;
using ToDoApp.Server.Data;
using ToDoApp.Server.Hubs;

namespace ToDoApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<TodoHub> _hub;

        public TodoController(ApplicationDbContext context, IHubContext<TodoHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var todos = await _context.TodoItems
                .Where(t => t.UserId == userId)
                .ToListAsync();

            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TodoItem item)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            item.UserId = userId;

            _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();

            await _hub.Clients.All.SendAsync("ReceiveTodoUpdate");

            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TodoItem updatedItem)
        {
            var todo = await _context.TodoItems.FindAsync(id);
            if (todo == null) return NotFound();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (todo.UserId != userId) return Forbid();

            todo.Title = updatedItem.Title;
            todo.IsCompleted = updatedItem.IsCompleted;

            await _context.SaveChangesAsync();

            await _hub.Clients.All.SendAsync("ReceiveTodoUpdate");

            return Ok(todo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todo = await _context.TodoItems.FindAsync(id);
            if (todo == null) return NotFound();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (todo.UserId != userId) return Forbid();

            _context.TodoItems.Remove(todo);
            await _context.SaveChangesAsync();

            await _hub.Clients.All.SendAsync("ReceiveTodoUpdate");

            return NoContent();
        }
    }
}
