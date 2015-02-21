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
            this.ConfigureAuth(app);

            // SignalR
            app.MapSignalR();
        }

        /// <summary>
        /// Configures WindowsAzure Active Directory authentication
        /// </summary>
        private void ConfigureAuth(IAppBuilder app)
        {
            app.UseWindowsAzureActiveDirectoryBearerAuthentication(
               new WindowsAzureActiveDirectoryBearerAuthenticationOptions
               {
                   // Azure active directory to use
                   Tenant = ConfigurationManager.AppSettings["adal:Tenant"],

                   // Active directory application to authenticate 
                   TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidAudience = ConfigurationManager.AppSettings["adal:ClientId"],
                   }
               });

        }
    }
}
