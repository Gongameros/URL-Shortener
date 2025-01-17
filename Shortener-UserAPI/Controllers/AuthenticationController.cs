﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Shortener_UserAPI.Data;
using Shortener_UserAPI.Models.Authentication.Login;
using Shortener_UserAPI.Models.Authentication.Register;

namespace Shortener_UserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserManagementRepo _userManagementRepo;

        public AuthenticationController(IUserManagementRepo userManagementRepo)
        {
            _userManagementRepo = userManagementRepo;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
        {
            try
            {
                await _userManagementRepo.CreateUser(registerUser, role);
                return StatusCode(201, "User successfully created.");
            }

            catch (Exception ex)
            {
                return StatusCode(403, ex.Message);
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            try
            {
                JwtLoginToken resultToken = await _userManagementRepo.LoginUser(loginUser);
                return Ok(resultToken);
            }

            catch (Exception ex)
            {
                return StatusCode(403, ex.Message);
            }
        }

        [HttpDelete]
        [Route("user/{username}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string username)
        {
            try
            {
                // Call the repository to delete the user
                await _userManagementRepo.DeleteUser(username);

                // Return success response
                return StatusCode(200, $"User {username} successfully deleted.");
            }
            catch (Exception ex)
            {
                // Return error if something goes wrong (user not found, etc.)
                return StatusCode(400, $"Error deleting user {username}: {ex.Message}");
            }
        }

    }
}
