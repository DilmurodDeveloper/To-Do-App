using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Services.Interfaces;

namespace ToDoApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserGroupController : ControllerBase
    {
        private readonly IUserGroupService _userGroupService;

        public UserGroupController(IUserGroupService userGroupService)
        {
            _userGroupService = userGroupService;
        }

        [HttpGet("group/{groupId}/users")]
        public async Task<IActionResult> GetUsersInGroup(Guid groupId)
        {
            var users = await _userGroupService.GetUsersInGroupAsync(groupId);
            return Ok(users);
        }

        [HttpGet("user/{userId}/groups")]
        public async Task<IActionResult> GetGroupsForUser(Guid userId)
        {
            var groups = await _userGroupService.GetGroupsForUserAsync(userId);
            return Ok(groups);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUserToGroup([FromQuery] Guid userId, [FromQuery] Guid groupId)
        {
            var result = await _userGroupService.AddUserToGroupAsync(userId, groupId);
            if (!result)
                return BadRequest("User is already in the group or invalid IDs.");

            return Ok("User added to group successfully.");
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveUserFromGroup([FromQuery] Guid userId, [FromQuery] Guid groupId)
        {
            var result = await _userGroupService.RemoveUserFromGroupAsync(userId, groupId);
            if (!result)
                return NotFound("User not found in the group.");

            return Ok("User removed from group successfully.");
        }
    }
}
