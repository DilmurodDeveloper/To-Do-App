using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Auth
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email or Username is required")]
        public string UserNameOrEmail { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        public string Password { get; set; } = null!;
    }
}
