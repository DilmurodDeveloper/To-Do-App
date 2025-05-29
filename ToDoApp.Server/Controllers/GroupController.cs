using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.Services.Interfaces;

namespace ToDoApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        private Guid GetUserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet]
        public async Task<IActionResult> GetAllGroups()
        {
            var groups = await _groupService.GetAllGroupsAsync();
            return Ok(groups);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupById(Guid id)
        {
            var group = await _groupService.GetGroupByIdAsync(id);
            if (group == null) return NotFound();

            return Ok(group);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] CreateGroupDto model)
        {
            var userId = GetUserId();

            var createdGroup = await _groupService.CreateGroupAsync(model, userId);
            return CreatedAtAction(nameof(GetGroupById), new { id = createdGroup.Id }, createdGroup);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(Guid id, [FromBody] UpdateGroupDto model)
        {
            var userId = GetUserId();

            var group = await _groupService.GetGroupByIdAsync(id);
            if (group == null)
                return NotFound();

            if (group.CreatorId != userId)
                return Forbid("Only the group creator can update the group.");

            var updated = await _groupService.UpdateGroupAsync(id, model);
            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            var userId = GetUserId();

            var group = await _groupService.GetGroupByIdAsync(id);
            if (group == null)
                return NotFound();

            if (group.CreatorId != userId)
                return Forbid("Only the group creator can delete the group.");

            var deleted = await _groupService.DeleteGroupAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }

        [HttpGet("created-by-me")]
        public async Task<IActionResult> GetGroupsCreatedByUser()
        {
            var userId = GetUserId();
            var groups = await _groupService.GetGroupsCreatedByUserAsync(userId);
            return Ok(groups);
        }

        [HttpGet("member-of")]
        public async Task<IActionResult> GetGroupsUserIsMemberOf()
        {
            var userId = GetUserId();
            var groups = await _groupService.GetGroupsUserIsMemberOfAsync(userId);
            return Ok(groups);
        }
    }
}
