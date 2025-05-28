using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Auth
{
    public class RefreshTokenRequestDto
    {
        [Required]
        public string Token { get; set; } = null!;

        [Required]
        public string RefreshToken { get; set; } = null!;
    }
}
