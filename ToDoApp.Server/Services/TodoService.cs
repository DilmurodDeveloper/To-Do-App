using ToDoApp.Server.Data;
using ToDoApp.Server.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace ToDoApp.Server.Services
{
    public class TodoService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TodoService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        private string UserId => 
            _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)?? "";

        public async Task<List<TodoItem>> GetAllAsync()
        {
            return await _context.TodoItems
                .Where(t => t.UserId == UserId)
                .ToListAsync();
        }

        public async Task<TodoItem?> GetByIdAsync(int id)
        {
            return await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == UserId);
        }

        public async Task<TodoItem> CreateAsync(TodoItem item)
        {
            item.UserId = UserId;
            _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> UpdateAsync(TodoItem item)
        {
            var existing = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == item.Id && t.UserId == UserId);
            
            if (existing == null) return false;

            existing.Title = item.Title;
            existing.IsCompleted = item.IsCompleted;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == UserId);
            
            if (existing == null) return false;

            _context.TodoItems.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
