using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.DTOs.Users;

namespace ToDoApp.Server.Services.Interfaces
{
    public interface IGroupService
    {
        Task<IEnumerable<GroupDto>> GetAllGroupsAsync();
        Task<GroupDto> GetGroupByIdAsync(Guid groupId);
        Task<GroupDto> CreateGroupAsync(CreateGroupDto model, Guid creatorId);
        Task<bool> UpdateGroupAsync(Guid groupId, UpdateGroupDto model);
        Task<bool> DeleteGroupAsync(Guid groupId);
        Task<IEnumerable<GroupDto>> GetGroupsCreatedByUserAsync(Guid userId);
        Task<IEnumerable<GroupDto>> GetGroupsUserIsMemberOfAsync(Guid userId);
        Task<bool> AddUserToGroupAsync(Guid userId, Guid groupId);
        Task<bool> RemoveUserFromGroupAsync(Guid userId, Guid groupId);
        Task<UserDto?> GetUserByEmailAsync(string email);
    }
}
