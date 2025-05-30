using Moq;
using MockQueryable.Moq; 
using ToDoApp.Server.Data;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services;
using ToDoApp.Server.DTOs.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ToDoApp.Tests.Unit.Services
{
    public class AuthServiceTests
    {
        private readonly Mock<UserManager<ApplicationUser>> _userManagerMock;
        private readonly Mock<RoleManager<IdentityRole<Guid>>> _roleManagerMock;
        private readonly Mock<IConfiguration> _configurationMock;
        private readonly ApplicationDbContext _dbContext;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            var userStoreMock = new Mock<IUserStore<ApplicationUser>>();
            _userManagerMock = new Mock<UserManager<ApplicationUser>>(
                userStoreMock.Object, null!, null!, null!, null!, null!, null!, null!, null!);

            var roleStoreMock = new Mock<IRoleStore<IdentityRole<Guid>>>();
            _roleManagerMock = new Mock<RoleManager<IdentityRole<Guid>>>(
                roleStoreMock.Object, null!, null!, null!, null!);

            _configurationMock = new Mock<IConfiguration>();

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            _dbContext = new ApplicationDbContext(options);

            _authService = new AuthService(
                _userManagerMock.Object,
                _roleManagerMock.Object,
                _configurationMock.Object,
                _dbContext);
        }

        private RegisterModel GetValidRegisterModel() => new RegisterModel
        {
            UserName = "testuser",
            Email = "test@example.com",
            Password = "Password123!",
            FirstName = "Test",
            LastName = "User",
            PhoneNumber = "123456789"
        };

        [Fact]
        public async Task RegisterAsync_ValidInput_ShouldCreateUserAndAssignRole()
        {
            // Arrange
            var model = GetValidRegisterModel();

            _userManagerMock.Setup(x => x.FindByEmailAsync(model.Email!))
                .ReturnsAsync((ApplicationUser?)null);

            _userManagerMock.Setup(x => x.CreateAsync(It
                .IsAny<ApplicationUser>(), model.Password!))
                .ReturnsAsync(IdentityResult.Success);

            _roleManagerMock.Setup(x => x.RoleExistsAsync("User"))
                .ReturnsAsync(false);

            _roleManagerMock.Setup(x => x.CreateAsync(It.IsAny<IdentityRole<Guid>>()))
                .ReturnsAsync(IdentityResult.Success);

            _userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), "User"))
                .ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await _authService.RegisterAsync(model);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(model.Email, result.Email);
            Assert.Equal(model.UserName, result.UserName);
            Assert.Single(result.Roles);
            Assert.Contains("User", result.Roles);
        }

        [Fact]
        public async Task RegisterAsync_UserAlreadyExists_ShouldThrowException()
        {
            // Arrange
            var model = GetValidRegisterModel();

            _userManagerMock.Setup(x => x.FindByEmailAsync(model.Email!))
                .ReturnsAsync(new ApplicationUser());

            // Act
            var ex = await Assert.ThrowsAsync<Exception>(() => _authService
                .RegisterAsync(model));

            // Assert
            Assert.Equal("User with this email already exists.", ex.Message);
        }

        [Fact]
        public async Task RegisterAsync_CreateUserFails_ShouldThrowException()
        {
            // Arrange
            var model = GetValidRegisterModel();

            _userManagerMock.Setup(x => x.FindByEmailAsync(model.Email!))
                .ReturnsAsync((ApplicationUser?)null);

            var failedResult = IdentityResult
                .Failed(new IdentityError { Description = "Password too weak" });

            _userManagerMock.Setup(x => x.CreateAsync(It
                .IsAny<ApplicationUser>(), model.Password!))
                .ReturnsAsync(failedResult);

            // Act
            var ex = await Assert.ThrowsAsync<Exception>(() => _authService
                .RegisterAsync(model));

            // Assert
            Assert.Contains("Password too weak", ex.Message);
        }

        [Fact]
        public async Task RegisterAsync_RoleCreationFails_ShouldThrowException()
        {
            // Arrange
            var model = GetValidRegisterModel();

            _userManagerMock.Setup(x => x.FindByEmailAsync(model.Email!))
                .ReturnsAsync((ApplicationUser?)null);

            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), model.Password!))
                .ReturnsAsync(IdentityResult.Success);

            _roleManagerMock.Setup(x => x.RoleExistsAsync("User"))
                .ReturnsAsync(false);

            var failedRole = IdentityResult
                .Failed(new IdentityError { Description = "Role create failed" });
            
            _roleManagerMock.Setup(x => x.CreateAsync(It.IsAny<IdentityRole<Guid>>()))
                .ReturnsAsync(failedRole);

            // Act
            var ex = await Assert.ThrowsAsync<Exception>(() => _authService
                .RegisterAsync(model));

            // Assert
            Assert.Contains("Failed to create role", ex.Message);
        }

        [Fact]
        public async Task LoginAsync_ValidCredentials_ReturnsJwtToken()
        {
            // Arrange
            var loginModel = new LoginModel
            {
                UserNameOrEmail = "testuser",
                Password = "Password123!"
            };

            var user = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "testuser",
                Email = "test@example.com"
            };

            var users = new List<ApplicationUser> { user }
                .AsQueryable().BuildMock().Object;

            _userManagerMock.Setup(x => x.Users).Returns(users);
            
            _userManagerMock.Setup(x => x
                .CheckPasswordAsync(user, loginModel.Password)).ReturnsAsync(true);
            
            _userManagerMock.Setup(x => x
                .GetRolesAsync(user)).ReturnsAsync(new List<string> { "User" });

            _configurationMock.Setup(x => x["Jwt:Key"]).Returns("supersecretkey123456789014523697");
            _configurationMock.Setup(x => x["Jwt:Issuer"]).Returns("TestIssuer");
            _configurationMock.Setup(x => x["Jwt:Audience"]).Returns("TestAudience");

            // Act
            var result = await _authService.LoginAsync(loginModel);

            // Assert
            Assert.False(string.IsNullOrWhiteSpace(result));
            Assert.Contains(".", result);
        }

        [Fact]
        public async Task LoginAsync_UserNotFound_ThrowsException()
        {
            // Arrange
            var loginModel = new LoginModel
            {
                UserNameOrEmail = "notfound@example.com",
                Password = "Password123!"
            };

            var emptyUsers = new List<ApplicationUser>()
                .AsQueryable()
                .BuildMock().Object;

            _userManagerMock.Setup(x => x.Users).Returns(emptyUsers);

            // Act
            var ex = await Assert
                .ThrowsAsync<Exception>(() => _authService
                .LoginAsync(loginModel));

            // Assert
            Assert.Equal("Invalid credentials.", ex.Message);
        }

        [Fact]
        public async Task LoginAsync_InvalidPassword_ThrowsException()
        {
            // Arrange
            var user = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "testuser",
                Email = "test@example.com"
            };

            var loginModel = new LoginModel
            {
                UserNameOrEmail = "testuser",
                Password = "wrongpassword"
            };

            var users = new List<ApplicationUser> { user }
                .AsQueryable()
                .BuildMock()
                .Object;

            _userManagerMock.Setup(x => x.Users).Returns(users);

            _userManagerMock.Setup(x => x
                .CheckPasswordAsync(user, loginModel.Password))
                .ReturnsAsync(false);

            // Act
            var ex = await Assert
                .ThrowsAsync<Exception>(() => _authService
                .LoginAsync(loginModel));
            
            // Assert
            Assert.Equal("Invalid credentials.", ex.Message);
        }
    }
}
