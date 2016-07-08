namespace AAWebSmartHouse.WebApi
{
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Cors;
    using Microsoft.Owin.Security.OAuth;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            var corsAttributes = new EnableCorsAttribute("http://127.0.0.1:3000", "*", "*");
            config.EnableCors(corsAttributes);
            
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
        }
    }
}
