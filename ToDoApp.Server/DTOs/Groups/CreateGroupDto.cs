using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Groups
{
    public class CreateGroupDto
    {
        [Required]
        public string Name { get; set; } = null!;
    }
}
