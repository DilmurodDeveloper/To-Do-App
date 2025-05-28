using System.ComponentModel.DataAnnotations;
using ToDoApp.Server.Models;

namespace ToDoApp.Server.DTOs.Tasks
{
    public class UpdateTaskDto
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime? DueDate { get; set; }

        [Required]
        public TodoTaskStatus Status { get; set; }

        [Required]
        public Guid GroupId { get; set; }

        public string? AssignedToUserId { get; set; }
    }
}
