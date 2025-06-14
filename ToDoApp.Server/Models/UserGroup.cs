﻿using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Server.Models
{
    public class UserGroup
    {
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; } = null!;
        public Guid GroupId { get; set; }
        public Group Group { get; set; } = null!;
    }
}
