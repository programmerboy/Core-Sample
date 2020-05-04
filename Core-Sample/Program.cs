using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace Core_Sample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateWebHostBuilder(string[] args) =>
            Host
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
            .ConfigureWebHostDefaults(webBuilder =>
            {
                //webBuilder.UseContentRoot(Directory.GetCurrentDirectory());
                webBuilder.UseIISIntegration();
                webBuilder.UseStartup<Startup>();

            });
       
    }
}
