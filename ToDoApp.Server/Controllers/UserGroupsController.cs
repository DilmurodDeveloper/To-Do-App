using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.DTOs.UserGroups;
using ToDoApp.Server.Services.Interfaces;

namespace ToDoApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            try
            {
                var groups = await _userGroupService.GetGroupsForUserAsync(userId);
                return Ok(groups); 
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error in GetGroupsForUser: {ex.Message}\n{ex.StackTrace}");
                return StatusCode(500, "Ichki server xatosi yuz berdi.");
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUserToGroup([FromBody] UserGroupRequest request)
        {
            if (request == null || request.UserId == Guid.Empty || request.GroupId == Guid.Empty)
                return BadRequest(new { message = "Invalid user or group ID." });

            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (!User.IsInRole("Admin") && !await _userGroupService.IsGroupOwnerAsync(userId, request.GroupId))
                return Forbid("Only group owner or admin can add users.");

            var result = await _userGroupService.AddUserToGroupAsync(request.UserId, request.GroupId);
            if (!result)
                return BadRequest(new { message = "User is already in the group or invalid IDs." });

            return Ok(new { message = "User added to group successfully." });
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveUserFromGroup([FromBody] UserGroupRequest request)
        {
            if (request == null || request.UserId == Guid.Empty || request.GroupId == Guid.Empty)
                return BadRequest(new { message = "Invalid user or group ID." });

            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (!User.IsInRole("Admin") && !await _userGroupService.IsGroupOwnerAsync(userId, request.GroupId))
                return Forbid("Only group owner or admin can remove users.");

            var result = await _userGroupService.RemoveUserFromGroupAsync(request.UserId, request.GroupId);
            if (!result)
                return NotFound(new { message = "User not found in the group." });

            return Ok(new { message = "User removed from group successfully." });
        }
    }
}
