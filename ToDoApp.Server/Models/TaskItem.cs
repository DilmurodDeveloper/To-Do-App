using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
        public TodoTaskStatus Status { get; set; } = TodoTaskStatus.Pending;

        [Required]
        public Guid GroupId { get; set; }
        public Group? Group { get; set; }

        [Required]
        public Guid AssignedToUserId { get; set; }
        public ApplicationUser? AssignedToUser { get; set; }
    }
}
