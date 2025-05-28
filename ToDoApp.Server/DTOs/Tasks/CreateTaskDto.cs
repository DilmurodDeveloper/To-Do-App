using ToDoApp.Server.Models;

namespace ToDoApp.Server.DTOs.Tasks
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public TodoTaskStatus Status { get; set; } = TodoTaskStatus.Pending;
        public Guid GroupId { get; set; }
        public string? AssignedToUserId { get; set; }
    }
}
