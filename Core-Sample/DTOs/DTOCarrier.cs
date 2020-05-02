using System;

namespace Core_Sample.DTOs
{
    public class DTOCarrier
    {
        public string Country { get; set; }
        
        public string CarrierName { get; set; }
        
        public string Two_G { get; set; }
        
        public string Three_G { get; set; }
        
        public string Four_G { get; set; }
        
        public string Five_G { get; set; }
        
        public Nullable<DateTime> Date_Added { get; set; }
        
        public Nullable<DateTime> Date_Modified { get; set; }
    }
}
