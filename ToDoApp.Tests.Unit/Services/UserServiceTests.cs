using Moq;
using ToDoApp.Server.Data;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services;
using ToDoApp.Server.DTOs.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Tests.Unit.Helpers;

namespace ToDoApp.Tests.Unit.Services
{
    public class UserServiceTests
    {
        private readonly Mock<UserManager<ApplicationUser>> _userManagerMock;
        private readonly ApplicationDbContext _context;
        private readonly UserService _userService;

        public UserServiceTests()
        {
            var userStoreMock = new Mock<IUserStore<ApplicationUser>>();
            _userManagerMock = new Mock<UserManager<ApplicationUser>>(
                userStoreMock.Object, null!, null!, null!, null!, null!, null!, null!, null!);

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            _context = new ApplicationDbContext(options);

            _userService = new UserService(_userManagerMock.Object, _context);
        }

        [Fact]
        public async Task GetAllUsersAsync_ReturnsAllUsers()
        {
            // Arrange
            var users = new List<ApplicationUser>
        {
            new ApplicationUser { Id = Guid.NewGuid(), Email = "user1@example.com", UserName = "user1" },
            new ApplicationUser { Id = Guid.NewGuid(), Email = "user2@example.com", UserName = "user2" }
        }.AsQueryable();

            _userManagerMock.Setup(u => u.Users).Returns(new TestAsyncEnumerable<ApplicationUser>(users));

            // Act
            var result = await _userService.GetAllUsersAsync();

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Contains(result, u => u.Email == "user1@example.com");
            Assert.Contains(result, u => u.Email == "user2@example.com");
        }

        [Fact]
        public async Task GetUserByIdAsync_ReturnsUser_WhenUserExists()
        {
            // Arrange
            var userId = Guid.NewGuid();
            
            var user = new ApplicationUser { 
                Id = userId, Email = "test@example.com", UserName = "testuser" };
            
            _userManagerMock.Setup(u => u.FindByIdAsync(userId.ToString()))
                .ReturnsAsync(user);

            // Act
            var result = await _userService.GetUserByIdAsync(userId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("test@example.com", result.Email);
        }

        [Fact]
        public async Task GetUserByIdAsync_ReturnsNull_WhenUserDoesNotExist()
        {
            // Arrange
            var userId = Guid.NewGuid();
            _userManagerMock.Setup(u => u.FindByIdAsync(userId.ToString()))
                .ReturnsAsync((ApplicationUser?)null);

            // Act
            var result = await _userService.GetUserByIdAsync(userId);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task DeleteUserAsync_ReturnsTrue_WhenDeleteSucceeded()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new ApplicationUser { Id = userId };
            _userManagerMock.Setup(u => u.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _userManagerMock.Setup(u => u.DeleteAsync(user))
                .ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await _userService.DeleteUserAsync(userId);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task DeleteUserAsync_ReturnsFalse_WhenUserNotFound()
        {
            // Arrange
            var userId = Guid.NewGuid();
            _userManagerMock.Setup(u => u.FindByIdAsync(userId.ToString()))
                .ReturnsAsync((ApplicationUser?)null);

            // Act
            var result = await _userService.DeleteUserAsync(userId);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async Task UpdateUserAsync_ThrowsException_WhenUserNotFound()
        {
            // Arrange
            var userId = Guid.NewGuid();
            
            var updateDto = new UpdateUserDto { 
                FirstName = "John", LastName = "Doe", PhoneNumber = "123456" };

            _userManagerMock.Setup(u => u.FindByIdAsync(userId.ToString()))
                .ReturnsAsync((ApplicationUser?)null);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _userService.UpdateUserAsync(userId, updateDto));
        }

        [Fact]
        public async Task UpdateUserAsync_ThrowsException_WhenUpdateFails()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new ApplicationUser { Id = userId };
            
            var updateDto = new UpdateUserDto { 
                FirstName = "John", LastName = "Doe", PhoneNumber = "123456" };

            _userManagerMock.Setup(u => u.FindByIdAsync(userId.ToString()))
                .ReturnsAsync(user);

            _userManagerMock.Setup(u => u.UpdateAsync(user))
                .ReturnsAsync(IdentityResult.Failed());

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _userService.UpdateUserAsync(userId, updateDto));
        }

        [Fact]
        public async Task UpdateUserAsync_ReturnsUpdatedUserDto_WhenSuccess()
        {
            // Arrange
            var userId = Guid.NewGuid();
            
            var user = new ApplicationUser { 
                Id = userId, Email = "email@test.com", UserName = "username" };
            
            var updateDto = new UpdateUserDto { 
                FirstName = "John", LastName = "Doe", PhoneNumber = "123456" };

            _userManagerMock.Setup(u => u.FindByIdAsync(userId.ToString()))
                .ReturnsAsync(user);

            _userManagerMock.Setup(u => u.UpdateAsync(user))
                .ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await _userService.UpdateUserAsync(userId, updateDto);

            // Assert
            Assert.Equal("John", result.FirstName);
            Assert.Equal("Doe", result.LastName);
            Assert.Equal("123456", result.PhoneNumber);
        }

        [Fact]
        public async Task GetUserProfileAsync_ReturnsUserProfile()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new ApplicationUser
            {
                Id = userId,
                Email = "user@example.com",
                UserName = "user",
                FirstName = "First",
                LastName = "Last",
                PhoneNumber = "123456"
            };

            _userManagerMock.Setup(u => u.FindByIdAsync(userId.ToString()))
                .ReturnsAsync(user);

            _context.Tasks.Add(new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Task 1",
                Description = "Desc",
                CreatedAt = DateTime.UtcNow,
                Status = TodoTaskStatus.Pending,
                AssignedToUserId = userId,
                GroupId = Guid.NewGuid()
            });

            _context.Groups.Add(new Group
            {
                Id = Guid.NewGuid(),
                Name = "Group 1",
                CreatorId = userId
            });

            var groupMemberId = Guid.NewGuid();
            var memberGroup = new Group { 
                Id = groupMemberId, Name = "Member Group", CreatorId = Guid.NewGuid() };

            _context.Groups.Add(memberGroup);
            _context.UserGroups.Add(new UserGroup
            {
                GroupId = groupMemberId,
                UserId = userId
            });

            await _context.SaveChangesAsync();

            // Act
            var profile = await _userService.GetUserProfileAsync(userId);

            // Assert
            Assert.NotNull(profile);
            Assert.Equal(user.Email, profile.UserInfo.Email);
            Assert.Single(profile.Tasks);
            Assert.Single(profile.CreatedGroups);
            Assert.Single(profile.MemberGroups);
        }
    }
}