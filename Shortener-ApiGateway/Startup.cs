using Microsoft.AspNetCore.Routing;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Cache.CacheManager;

namespace ShortenerApiGateway
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add Ocelot configuration
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddOcelot().AddCacheManager(c => c.WithDictionaryHandle());
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseOcelot().Wait();
        }
    }
}
