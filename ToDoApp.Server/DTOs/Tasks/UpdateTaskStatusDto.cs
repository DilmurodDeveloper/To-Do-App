using ToDoApp.Server.Models;

namespace ToDoApp.Server.DTOs.Tasks
{
    public class UpdateTaskStatusDto
    {
        public TodoTaskStatus Status { get; set; }
    }
}
