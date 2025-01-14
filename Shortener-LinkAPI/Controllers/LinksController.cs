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
        public async Task<ActionResult<List<Link>>> GetLinks()
        {
            List<Link> links = await _linkService.GetLinksAsync();
            return Ok(links);
        }

        [HttpPost]
        public async Task<ActionResult<Link>> CreateLink([FromBody] LinkDto request)
        {
            Link? link = await _linkService.CreateLinkAsync(request.OriginalUrl, request.CreatedBy);
            return CreatedAtAction(nameof(GetLinks), new { id = link.Id }, link);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<List<Link>>> GetLinksByUsername([FromRoute] string username)
        {
            List<Link> links = await _linkService.GetLinksByUsernameAsync(username);
            return Ok(links);
        }

        [HttpGet("short/{hash}")]
        public async Task<ActionResult<Link>> GetLinkByHash([FromRoute] string hash)
        {
            Link? link = await _linkService.GetLinkByHashAsync(hash);
            return Ok(link);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLinkAsyncById(int id)
        {
            await _linkService.DeleteLinkAsyncById(id);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLinkAsync([FromBody] string shortenedUrl)
        {
            await _linkService.DeleteLinkAsync(shortenedUrl);
            return NoContent();
        }

        [HttpDelete("all/{username}")]
        public async Task<IActionResult> DeleteLinksByUsername([FromRoute] string username)
        {
            await _linkService.DeleteLinksByUsername(username);
            return NoContent();
        }
    }
}
