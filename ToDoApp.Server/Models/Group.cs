using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.Models
{
    public class Group
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = null!;
        public Guid CreatorId { get; set; }
        public ApplicationUser Creator { get; set; } = null!;
        public ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
