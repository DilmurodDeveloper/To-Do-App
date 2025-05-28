using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.DTOs.Auth
{
    public class RefreshTokenModel
    {
        [Required]
        public string Token { get; set; } = null!;
        
        [Required]
        public string RefreshToken { get; set; } = null!;
    }
}
