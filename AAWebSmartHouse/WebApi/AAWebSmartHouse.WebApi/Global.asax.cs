namespace AAWebSmartHouse.WebApi
{
    using System.Reflection;
    using System.Web;
    using System.Web.Http;
    using AAWebSmartHouse.Common;

    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            DatabaseConfig.Initialize();
            AutoMapperConfig.RegisterMappings(Assembly.Load(Assemblies.WebApi));
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
