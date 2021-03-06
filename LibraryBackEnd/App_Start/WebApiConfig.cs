﻿using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http;

namespace LibraryBackEnd
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                 name: "DefaultUserNameApi",
                 routeTemplate: "{controller}/{userName}",
                 defaults: new { userName = RouteParameter.Optional }
             );

            config.Routes.MapHttpRoute(
                 name: "ConfirmEmailRoute",
                 routeTemplate: "#!/confirmPassword"
             );

            config.Routes.MapHttpRoute(
                 name: "ForgetPasswordRoute",
                 routeTemplate: "#!/setPassword"
             );
        }
    }
}
