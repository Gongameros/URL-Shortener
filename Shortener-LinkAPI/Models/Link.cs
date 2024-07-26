using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Shortener_LinkAPI.Models
{
    public class Link
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? OriginalUrl { get; set; }

        [Required]
        public string? ShortenedUrl { get; set; }

        [Required]
        public string? CreatedBy { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime? ExpirationDate { get; set; }
    }
}
