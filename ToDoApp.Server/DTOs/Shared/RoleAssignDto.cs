using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Shared
{
    public class RoleAssignDto
    {
        [Required]
        public string Role { get; set; } = null!;
    }
}
