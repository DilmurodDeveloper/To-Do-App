using ToDoApp.Server.Models;
using TaskStatus = ToDoApp.Server.Models.TodoTaskStatus;

namespace ToDoApp.Server.Services.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskItem>> GetAllTasksAsync(Guid groupId);
        Task<TaskItem?> GetTaskByIdAsync(Guid taskId);
        Task<TaskItem> CreateTaskAsync(TaskItem task);
        Task<bool> UpdateTaskAsync(TaskItem task);
        Task<bool> DeleteTaskAsync(Guid taskId);
        Task<bool> AssignTaskToUserAsync(Guid taskId, string userId);
        Task<bool> ChangeTaskStatusAsync(Guid taskId, TaskStatus status);
    }
}
