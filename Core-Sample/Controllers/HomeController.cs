using Core_Sample.Configurations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Core_Sample.Controllers
{
    public class HomeController : Controller
    {
        private AppSettings _appSettings;
        private HttpContext _httpContext;

        public HomeController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContextAccessor)
        {
            _appSettings = appSettings.Value;
            _httpContext = httpContextAccessor.HttpContext;
        }

        public IActionResult Spa()
        {
            var request = _httpContext.Request;

            return File("~/index.html", "text/html");
        }
    }
}