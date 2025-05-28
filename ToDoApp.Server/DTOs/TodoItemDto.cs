namespace ToDoApp.Server.DTOs
{
    public class TodoItemDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsCompleted { get; set; }
    }
}
