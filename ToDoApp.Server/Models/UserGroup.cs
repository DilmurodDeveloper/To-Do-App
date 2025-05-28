using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.Models
{
    public class UserGroup
    {
        [Required]
        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }
        
        [Required]
        public Guid GroupId { get; set; }
        public Group? Group { get; set; }
    }
}
