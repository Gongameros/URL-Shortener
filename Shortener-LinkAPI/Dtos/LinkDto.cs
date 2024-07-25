using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Shortener_LinkAPI.Dtos
{
    public class LinkDto
    {
        [Required]
        public string? OriginalUrl { get; set; }

        [Required]
        public string? CreatedBy { get; set; }
    }
}
