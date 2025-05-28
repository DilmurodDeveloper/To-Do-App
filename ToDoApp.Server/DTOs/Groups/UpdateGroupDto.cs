using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Groups
{
    public class UpdateGroupDto
    {
        [Required]
        public string Name { get; set; } = null!;
    }
}
