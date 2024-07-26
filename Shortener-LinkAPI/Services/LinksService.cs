using Microsoft.EntityFrameworkCore.Metadata;
using Shortener_LinkAPI.Data;
using Shortener_LinkAPI.Models;

namespace Shortener_LinkAPI.Services
{
    public class LinksService : ILinksService
    {
        private readonly ILinksRepository _repository;

        public LinksService(ILinksRepository repository)
        {
            _repository = repository;   
        }

        public async Task<List<Link>> GetLinksAsync()
        {
            return await _repository.GetLinksAsync();
        }

        public async Task<Link> CreateLinkAsync(string originalUrl, string createdBy)
        {
            return await _repository.CreateLinkAsync(originalUrl, createdBy);
        }

        public async Task DeleteLinkAsyncById(int id)
        {
            await _repository.DeleteLinkAsyncById(id);
        }

        public async Task DeleteLinkAsync(string shortenedUrl)
        {
            await _repository.DeleteLinkAsync(shortenedUrl);
        }

    }
}
