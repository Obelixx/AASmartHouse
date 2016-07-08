namespace AAWebSmartHouse.WebApi.Infrastructure.Modules
{
    using System.Web;

    public class OPTIONSVerbHandlerModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.BeginRequest += (sender, args) =>
            {
                var app = (HttpApplication)sender;

                if (app.Request.HttpMethod == "OPTIONS")
                {
                    app.Response.StatusCode = 200;
                    app.Response.AddHeader("Access-Control-Allow-Headers", "content-type,accept,authorization");
                    app.Response.AddHeader("Access-Control-Allow-Origin", "*");
                    app.Response.AddHeader("Access-Control-Allow-Credentials", "true");
                    app.Response.AddHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
                    app.Response.AddHeader("Content-Type", "application/json");
                    app.Response.AddHeader("Accept", "application/json");
                    app.Response.End();
                }
            };
        }

        public void Dispose()
        {
        }
    }
}
