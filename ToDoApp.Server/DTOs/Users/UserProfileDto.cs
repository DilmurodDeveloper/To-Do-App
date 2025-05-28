using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.DTOs.Tasks;

namespace ToDoApp.Server.DTOs.Users
{
    public class UserProfileDto
    {
        public UserDto UserInfo { get; set; } = null!;
        public List<TaskDto> Tasks { get; set; } = new();
        public List<GroupDto> CreatedGroups { get; set; } = new();
        public List<GroupDto> MemberGroups { get; set; } = new();
    }
}
