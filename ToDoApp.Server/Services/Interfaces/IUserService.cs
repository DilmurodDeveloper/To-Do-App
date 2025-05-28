using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoApp.Server.DTOs.Users;

namespace ToDoApp.Server.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(Guid userId);
        Task<bool> DeleteUserAsync(Guid userId);
        Task<UserDto> UpdateUserAsync(Guid userId, UpdateUserDto model);
        Task<UserProfileDto> GetUserProfileAsync(Guid userId);
    }
}
