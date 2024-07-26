namespace Shortener_UserAPI.Models.Authentication.Login
{
    public class JwtLoginToken
    {
        public string? Token { get; set; }
        public DateTime? Expiration { get; set; }
        public IList<string>? Roles { get; set; }
    }
}