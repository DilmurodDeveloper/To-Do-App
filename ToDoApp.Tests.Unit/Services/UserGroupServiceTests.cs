using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Data;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services;

namespace ToDoApp.Tests.Unit.Services
{
    public class UserGroupServiceTests
    {
        private ApplicationDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new ApplicationDbContext(options);
        }

        [Fact]
        public async Task AddUserToGroupAsync_ShouldAdd_WhenNotExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new UserGroupService(context);
            var userId = Guid.NewGuid();
            var groupId = Guid.NewGuid();

            // Act
            var result = await service.AddUserToGroupAsync(userId, groupId);

            // Assert
            Assert.True(result);
            Assert.Single(context.UserGroups);
            var ug = await context.UserGroups.FirstAsync();
            Assert.Equal(userId, ug.UserId);
            Assert.Equal(groupId, ug.GroupId);
        }

        [Fact]
        public async Task AddUserToGroupAsync_ShouldReturnFalse_IfExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var userId = Guid.NewGuid();
            var groupId = Guid.NewGuid();
            context.UserGroups.Add(new UserGroup { UserId = userId, GroupId = groupId });
            await context.SaveChangesAsync();
            var service = new UserGroupService(context);

            // Act
            var result = await service.AddUserToGroupAsync(userId, groupId);

            // Assert
            Assert.False(result);
            Assert.Single(context.UserGroups);
        }

        [Fact]
        public async Task RemoveUserFromGroupAsync_ShouldRemove_WhenExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var userId = Guid.NewGuid();
            var groupId = Guid.NewGuid();
            var userGroup = new UserGroup { UserId = userId, GroupId = groupId };
            context.UserGroups.Add(userGroup);
            await context.SaveChangesAsync();
            var service = new UserGroupService(context);

            // Act
            var result = await service.RemoveUserFromGroupAsync(userId, groupId);

            // Assert
            Assert.True(result);
            Assert.Empty(context.UserGroups);
        }

        [Fact]
        public async Task RemoveUserFromGroupAsync_ShouldReturnFalse_WhenNotExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new UserGroupService(context);
            var userId = Guid.NewGuid();
            var groupId = Guid.NewGuid();

            // Act
            var result = await service.RemoveUserFromGroupAsync(userId, groupId);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async Task GetUsersInGroupAsync_ShouldReturnUsers()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var groupId = Guid.NewGuid();
            var user1 = new ApplicationUser { Id = Guid.NewGuid() };
            var user2 = new ApplicationUser { Id = Guid.NewGuid() };
            context.Users.AddRange(user1, user2);

            context.UserGroups.AddRange(
                new UserGroup { UserId = user1.Id, GroupId = groupId, User = user1 },
                new UserGroup { UserId = user2.Id, GroupId = groupId, User = user2 }
            );

            await context.SaveChangesAsync();

            var service = new UserGroupService(context);

            // Act
            var users = await service.GetUsersInGroupAsync(groupId);

            // Assert
            Assert.Equal(2, users.Count);
            Assert.Contains(users, u => u.Id == user1.Id);
            Assert.Contains(users, u => u.Id == user2.Id);
        }

        [Fact]
        public async Task GetGroupsForUserAsync_ShouldReturnGroups()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var userId = Guid.NewGuid();
            var group1 = new Group { Id = Guid.NewGuid(), Name = "Group 1", CreatorId = Guid.NewGuid() };
            var group2 = new Group { Id = Guid.NewGuid(), Name = "Group 2", CreatorId = Guid.NewGuid() };
            context.Groups.AddRange(group1, group2);

            context.UserGroups.AddRange(
                new UserGroup { UserId = userId, GroupId = group1.Id, Group = group1 },
                new UserGroup { UserId = userId, GroupId = group2.Id, Group = group2 }
            );

            await context.SaveChangesAsync();

            var service = new UserGroupService(context);

            // Act
            var groups = await service.GetGroupsForUserAsync(userId);

            // Assert
            Assert.Equal(2, groups.Count);
            Assert.Contains(groups, g => g.Id == group1.Id);
            Assert.Contains(groups, g => g.Id == group2.Id);
        }

        [Fact]
        public async Task IsGroupOwnerAsync_ShouldReturnTrue_IfUserIsOwner()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var userId = Guid.NewGuid();
            var groupId = Guid.NewGuid();
            context.Groups.Add(new Group { Id = groupId, CreatorId = userId, Name = "Group A" });
            await context.SaveChangesAsync();

            var service = new UserGroupService(context);

            // Act
            var isOwner = await service.IsGroupOwnerAsync(userId, groupId);

            // Assert
            Assert.True(isOwner);
        }

        [Fact]
        public async Task IsGroupOwnerAsync_ShouldReturnFalse_IfUserIsNotOwner()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var userId = Guid.NewGuid();
            var groupId = Guid.NewGuid();
            context.Groups.Add(new Group { Id = groupId, CreatorId = Guid.NewGuid(), Name = "Group A" });
            await context.SaveChangesAsync();

            var service = new UserGroupService(context);

            // Act
            var isOwner = await service.IsGroupOwnerAsync(userId, groupId);

            // Assert
            Assert.False(isOwner);
        }
    }
}
