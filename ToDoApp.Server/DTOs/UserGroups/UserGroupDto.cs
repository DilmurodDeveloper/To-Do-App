namespace ToDoApp.Server.DTOs.UserGroups
{
    public class UserGroupDto
    {
        public string UserId { get; set; } = null!;
        public string? UserFullName { get; set; }

        public Guid GroupId { get; set; }
        public string? GroupName { get; set; }
    }
}
