    namespace ToDoApp.Server.DTOs.Tasks
{
    public class UpdateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public TaskStatus Status { get; set; }
        public Guid GroupId { get; set; }
        public string? AssignedToUserId { get; set; }
    }
}
