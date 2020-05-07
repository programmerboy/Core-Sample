using System;

namespace Core_Sample.DTOs
{
    public class DTOCarrier : DTONetwork
    {
        public string Country { get; set; }
        
        public string CarrierName { get; set; }
        
        public DateTime? Date_Added { get; set; }
        
        public DateTime? Date_Modified { get; set; }
    }
}
