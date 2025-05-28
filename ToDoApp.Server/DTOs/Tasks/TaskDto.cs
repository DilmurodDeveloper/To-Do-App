using ToDoApp.Server.Models;

namespace ToDoApp.Server.DTOs.Tasks
{
    public class TaskDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public TodoTaskStatus Status { get; set; }
        public Guid GroupId { get; set; }
        public string? GroupName { get; set; }
        public Guid AssignedToUserId { get; set; }
        public string? AssignedToUserName { get; set; }
    }
}
