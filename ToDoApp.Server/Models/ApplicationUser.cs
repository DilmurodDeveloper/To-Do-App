using Microsoft.AspNetCore.Identity;

namespace ToDoApp.Server.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}".Trim();
        public ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
