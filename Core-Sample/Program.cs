using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Core_Sample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost
            .CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                var currentDir = Directory.GetCurrentDirectory();  // Doesn't work
                currentDir = Path.Combine(hostingContext.HostingEnvironment.ContentRootPath, "Configs");

                var env = hostingContext.HostingEnvironment;

                config.SetBasePath(currentDir)
                // Could be used when you have multiple environments
                //.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: false, reloadOnChange: true) 
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("sample.json", optional: false, reloadOnChange: false)
                .AddCommandLine(args);
            })
            .UseKestrel()
            .UseIISIntegration()
            .UseStartup<Startup>();
    }
}
