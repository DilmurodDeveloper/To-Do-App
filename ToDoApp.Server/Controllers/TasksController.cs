using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.DTOs.Tasks;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services.Interfaces;
using TaskStatus = ToDoApp.Server.Models.TodoTaskStatus;

namespace ToDoApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]  
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("group/{groupId}")]
        public async Task<IActionResult> GetTasksByGroup(Guid groupId)
        {
            var tasks = await _taskService.GetAllTasksAsync(groupId);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(Guid id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskItem task)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdTask = await _taskService.CreateTaskAsync(task);
            return CreatedAtAction(nameof(GetTaskById), new { id = createdTask.Id }, createdTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] TaskItem task)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != task.Id)
                return BadRequest("Task ID mismatch");

            var result = await _taskService.UpdateTaskAsync(task);
            if (!result) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var result = await _taskService.DeleteTaskAsync(id);
            if (!result) return NotFound();

            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> ChangeTaskStatus(Guid id, [FromBody] UpdateTaskStatusDto dto)
        {
            var result = await _taskService.ChangeTaskStatusAsync(id, dto.Status);
            if (!result) return NotFound(new { message = "Task not found or status update failed." });

            return NoContent();
        }

        [HttpPut("{id}/assign/{userId}")]
        public async Task<IActionResult> AssignTaskToUser(Guid id, Guid userId)
        {
            var result = await _taskService.AssignTaskToUserAsync(id, userId.ToString());
            if (!result) return NotFound(new { message = "Task or user not found." });

            return NoContent();
        }
    }
}
