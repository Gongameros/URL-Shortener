using Shortener_LinkAPI.Dtos;
using Shortener_LinkAPI.Models;

namespace Shortener_LinkAPI.Data
{
    public interface ILinksRepository
    {
        Task<IEnumerable<Link>> GetLinksAsync();
        Task<Link> CreateLinkAsync(string originalUrl, string createdBy);
        Task DeleteLinkAsync(string shortenedUrl);
    }
}
