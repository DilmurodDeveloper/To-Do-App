using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.DTOs.Users;

namespace ToDoApp.Server.Services.Interfaces
{
    public interface IUserGroupService
    {
        Task<List<UserDto>> GetUsersInGroupAsync(Guid groupId);
        Task<List<GroupDto>> GetGroupsForUserAsync(Guid userId);
        Task<bool> AddUserToGroupAsync(Guid userId, Guid groupId);
        Task<bool> RemoveUserFromGroupAsync(Guid userId, Guid groupId);
        Task<bool> IsGroupOwnerAsync(Guid userId, Guid groupId);
    }
}
