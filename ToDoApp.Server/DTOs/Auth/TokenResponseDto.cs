namespace ToDoApp.Server.DTOs.Auth
{
    public class TokenResponseDto
    {
        public string Token { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
        public DateTime Expiration { get; set; }
    }
}
