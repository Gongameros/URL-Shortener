using Microsoft.EntityFrameworkCore;
using Shortener_LinkAPI.Models;

namespace Shortener_LinkAPI.Data
{
    public class LinksContext : DbContext
    {
        public DbSet<Link> Links { get; set; }
        public LinksContext(DbContextOptions<LinksContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
