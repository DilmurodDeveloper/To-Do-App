using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
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

        public async Task<List<ApplicationUser>> GetUsersInGroupAsync(Guid groupId)
        {
            return await _context.UserGroups
                .Where(ug => ug.GroupId == groupId)
                .Select(ug => ug.User!)
                .ToListAsync();
        }

        public async Task<List<Group>> GetGroupsForUserAsync(Guid userId)
        {
            return await _context.UserGroups
                .Where(ug => ug.UserId == userId)
                .Select(ug => ug.Group!)
                .ToListAsync();
        }

        public async Task<bool> AddUserToGroupAsync(Guid userId, Guid groupId)
        {
            var existing = await _context.UserGroups
                .AnyAsync(ug => ug.UserId == userId && ug.GroupId == groupId);

            if (existing)
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
    }
}
