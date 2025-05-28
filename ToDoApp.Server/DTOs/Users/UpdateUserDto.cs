using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Users
{
    public class UpdateUserDto
    {
        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }
    }
}