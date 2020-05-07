using Core_Sample.Configurations;
using Core_Sample.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Core_Sample.Middlewares
{
    public class CreateInitialDataMiddleware
    {

        private IConfiguration _config { get; }
        private readonly RequestDelegate _next;

        public CreateInitialDataMiddleware(IConfiguration configuration, RequestDelegate next)
        {
            _config = configuration;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ISampleService userService, IOptions<Sample> settings)
        {
            foreach (var carrier in settings.Value.Carriers)
            {

            }

            //foreach (var device in settings.Value.Devices)
            //{

            //}

            // Call the next delegate/middleware in the pipeline
            await _next(context);
        }
    }

    //Class
    public static class CreateInitialDataMiddlewareExtensions
    {
        public static IApplicationBuilder UseCreateInitialUsers(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CreateInitialDataMiddleware>();
        }
    }
}
