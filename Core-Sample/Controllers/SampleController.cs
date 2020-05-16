using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core_Sample.DTOs;
using Core_Sample.Interfaces;
using Core_Sample.Services;
using CoreSample.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core_Sample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private ISampleService _repo;

        public SampleController(ISampleService svc)
        {
            _repo = svc;
        }

        [HttpGet("GetCountries")]
        public async Task<List<string>> GetCountries()
        {
            var list = await _repo.GetCountries();
            return list;
        }

        [HttpGet("GetCarriers")]
        public async Task<List<string>> GetCarriers(string country)
        {
            var list = await _repo.GetCarriers(country);
            return list;
        }

        [HttpGet("GetCarriersAdvance")]
        public async Task<IList<DTOCarrier>> GetCarriersAdvance(string country)
        {
            var list = await _repo.GetCarriersAdvance(country);
            return list;
        }

        [HttpGet("GetBrands")]
        public async Task<List<string>> GetBrands()
        {
            var list = await _repo.GetBrands();
            return list;
        }

        [HttpGet("GetDevices")]
        public async Task<List<DTODevice>> GetDevices(string brand, string model)
        {
            var list = await _repo.GetDevices(brand, model);
            return list;
        }

        [HttpGet("GetModels")]
        public async Task<List<string>> GetModels(string brand)
        {
            var list = await _repo.GetModels(brand);
            return list;
        }

        [HttpGet("GetSubModels")]
        public async Task<List<string>> GetSubModels(string brand, string model)
        {
            var list = await _repo.GetSubModels(brand, model);
            return list;
        }

        [HttpGet("SearchCompatablity")]
        [ProducesResponseType(typeof(DTOCompatablity), StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchCompatablity([FromQuery]DTOSearch search)
        {
            var model = await _repo.SearchCompatablity(search);
            return Ok(model);
        }

    }
}