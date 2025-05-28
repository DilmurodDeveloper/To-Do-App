using ToDoApp.Server.DTOs.Groups;

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
    }
}
