using Core_Sample.DTOs;
using Core_Sample.Helpers;
using Core_Sample.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core_Sample.Services
{
    public class SampleService : ISampleService
    {
        public Task<List<string>> GetBrands()
        {
            throw new NotImplementedException();
        }

        public Task<List<string>> GetCarriers(string country)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DTOCarrier>> GetCarriersAdvance(string country)
        {
            throw new NotImplementedException();
        }

        public Task<List<string>> GetCountries()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DTODevice>> GetDevices(string brand, string model)
        {
            throw new NotImplementedException();
        }

        public Task<List<string>> GetModels(string brand)
        {
            throw new NotImplementedException();
        }

        public Task<List<string>> GetSubModels(string brand, string model)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<DTODevice>> SaveMasjid(DTODevice device)
        {
            throw new NotImplementedException();
        }
    }
}
