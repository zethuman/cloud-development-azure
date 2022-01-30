using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using imageResizeTrigger.Services;


[assembly: FunctionsStartup(typeof(imageResizeTrigger.Startup))]
namespace imageResizeTrigger
{
    public class Startup: FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddSingleton<IImageResizer, ImageResizer>();
        }
    }
}
