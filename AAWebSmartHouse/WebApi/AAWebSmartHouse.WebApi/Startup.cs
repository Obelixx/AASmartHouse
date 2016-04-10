using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AAWebSmartHouse.WebApi.Startup))]

namespace AAWebSmartHouse.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
