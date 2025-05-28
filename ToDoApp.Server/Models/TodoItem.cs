using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.Models
{
    public class TodoItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string? Title { get; set; }
        public bool IsCompleted { get; set; }

        [Required]
        public string? UserId { get; set; }
    }

}
