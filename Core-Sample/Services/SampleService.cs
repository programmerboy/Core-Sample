using AutoMapper;
using Core_Sample.Configurations;
using Core_Sample.DataContexts;
using Core_Sample.DTOs;
using Core_Sample.Helpers;
using Core_Sample.Interfaces;
using Core_Sample.Models;
using CoreSample.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core_Sample.Services
{
    public class SampleService : ISampleService
    {
        private SampleDataContext _dbContext;
        private HttpContext _httpContext;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public SampleService(SampleDataContext dbContext, IHttpContextAccessor httpContextAccessor, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpContext = httpContextAccessor.HttpContext;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public async Task<List<string>> GetBrands()
        {
            var list = await _dbContext.Devices.OrderBy(r => r.Brand)
               .Select(r => r.Brand)
               .Distinct()
               .ToListAsync();

            return list;
        }

        public async Task<List<string>> GetCarriers(string country)
        {
            country = country.TrimAndUpper();

            var list = await _dbContext.Carriers
               .Where(r => r.Country.ToUpper().Equals(country))
               .OrderBy(r => r.CarrierName)
               .Select(r => r.CarrierName)
               .Distinct()
               .ToListAsync();

            return list;
        }

        public async Task<List<DTOCarrier>> GetCarriersAdvance(string country)
        {
            country = country.TrimAndUpper();

            var list = await _dbContext.Carriers
                .Where(r => r.Country.ToUpper().Equals(country))
                .ToListAsync();

            var dtoList = _mapper.Map<IList<DTOCarrier>>(list);

            return dtoList.ToList();
        }

        public async Task<List<string>> GetCountries()
        {
            var list = await _dbContext.Carriers.OrderBy(r => r.Country)
               .Select(r => r.Country)
               .Distinct()
               .ToListAsync();

            return list;
        }

        public async Task<List<DTODevice>> GetDevices(string brand, string model)
        {
            brand = brand.TrimAndUpper();
            model = model.TrimAndUpper();

            var list = await _dbContext.Devices
                .Where(r => r.Brand.ToUpper().Equals(brand) && (string.IsNullOrWhiteSpace(model) || r.PhoneModel.ToUpper().Equals(model)))
                .Select(r => new Device
                {
                    Brand = r.Brand,
                    PhoneModel = r.PhoneModel,
                    SubModel = r.SubModel,
                    Two_G = r.Two_G.Replace("/", ", "),
                    Three_G = r.Three_G.Replace("/", ", "),
                    Four_G = r.Four_G.Replace("/", ", "),
                    Five_G = r.Five_G.Replace("/", ", "),
                    Date_Added = r.Date_Added,
                    Date_Modified = r.Date_Modified
                })
                .ToListAsync();

            var dtoList = _mapper.Map<IList<DTODevice>>(list);

            return dtoList.ToList();
        }

        public async Task<List<string>> GetModels(string brand)
        {
            brand = brand.TrimAndUpper();

            var list = await _dbContext.Devices
              .Where(r => r.Brand.ToUpper().Equals(brand))
              .OrderBy(r => r.PhoneModel)
              .Select(r => r.PhoneModel)
              .Distinct()
              .ToListAsync();

            return list;
        }

        public async Task<List<string>> GetSubModels(string brand, string model)
        {
            brand = brand.TrimAndUpper();
            model = model.TrimAndUpper();

            var list = await _dbContext.Devices
              .Where(r => r.Brand.ToUpper().Equals(brand) && r.PhoneModel.ToUpper().Equals(model) && !r.SubModel.Trim().Equals(""))
              .OrderBy(r => r.SubModel)
              .Select(r => r.SubModel)
              .Distinct()
              .ToListAsync();

            return list;
        }

        public async Task<CustomResponse<DTODevice>> SaveDevice(DTODevice device)
        {
            throw new NotImplementedException();
        }

        public async Task<DTOCompatablity> SearchCompatablity(DTOSearch search)
        {
            var carrier = await _dbContext.Carriers.FirstOrDefaultAsync(r => search.Country.Equals(r.Country) && search.CarrierName.Equals(r.CarrierName));

            var device = await _dbContext.Devices
                .FirstOrDefaultAsync(r => search.Brand.Equals(r.Brand) && search.PhoneModel.Equals(r.PhoneModel) &&
                                    (string.IsNullOrWhiteSpace(search.SubModel) || r.SubModel.Equals(search.SubModel)));

            var dtoCarrier = _mapper.Map<DTOCarrier>(carrier);
            var dtoDevice = _mapper.Map<DTODevice>(device);

            // Compatablity Info = CI
            var ci = new DTOCompatablity();

            ci.CarrierFrequencies = new DTONetwork()
            {
                Two_G = dtoCarrier.Two_G,
                Three_G = dtoCarrier.Three_G,
                Four_G = dtoCarrier.Four_G,
                Five_G = dtoCarrier.Five_G,
            };

            ci.DeviceFrequencies = new DTONetwork()
            {
                Two_G = dtoDevice.Two_G,
                Three_G = dtoDevice.Three_G,
                Four_G = dtoDevice.Four_G,
                Five_G = dtoDevice.Five_G,
            };

            // Two G
            ci.TwoGFullCompatible = Utility.CompareResults(ci.CarrierFrequencies.Two_G, ci.DeviceFrequencies.Two_G, "2G", out Tuple<int, string> result2G);
            ci.TwoGMatchedFreq = result2G.Item1;
            ci.Two_G = result2G.Item2;

            // Three G
            ci.ThreeGFullCompatible = Utility.CompareResults(ci.CarrierFrequencies.Three_G, ci.DeviceFrequencies.Three_G, "3G", out Tuple<int, string> result3G);
            ci.ThreeGMatchedFreq = result3G.Item1;
            ci.Three_G = result3G.Item2;

            // Four G
            ci.FourGFullCompatible = Utility.CompareResults(ci.CarrierFrequencies.Four_G, ci.DeviceFrequencies.Four_G, "4G", out Tuple<int, string> result4G);
            ci.FourGMatchedFreq = result4G.Item1;
            ci.Four_G = result4G.Item2;

            // Five G
            ci.FiveGFullCompatible = Utility.CompareResults(ci.CarrierFrequencies.Five_G, ci.DeviceFrequencies.Five_G, "5G", out Tuple<int, string> result5G);
            ci.FiveGMatchedFreq = result5G.Item1;
            ci.Five_G = result5G.Item2;

            return ci;
        }
    }
}
