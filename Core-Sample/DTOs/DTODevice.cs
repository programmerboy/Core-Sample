using System;

namespace Core_Sample.DTOs
{
    public class DTODevice : DTONetwork
    {
        public string Brand { get; set; }

        public string PhoneModel { get; set; }

        public string SubModel { get; set; }

        public DateTime? Date_Added { get; set; }

        public DateTime? Date_Modified { get; set; }
    }
}
