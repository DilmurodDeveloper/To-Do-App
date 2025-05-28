using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services.Interfaces;
using TaskStatus = ToDoApp.Server.Models.TodoTaskStatus;

namespace ToDoApp.Server.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskItem>> GetAllTasksAsync(Guid groupId)
        {
            return await _context.Tasks
                .Include(t => t.AssignedToUser)
                .Include(t => t.Group)
                .AsNoTracking()
                .Where(t => t.GroupId == groupId)
                .ToListAsync();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(Guid taskId)
        {
            return await _context.Tasks
                .Include(t => t.AssignedToUser)
                .Include(t => t.Group)
                .FirstOrDefaultAsync(t => t.Id == taskId);
        }

        public async Task<TaskItem> CreateTaskAsync(TaskItem task)
        {
            task.Id = Guid.NewGuid();
            task.CreatedAt = DateTime.UtcNow;

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }

        public async Task<bool> UpdateTaskAsync(TaskItem task)
        {
            var existingTask = await _context.Tasks.FindAsync(task.Id);
            if (existingTask == null) return false;

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.DueDate = task.DueDate;
            existingTask.Status = task.Status;
            existingTask.GroupId = task.GroupId;
            existingTask.AssignedToUserId = task.AssignedToUserId;

            _context.Tasks.Update(existingTask);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTaskAsync(Guid taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AssignTaskToUserAsync(Guid taskId, string userId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return false;

            task.AssignedToUserId = Guid.Parse(userId); 
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ChangeTaskStatusAsync(Guid taskId, TaskStatus status)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return false;

            task.Status = status;
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
