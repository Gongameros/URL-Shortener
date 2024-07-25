using Shortener_LinkAPI.Models;

namespace Shortener_LinkAPI.Services
{

    public interface ILinksService
    {
        Task<IEnumerable<Link>> GetLinksAsync();
        Task<Link> CreateLinkAsync(string originalUrl, string createdBy);
        Task DeleteLinkAsync(string shortenedUrl);
    }

}
