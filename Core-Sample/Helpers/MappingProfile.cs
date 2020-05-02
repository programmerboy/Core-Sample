using AutoMapper;
using Core_Sample.DTOs;
using Core_Sample.Models;

namespace Core_Sample.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Device, DTODevice>();
            CreateMap<DTODevice, Device>();

            CreateMap<Carrier, DTOCarrier>();
            CreateMap<DTOCarrier, Carrier>();

        }
    }
}
