using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services.Interfaces;

namespace ToDoApp.Server.Services
{
    public class GroupService : IGroupService
    {
        private readonly ApplicationDbContext _context;

        public GroupService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GroupDto>> GetAllGroupsAsync()
        {
            return await _context.Groups
                .Select(g => new GroupDto
                {
                    Id = g.Id,
                    Name = g.Name
                })
                .ToListAsync();
        }

        public async Task<GroupDto> GetGroupByIdAsync(Guid groupId)
        {
            var group = await _context.Groups.FindAsync(groupId);
            if (group == null) return null!;

            return new GroupDto
            {
                Id = group.Id,
                Name = group.Name
            };
        }

        public async Task<GroupDto> CreateGroupAsync(CreateGroupDto model, Guid creatorId)
        {
            var group = new Group
            {
                Name = model.Name,
                CreatorId = creatorId  
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return new GroupDto
            {
                Id = group.Id,
                Name = group.Name
            };
        }

        public async Task<bool> UpdateGroupAsync(Guid groupId, UpdateGroupDto model)
        {
            var group = await _context.Groups.FindAsync(groupId);
            if (group == null) return false;

            group.Name = model.Name;
            _context.Groups.Update(group);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteGroupAsync(Guid groupId)
        {
            var group = await _context.Groups.FindAsync(groupId);
            if (group == null) return false;

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<GroupDto>> GetGroupsCreatedByUserAsync(Guid userId)
        {
            return await _context.Groups
                .Where(g => g.CreatorId == userId)
                .Select(g => new GroupDto
                {
                    Id = g.Id,
                    Name = g.Name
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<GroupDto>> GetGroupsUserIsMemberOfAsync(Guid userId)
        {
            return await _context.UserGroups
                .Where(ug => ug.UserId == userId)
                .Select(ug => new GroupDto
                {
                    Id = ug.Group!.Id,
                    Name = ug.Group.Name
                })
                .ToListAsync();
        }
    }
}
