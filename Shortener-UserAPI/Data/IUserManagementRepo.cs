using Shortener_UserAPI.Models.Authentication.Login;
using Shortener_UserAPI.Models.Authentication.Register;

namespace Shortener_UserAPI.Data
{
    public interface IUserManagementRepo
    {
        public Task CreateUser(RegisterUser registerUser, string role);

        public Task<JwtLoginToken> LoginUser(LoginUser loginUser);
        
    }
}
