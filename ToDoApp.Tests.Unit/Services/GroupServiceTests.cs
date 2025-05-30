using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.DTOs.Groups;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services;

namespace ToDoApp.Tests.Unit.Services
{
    public class GroupServiceTests
    {
        private readonly ApplicationDbContext _context;
        private readonly GroupService _groupService;

        public GroupServiceTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);
            _groupService = new GroupService(_context);
        }

        [Fact]
        public async Task CreateGroupAsync_ShouldCreateGroup()
        {
            // Arrange
            var model = new CreateGroupDto { Name = "Test Group" };
            var creatorId = Guid.NewGuid();

            // Act
            var result = await _groupService.CreateGroupAsync(model, creatorId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Test Group", result.Name);
        }

        [Fact]
        public async Task GetAllGroupsAsync_ShouldReturnAllGroups()
        {
            // Arrange
            await _context.Groups.AddAsync(new Group { Name = "Group 1", CreatorId = Guid.NewGuid() });
            await _context.Groups.AddAsync(new Group { Name = "Group 2", CreatorId = Guid.NewGuid() });
            await _context.SaveChangesAsync();

            // Act
            var result = await _groupService.GetAllGroupsAsync();

            // Assert
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetGroupByIdAsync_ShouldReturnGroup()
        {
            // Arrange
            var group = new Group { Name = "Group X", CreatorId = Guid.NewGuid() };
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            // Act
            var result = await _groupService.GetGroupByIdAsync(group.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Group X", result.Name);
        }

        [Fact]
        public async Task UpdateGroupAsync_ShouldUpdateGroup()
        {
            // Arrange
            var group = new Group { Name = "Old Name", CreatorId = Guid.NewGuid() };
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            // Act
            var updateDto = new UpdateGroupDto { Name = "New Name" };
            var result = await _groupService.UpdateGroupAsync(group.Id, updateDto);

            // Assert
            Assert.True(result);
            Assert.Equal("New Name", _context.Groups.Find(group.Id)!.Name);
        }

        [Fact]
        public async Task DeleteGroupAsync_ShouldDeleteGroup()
        {
            // Arrange
            var group = new Group { Name = "Delete Me", CreatorId = Guid.NewGuid() };
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            // Act
            var result = await _groupService.DeleteGroupAsync(group.Id);

            // Assert
            Assert.True(result);
            Assert.Null(_context.Groups.Find(group.Id));
        }

        [Fact]
        public async Task GetGroupsCreatedByUserAsync_ShouldReturnUserGroups()
        {
            // Arrange
            var userId = Guid.NewGuid();
            await _context.Groups.AddAsync(new Group { Name = "G1", CreatorId = userId });
            await _context.Groups.AddAsync(new Group { Name = "G2", CreatorId = userId });
            await _context.SaveChangesAsync();

            // Act
            var result = await _groupService.GetGroupsCreatedByUserAsync(userId);

            // Assert
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetGroupsUserIsMemberOfAsync_ShouldReturnJoinedGroups()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var group = new Group { Name = "Joined Group", CreatorId = Guid.NewGuid() };
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            _context.UserGroups.Add(new UserGroup { GroupId = group.Id, UserId = userId });
            await _context.SaveChangesAsync();

            // Act
            var result = await _groupService.GetGroupsUserIsMemberOfAsync(userId);

            // Assert
            Assert.Single(result);
            Assert.Equal("Joined Group", result.First().Name);
        }
    }
}
