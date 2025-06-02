using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.DTOs.Users;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services.Interfaces;

namespace ToDoApp.Server.Services
{
    public class UserGroupService : IUserGroupService
    {
        private readonly ApplicationDbContext _context;

        public UserGroupService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDto>> GetUsersInGroupAsync(Guid groupId)
        {
            var users = await _context.UserGroups
                .Include(ug => ug.User)
                .Where(ug => ug.GroupId == groupId)
                .Select(ug => ug.User)
                .ToListAsync();

            var userDtos = users.Select(u => new UserDto
            {
                Id = u.Id,
                Email = u.Email,
                UserName = u.UserName,
                FirstName = u.FirstName,
                LastName = u.LastName,
                PhoneNumber = u.PhoneNumber,
                Roles = new List<string>() 
            }).ToList();

            return userDtos;
        }

        public async Task<List<GroupDto>> GetGroupsForUserAsync(Guid userId)
        {
            var groups = await _context.UserGroups
                .Include(ug => ug.Group)
                .Where(ug => ug.UserId == userId)
                .Select(ug => ug.Group)
                .ToListAsync();

            var groupDtos = groups.Select(g => new GroupDto
            {
                Id = g.Id,
                Name = g.Name,
                CreatorId = g.CreatorId
            }).ToList();

            return groupDtos;
        }

        public async Task<bool> AddUserToGroupAsync(Guid userId, Guid groupId)
        {
            var exists = await _context.UserGroups
                .AnyAsync(ug => ug.UserId == userId && ug.GroupId == groupId);

            if (exists)
                return false;

            var userGroup = new UserGroup
            {
                UserId = userId,
                GroupId = groupId
            };

            _context.UserGroups.Add(userGroup);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RemoveUserFromGroupAsync(Guid userId, Guid groupId)
        {
            var userGroup = await _context.UserGroups
                .FirstOrDefaultAsync(ug => ug.UserId == userId && ug.GroupId == groupId);

            if (userGroup == null)
                return false;

            _context.UserGroups.Remove(userGroup);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsGroupOwnerAsync(Guid userId, Guid groupId)
        {
            return await _context.Groups
                .AsNoTracking()
                .AnyAsync(g => g.Id == groupId && g.CreatorId == userId);
        }
    }
}
