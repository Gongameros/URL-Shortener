using Microsoft.EntityFrameworkCore;
using Shortener_LinkAPI.Dtos;
using Shortener_LinkAPI.Models;
using Shortener_LinkAPI.Settings;
using System;

namespace Shortener_LinkAPI.Data
{
    public class LinksRepository : ILinksRepository
    {
        private readonly LinksContext _context;
        private readonly Random _random = new();

        public LinksRepository(LinksContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Link>> GetLinksAsync()
        {
            return await _context.Links.ToListAsync();
        }

        public async Task<Link> CreateLinkAsync(string originalUrl, string createdBy)
        {
            string shortenedUrl = await GenerateUniqueCodeAsync();
            var link = new Link
            {
                OriginalUrl = originalUrl,
                ShortenedUrl = shortenedUrl,
                CreatedBy = createdBy,
                CreatedDate = DateTime.UtcNow
            };

            _context.Links.Add(link);
            await _context.SaveChangesAsync();

            return link;
        }

        public async Task DeleteLinkAsync(string shortenedUrl)
        {
            Link? link = await _context.Links.FirstOrDefaultAsync(l => l.ShortenedUrl == shortenedUrl);
            if (link != null)
            {
                _context.Links.Remove(link);
                await _context.SaveChangesAsync();
            }
        }

        private async Task<string> GenerateUniqueCodeAsync()
        {
            char[] codeChars = new char[ShortLinkSettings.Length];
            int maxValue = ShortLinkSettings.Alphabet.Length;

            while (true)
            {
                for (var i = 0; i < ShortLinkSettings.Length; i++)
                {
                    var randomIndex = _random.Next(maxValue);
                    codeChars[i] = ShortLinkSettings.Alphabet[randomIndex];
                }

                var shirtenedUrl = new string(codeChars);

                if (!await _context.Links.AnyAsync(l => l.ShortenedUrl == shirtenedUrl))
                {
                    return shirtenedUrl;
                }
            }
        }
    }
}
