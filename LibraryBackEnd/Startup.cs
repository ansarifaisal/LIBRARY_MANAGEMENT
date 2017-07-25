using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(LibraryBackEnd.Startup))]

namespace LibraryBackEnd
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

        }
    }
}
