using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HDCAdmin.Startup))]
namespace HDCAdmin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
