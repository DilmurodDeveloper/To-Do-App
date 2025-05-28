using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin/groups")]
public class AdminGroupController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminGroupController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllGroups()
    {
        var groups = await _context.Groups.ToListAsync();
        return Ok(groups);
    }

    [HttpPost]
    public async Task<IActionResult> CreateGroup([FromBody] ToDoApp.Server.Models.Group group)
    {
        _context.Groups.Add(group);
        await _context.SaveChangesAsync();
        return Ok(group);
    }

    [HttpPut("{groupId}")]
    public async Task<IActionResult> UpdateGroup(Guid groupId, [FromBody] Group updatedGroup)
    {
        var group = await _context.Groups.FindAsync(groupId);
        if (group == null)
            return NotFound();

        group.Name = updatedGroup.Name;
        await _context.SaveChangesAsync();

        return Ok(group);
    }

    [HttpDelete("{groupId}")]
    public async Task<IActionResult> DeleteGroup(Guid groupId)
    {
        var group = await _context.Groups.FindAsync(groupId);
        if (group == null)
            return NotFound();

        _context.Groups.Remove(group);
        await _context.SaveChangesAsync();

        return Ok("Group deleted");
    }
}
