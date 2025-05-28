using ToDoApp.Server.Models;

namespace ToDoApp.Server.Services.Interfaces
{
    public interface IUserGroupService
    {
        Task<List<ApplicationUser>> GetUsersInGroupAsync(Guid groupId);
        Task<List<Group>> GetGroupsForUserAsync(Guid userId);
        Task<bool> AddUserToGroupAsync(Guid userId, Guid groupId);
        Task<bool> RemoveUserFromGroupAsync(Guid userId, Guid groupId);
    }
}
