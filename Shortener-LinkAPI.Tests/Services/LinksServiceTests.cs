using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Moq;
using Shortener_LinkAPI.Data;
using Shortener_LinkAPI.Models;
using Shortener_LinkAPI.Services;

namespace Shortener_LinkAPI.Tests.Services
{
    public class LinksServiceTests
    {
        private readonly Mock<ILinksRepository> _linksRepositoryMock;
        private readonly LinksService _linksService;

        public LinksServiceTests()
        {
            _linksRepositoryMock = new Mock<ILinksRepository>();
            _linksService = new LinksService(_linksRepositoryMock.Object);
        }

        [Fact]
        public async Task GetLinksAsync_ShouldReturnLinks()
        {
            var links = new List<Link>
            {
                new Link { OriginalUrl = "http://example.com", ShortenedUrl = "abc123", CreatedBy = "user" },
                new Link { OriginalUrl = "http://example.org", ShortenedUrl = "def456", CreatedBy = "user" }
            };

            _linksRepositoryMock
                .Setup(repo => repo.GetLinksAsync())
                .ReturnsAsync(links);

            var result = (await _linksService.GetLinksAsync()).ToList();

            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
        }

        [Fact]
        public async Task DeleteLinkAsync_ShouldDeleteLink()
        {
            string shortenedUrl = "abc123";

            _linksRepositoryMock
                .Setup(repo => repo.DeleteLinkAsync(shortenedUrl))
                .Returns(Task.CompletedTask);

            await _linksService.DeleteLinkAsync(shortenedUrl);

            _linksRepositoryMock.Verify(repo => repo.DeleteLinkAsync(shortenedUrl), Times.Once);
        }
    }
}
