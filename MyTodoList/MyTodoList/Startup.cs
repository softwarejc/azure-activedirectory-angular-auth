using System;
using System.Configuration;
using System.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security.ActiveDirectory;
using Microsoft.Owin.Security.OAuth;
using MyTodoList;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace MyTodoList
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Configure ADAL
            //this.ConfigureWebApiAdalAuth(app);

            // SignalR
            app.MapSignalR();
        }

        /// <summary>
        /// Configures WindowsAzure Active Directory authentication
        /// </summary>
        private void ConfigureWebApiAdalAuth(IAppBuilder app)
        {
            var authOptions = new WindowsAzureActiveDirectoryBearerAuthenticationOptions
            {
                //TokenValidationParameters = new TokenValidationParameters
                //{
                //    ValidAudience = ConfigurationManager.AppSettings["adal:ClientId"],
                //},
                Tenant = ConfigurationManager.AppSettings["adal:Tenant"]
            };

            app.UseWindowsAzureActiveDirectoryBearerAuthentication(authOptions);

            // enable OAuth authentication (Bearer)
            var OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new OAuthAuthorizationServerProvider(),
                AuthorizeEndpointPath = new PathString("/api/")
            };

            //// Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
           // app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions() { AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active });

        }
    }
}
