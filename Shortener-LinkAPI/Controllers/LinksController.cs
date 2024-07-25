using Microsoft.AspNetCore.Mvc;
using Shortener_LinkAPI.Dtos;
using Shortener_LinkAPI.Models;
using Shortener_LinkAPI.Services;

namespace Shortener_LinkAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private readonly ILinksService _linkService;

        public LinksController(ILinksService linkService)
        {
            _linkService = linkService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Link>>> GetLinks()
        {
            IEnumerable<Link> links = await _linkService.GetLinksAsync();
            return Ok(links);
        }

        [HttpPost]
        public async Task<ActionResult<Link>> CreateLink([FromBody] LinkDto request)
        {
            Link? link = await _linkService.CreateLinkAsync(request.OriginalUrl, request.CreatedBy);
            return CreatedAtAction(nameof(GetLinks), new { id = link.Id }, link);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLinkAsync([FromBody] string shortenedUrl)
        {
            await _linkService.DeleteLinkAsync(shortenedUrl);
            return NoContent();
        }
    }
}
