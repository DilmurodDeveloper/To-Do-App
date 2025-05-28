using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Models;
using ToDoApp.Server.Data;
using ToDoApp.Server.Hubs;

namespace ToDoApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<IActionResult> Get() => Ok(await _context.TodoItems.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TodoItem item)
        {
            _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();
            await _hub.Clients.All.SendAsync("ReceiveTodoUpdate");
            return Ok(item);
        }
    }
}
