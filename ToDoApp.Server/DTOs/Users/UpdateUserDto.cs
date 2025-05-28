using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Users
{
    public class UpdateUserDto
    {
        [Required]
        [MinLength(2)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MinLength(2)]
        public string LastName { get; set; } = null!;

        [Phone]
        public string? PhoneNumber { get; set; }
    }
}
