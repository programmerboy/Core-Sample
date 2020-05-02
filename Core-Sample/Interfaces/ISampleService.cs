﻿using Core_Sample.DTOs;
using Core_Sample.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core_Sample.Interfaces
{
    public interface ISampleService
    {
        Task<List<string>> GetCountries();

        Task<List<string>> GetCarriers(string country);

        Task<List<string>> GetBrands();

        Task<List<string>> GetModels(string brand);

        Task<List<string>> GetSubModels(string brand, string model);

        Task<IEnumerable<DTOCarrier>> GetCarriersAdvance(string country);

        Task<IEnumerable<DTODevice>> GetDevices(string brand, string model);

        Task<CustomResponse<DTODevice>> SaveMasjid(DTODevice device);
    }
}