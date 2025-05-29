using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.DTOs.Tasks;  
using ToDoApp.Server.Models;

namespace ToDoApp.Server.Controllers
{
    [ApiController]
    [Route("api/admin/tasks")]
    [Authorize(Roles = "Admin")]
    public class AdminTaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminTaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto createTaskDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                DueDate = createTaskDto.DueDate,
                Status = createTaskDto.Status,
                GroupId = createTaskDto.GroupId,
                AssignedToUserId = string.IsNullOrEmpty(createTaskDto.AssignedToUserId)
                    ? Guid.Empty
                    : Guid.Parse(createTaskDto.AssignedToUserId)
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskById), new { taskId = task.Id }, task);
        }

        [HttpGet("{taskId}")]
        public async Task<IActionResult> GetTaskById(Guid taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPut("{taskId}")]
        public async Task<IActionResult> UpdateTask(Guid taskId, [FromBody] UpdateTaskDto updateTaskDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null)
                return NotFound();

            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;
            task.DueDate = updateTaskDto.DueDate;
            task.Status = updateTaskDto.Status;
            task.GroupId = updateTaskDto.GroupId;
            task.AssignedToUserId = string.IsNullOrEmpty(updateTaskDto.AssignedToUserId)
                ? Guid.Empty
                : Guid.Parse(updateTaskDto.AssignedToUserId);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(Guid taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
