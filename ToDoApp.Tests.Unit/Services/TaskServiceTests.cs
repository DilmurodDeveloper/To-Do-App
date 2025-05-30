using ToDoApp.Server.Data;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Server.Services.Interfaces;

namespace ToDoApp.Tests.Unit.Services
{
    public class TaskServiceTests
    {
        private readonly ApplicationDbContext _context;
        private readonly ITaskService _taskService;

        public TaskServiceTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);
            _taskService = new TaskService(_context);
        }

        [Fact]
        public async Task CreateTaskAsync_ShouldAddTask()
        {
            // Arrange
            var task = new TaskItem
            {
                Title = "Test Task",
                Description = "Description",
                DueDate = DateTime.UtcNow.AddDays(2),
                GroupId = Guid.NewGuid(),
                Status = TodoTaskStatus.Pending
            };

            // Act
            var result = await _taskService.CreateTaskAsync(task);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Test Task", result.Title);
            Assert.Single(_context.Tasks);
        }

        [Fact]
        public async Task GetAllTasksAsync_ShouldReturnTasksForGroup()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var service = new TaskService(context);

            var userId = Guid.NewGuid();
            var user = new ApplicationUser
            {
                Id = userId,
                UserName = "testuser",
                NormalizedUserName = "TESTUSER"
            };
            context.Users.Add(user);

            var group = new Group
            {
                Id = Guid.NewGuid(),
                Name = "Test Group",
                CreatorId = Guid.NewGuid()
            };
            context.Groups.Add(group);

            await context.SaveChangesAsync();

            var task1 = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Task 1",
                Description = "Description 1",
                GroupId = group.Id,
                AssignedToUserId = userId,
                CreatedAt = DateTime.UtcNow,
                Status = TodoTaskStatus.Pending
            };

            var task2 = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Task 2",
                Description = "Description 2",
                GroupId = group.Id,
                AssignedToUserId = userId,
                CreatedAt = DateTime.UtcNow,
                Status = TodoTaskStatus.Pending
            };

            context.Tasks.AddRange(task1, task2);
            await context.SaveChangesAsync();

            // Act
            var tasks = await service.GetAllTasksAsync(group.Id);

            // Assert
            Assert.Equal(2, tasks.Count);
            Assert.All(tasks, t => Assert.Equal(group.Id, t.GroupId));
        }

        [Fact]
        public async Task GetTaskByIdAsync_ShouldReturnCorrectTask()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var service = new TaskService(context);

            var userId = Guid.NewGuid();
            var user = new ApplicationUser
            {
                Id = userId,
                UserName = "testuser",
                NormalizedUserName = "TESTUSER"
            };
            context.Users.Add(user);

            var groupId = Guid.NewGuid();
            var group = new Group
            {
                Id = groupId,
                Name = "Test Group",
                CreatorId = Guid.NewGuid()
            };
            context.Groups.Add(group);

            await context.SaveChangesAsync();

            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Single Task",
                GroupId = groupId,
                AssignedToUserId = userId
            };
            context.Tasks.Add(task);
            await context.SaveChangesAsync();

            // Act
            var result = await service.GetTaskByIdAsync(task.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Single Task", result!.Title);
            Assert.Equal(task.Id, result.Id);
            Assert.Equal(userId, result.AssignedToUserId);
        }

        [Fact]
        public async Task UpdateTaskAsync_ShouldUpdateExistingTask()
        {
            // Arrange
            var task = new TaskItem { Id = Guid.NewGuid(), Title = "Old Title" };
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            task.Title = "Updated Title";

            // Act
            var success = await _taskService.UpdateTaskAsync(task);

            // Assert
            Assert.True(success);
            Assert.Equal("Updated Title", _context.Tasks.First().Title);
        }

        [Fact]
        public async Task DeleteTaskAsync_ShouldRemoveTask()
        {
            // Arrange
            var task = new TaskItem { Id = Guid.NewGuid(), Title = "Delete Me" };
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Act
            var success = await _taskService.DeleteTaskAsync(task.Id);

            // Assert
            Assert.True(success);
            Assert.Empty(_context.Tasks);
        }

        [Fact]
        public async Task AssignTaskToUserAsync_ShouldAssignUser()
        {
            // Arrange
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Test Task",
                Description = "Testing assignment",
                CreatedAt = DateTime.UtcNow,
                Status = TodoTaskStatus.Pending,
                GroupId = Guid.NewGuid() 
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Act
            var userId = Guid.NewGuid().ToString();
            var success = await _taskService.AssignTaskToUserAsync(task.Id, userId);

            // Assert
            Assert.True(success);
            var updatedTask = await _context.Tasks.FindAsync(task.Id);
            Assert.Equal(Guid.Parse(userId), updatedTask?.AssignedToUserId);
        }

        [Fact]
        public async Task ChangeTaskStatusAsync_ShouldUpdateStatus()
        {
            // Arrange
            var groupId = Guid.NewGuid();

            _context.Groups.Add(new Group { 
                    Id = groupId, 
                    Name = "Test Group", 
                    CreatorId = Guid.NewGuid() });

            await _context.SaveChangesAsync();

            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Sample Task",
                Description = "Sample description",
                Status = TodoTaskStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                GroupId = groupId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Act
            var success = await _taskService.ChangeTaskStatusAsync(task.Id, TodoTaskStatus.Completed);

            // Assert
            Assert.True(success);
            var updatedTask = await _context.Tasks.FindAsync(task.Id);
            Assert.Equal(TodoTaskStatus.Completed, updatedTask?.Status);
        }

        private ApplicationDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new ApplicationDbContext(options);
        }
    }
}
