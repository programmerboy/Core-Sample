using AutoMapper;
using Core_Sample.Configurations;
using Core_Sample.DataContexts;
using Core_Sample.Helpers;
using Core_Sample.Interfaces;
using Core_Sample.Middlewares;
using Core_Sample.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Core_Sample
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            var secAppSettings = Configuration.GetSection("AppSettings");
            var secSample = Configuration.GetSection("Sample");

            var rolesSection = Configuration.GetSection("Sample:Carriers");

            services.Configure<AppSettings>(secAppSettings);
            services.Configure<Sample>(secSample);

            var appSettings = secAppSettings.Get<AppSettings>();

            services.AddCors(policy =>
            {
                policy.AddPolicy("MyCorsPolicy", builder =>
                {
                    builder
                    .WithOrigins(appSettings.Cors.Origins.ToArray())
                    .WithHeaders(appSettings.Cors.Headers.ToArray())
                    .WithMethods(appSettings.Cors.Methods.ToArray())
                    .WithExposedHeaders(appSettings.Cors.ExposedHeaders.ToArray());
                });
            });

            services.AddControllers(options =>
            {
                //options.OutputFormatters.Add(new CSVFormatter());
            });

            services.AddDbContext<SampleDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //services.AddDbContext<OTDDbContext>(x => x.UseInMemoryDatabase("OTDCore-Test"));

            services.AddRouting();

            #region Dependency Injections

            // Auto Mapper Configurations
            var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(new MappingProfile()));

            var mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);

            // configure DI for application services
            services.AddScoped<ISampleService, SampleService>();

            // add HTTP context so it can be available in Dependency Injection
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            #endregion Dependency Injections

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                app.UseHsts(); // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.

            //Custom Middleware
            app.UseCreateInitialUsers();

            app.UseHttpsRedirection();

            // use CORS policy
            app.UseCors("MyCorsPolicy");

            // Authenticate before the user accesses secure resources.
            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");

                endpoints.MapControllerRoute(
                    name: "Spa",
                    pattern: "{*url}",
                    defaults: new { controller = "Home", action = "Spa" });
            });


        }
    }
}
