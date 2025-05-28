using System.Threading.Tasks;
using ToDoApp.Server.DTOs.Auth;
using ToDoApp.Server.DTOs.Users;

namespace ToDoApp.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserDto> RegisterAsync(RegisterModel model, string role);
        Task<string> LoginAsync(LoginModel model);
        Task<string> GenerateEmailConfirmationTokenAsync(string email);
        Task<bool> ConfirmEmailAsync(string email, string token);
        Task<string> GeneratePasswordResetTokenAsync(string email);
        Task<bool> ResetPasswordAsync(ResetPasswordModel model);
        Task<AuthResponseDto> RefreshTokenAsync(string token, string refreshToken);
    }
}
