using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Auth
{
    public class ForgotPasswordRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
    }
}
