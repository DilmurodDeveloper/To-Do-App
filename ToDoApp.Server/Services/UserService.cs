using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.DTOs.Tasks;
using ToDoApp.Server.DTOs.Users;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services.Interfaces;

namespace ToDoApp.Server.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public UserService(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            var users = await _userManager.Users.ToListAsync();

            return users.Select(user => new UserDto
            {
                Id = user.Id,
                Email = user.Email!,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber
            }).ToList();
        }

        public async Task<UserDto?> GetUserByIdAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email!,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber
            };
        }

        public async Task<bool> DeleteUserAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        public async Task<UserDto> UpdateUserAsync(Guid userId, UpdateUserDto model)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) throw new Exception("User not found");

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PhoneNumber = model.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                throw new Exception("Failed to update user");

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email!,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber
            };
        }

        public async Task<UserProfileDto> GetUserProfileAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                throw new Exception("User not found");

            var tasks = await _context.Tasks
                .Where(t => t.AssignedToUserId == userId)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt,
                    DueDate = t.DueDate,
                    Status = t.Status
                })
                .ToListAsync();

            var createdGroups = await _context.Groups
                .Where(g => g.CreatorId == userId)
                .Select(g => new GroupDto
                {
                    Id = g.Id,
                    Name = g.Name
                })
                .ToListAsync();

            var memberGroups = await _context.UserGroups
                .Where(ug => ug.UserId == userId)
                .Select(ug => new GroupDto
                {
                    Id = ug.Group!.Id,
                    Name = ug.Group.Name
                })
                .ToListAsync();

            return new UserProfileDto
            {
                UserInfo = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email!,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber
                },
                Tasks = tasks,
                CreatedGroups = createdGroups,
                MemberGroups = memberGroups
            };
        }
    }
}
