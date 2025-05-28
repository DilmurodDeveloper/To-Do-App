using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.Models; 

namespace ToDoApp.Server.Controllers
{
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
            var groups = await _context.Groups
                .Select(g => new GroupDto { Id = g.Id, Name = g.Name })
                .ToListAsync();

            return Ok(groups);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] CreateGroupDto createGroupDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var group = new Group
            {
                Id = Guid.NewGuid(),
                Name = createGroupDto.Name
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGroupById), new { groupId = group.Id }, group);
        }

        [HttpGet("{groupId}")]
        public async Task<IActionResult> GetGroupById(Guid groupId)
        {
            var group = await _context.Groups.FindAsync(groupId);

            if (group == null)
                return NotFound();

            var groupDto = new GroupDto
            {
                Id = group.Id,
                Name = group.Name
            };

            return Ok(groupDto);
        }

        [HttpPut("{groupId}")]
        public async Task<IActionResult> UpdateGroup(Guid groupId, [FromBody] UpdateGroupDto updateGroupDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var group = await _context.Groups.FindAsync(groupId);
            if (group == null)
                return NotFound();

            group.Name = updateGroupDto.Name;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{groupId}")]
        public async Task<IActionResult> DeleteGroup(Guid groupId)
        {
            var group = await _context.Groups.FindAsync(groupId);
            if (group == null)
                return NotFound();

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
