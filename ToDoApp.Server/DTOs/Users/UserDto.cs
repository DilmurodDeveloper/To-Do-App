using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Users
{
    public class UserDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string UserName { get; set; } = null!;

        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        public List<string> Roles { get; set; } = new();
    }
}
