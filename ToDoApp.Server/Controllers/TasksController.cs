using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.DTOs.Tasks;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services.Interfaces;

namespace ToDoApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly IGroupService _groupService;

        public TaskController(ITaskService taskService, IGroupService groupService)
        {
            _taskService = taskService;
            _groupService = groupService;
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

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetTasksByUser(Guid userId)
        {
            var tasks = await _taskService.GetTasksByUserAsync(userId);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskItem task)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetUserId();

            if (!await IsUserGroupOwner(userId, task.GroupId))
                return Forbid("Only the group owner can create tasks in this group.");

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

            var userId = GetUserId();
            var existingTask = await _taskService.GetTaskByIdAsync(id);

            if (existingTask == null)
                return NotFound();

            if (!await IsUserGroupOwner(userId, existingTask.GroupId))
                return Forbid("Only the group owner can edit tasks in this group.");

            var result = await _taskService.UpdateTaskAsync(task);
            if (!result) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var userId = GetUserId();
            var existingTask = await _taskService.GetTaskByIdAsync(id);

            if (existingTask == null)
                return NotFound();

            if (!await IsUserGroupOwner(userId, existingTask.GroupId))
                return Forbid("Only the group owner can delete tasks in this group.");

            var result = await _taskService.DeleteTaskAsync(id);
            if (!result) return NotFound();

            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> ChangeTaskStatus(Guid id, [FromBody] UpdateTaskStatusDto dto)
        {

            var existingTask = await _taskService.GetTaskByIdAsync(id);
            if (existingTask == null)
                return NotFound();

            var userId = GetUserId();
            if (!await IsUserGroupOwner(userId, existingTask.GroupId))
                return Forbid("Only the group owner can change task status.");

            var result = await _taskService.ChangeTaskStatusAsync(id, dto.Status);
            if (!result) return NotFound(new { message = "Task not found or status update failed." });

            return NoContent();
        }

        [HttpPut("{id}/assign/{userId}")]
        public async Task<IActionResult> AssignTaskToUser(Guid id, Guid userId)
        {
            var existingTask = await _taskService.GetTaskByIdAsync(id);
            if (existingTask == null)
                return NotFound();

            var currentUserId = GetUserId();
            if (!await IsUserGroupOwner(currentUserId, existingTask.GroupId))
                return Forbid("Only the group owner can assign tasks.");

            var result = await _taskService.AssignTaskToUserAsync(id, userId.ToString());
            if (!result) return NotFound(new { message = "Task or user not found." });

            return NoContent();
        }

        private Guid GetUserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        private async Task<bool> IsUserGroupOwner(Guid userId, Guid groupId)
        {
            var group = await _groupService.GetGroupByIdAsync(groupId);
            if (group == null)
                return false;

            return group.CreatorId == userId;
        }
    }
}
