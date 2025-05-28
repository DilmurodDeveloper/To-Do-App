namespace ToDoApp.Server.DTOs.Auth
{
    public class RefreshTokenModel
    {
        public string Token { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
    }
}
