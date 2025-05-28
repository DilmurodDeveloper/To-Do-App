using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.Models;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin/tasks")]
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
    public async Task<IActionResult> CreateTask([FromBody] TaskItem task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return Ok(task);
    }

    [HttpPut("{taskId}")]
    public async Task<IActionResult> UpdateTask(Guid taskId, [FromBody] TaskItem updatedTask)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        if (task == null)
            return NotFound();

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.DueDate = updatedTask.DueDate;
        task.Status = updatedTask.Status;
        task.AssignedToUserId = updatedTask.AssignedToUserId;
        task.GroupId = updatedTask.GroupId;

        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpDelete("{taskId}")]
    public async Task<IActionResult> DeleteTask(Guid taskId)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        if (task == null)
            return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return Ok("Task deleted");
    }
}
