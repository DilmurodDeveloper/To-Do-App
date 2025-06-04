using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.Services;
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

        [HttpPost("{id}/join")]
        public async Task<IActionResult> JoinGroup(Guid id)
        {
            var userId = GetUserId();
            var result = await _groupService.AddUserToGroupAsync(userId, id);

            if (!result)
                return BadRequest("Could not join the group.");

            return Ok();
        }

        [HttpPost("{id}/leave")]
        public async Task<IActionResult> LeaveGroup(Guid id)
        {
            var userId = GetUserId();
            var result = await _groupService.RemoveUserFromGroupAsync(userId, id);

            if (!result)
                return BadRequest("Could not leave the group.");

            return Ok();
        }

        [HttpPost("{groupId}/members")]
        public async Task<IActionResult> AddMember(Guid groupId, [FromBody] AddMemberDto model)
        {
            var userId = GetUserId();

            var group = await _groupService.GetGroupByIdAsync(groupId);
            if (group == null)
                return NotFound("Group not found.");

            if (group.CreatorId != userId)
                return Forbid("Only the group creator can add members.");

            var user = await _groupService.GetUserByEmailAsync(model.Email!);
            if (user == null)
                return NotFound("User with specified email not found.");

            var result = await _groupService.AddUserToGroupAsync(user.Id, groupId);
            if (!result)
                return BadRequest("Failed to add user to the group.");

            return Ok("User added successfully.");
        }

    }

    public class AddMemberDto
    {
        public string? Email { get; set; }
    }
}
