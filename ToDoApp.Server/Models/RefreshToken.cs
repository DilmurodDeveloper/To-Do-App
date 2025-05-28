using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.Models
{
    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Token { get; set; } = null!;
        public DateTime Expires { get; set; }
        public bool IsRevoked { get; set; } = false;

        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; } = null!;
    }
}
