using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Shortener_UserAPI.Models.Authentication.Login;
using Shortener_UserAPI.Models.Authentication.Register;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Shortener_UserAPI.Data
{
    public class UserManagementRepo : IUserManagementRepo
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public UserManagementRepo(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task CreateUser(RegisterUser registerUser, string role)
        {
            IdentityUser? userExists = await _userManager.FindByEmailAsync(registerUser.Email);

            if (userExists != null)
            {
                throw new Exception("User already exists.");
            }

            IdentityUser user = new IdentityUser()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.Username
            };

            if (await _roleManager.RoleExistsAsync(role))
            {
                IdentityResult result = await _userManager.CreateAsync(user, registerUser.Password);
                if (!result.Succeeded)
                {
                    string errorMessage = "";
                    foreach (var error in result.Errors)
                    {
                        errorMessage += error.Description + '\n';
                    }

                    throw new Exception(errorMessage);
                }

                await _userManager.AddToRoleAsync(user, role);
            }

            else
            {
                throw new Exception("Role doesn`t exist.");
            }

        }

        public async Task<JwtLoginToken> LoginUser(LoginUser loginUser)
        {
            IdentityUser? user = await _userManager.FindByNameAsync(loginUser.Username);

            if (user != null)
            {
                if (await _userManager.CheckPasswordAsync(user, loginUser.Password))
                {
                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    var userRoles = await _userManager.GetRolesAsync(user);
                    foreach (var role in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, role));
                    }

                    JwtSecurityToken? jwtToken = GetToken(authClaims);

                    JwtLoginToken resultToken = new JwtLoginToken
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                        Expiration = jwtToken.ValidTo,
                        Roles = userRoles
                    };

                    return resultToken;
                }

                else
                {
                    throw new Exception("Wrong password.");
                }

            }

            else
            {
                throw new Exception("Wrong username.");
            }
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));


            return token;
        }
    }
}
