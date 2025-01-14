using Shortener_LinkAPI.Dtos;
using Shortener_LinkAPI.Models;

namespace Shortener_LinkAPI.Data
{
    public interface ILinksRepository
    {
        Task<List<Link>> GetLinksAsync();
        Task<Link> CreateLinkAsync(string originalUrl, string createdBy);
        Task DeleteLinkAsyncById(int id);
        Task DeleteLinkAsync(string shortenedUrl);
        Task<Link?> GetLinkByHashAsync(string hash);
        Task<List<Link>> GetLinksByUsernameAsync(string username);
        Task DeleteLinksByUsername(string username);
    }
}
