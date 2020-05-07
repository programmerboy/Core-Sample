using Core_Sample.DTOs;
using System.Collections.Generic;

namespace Core_Sample.Configurations
{
    public class Sample
    {
        public Dictionary<string, DTOCarrier> Carriers { get; set; }
        public List<DTODevice> Devices { get; set; }
    }
}
