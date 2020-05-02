namespace CoreSample.DTOs
{
    public class DTOCompatablity
    {
        public string Brand { get; set; }
        public string PhoneModel { get; set; }
        public string SubModel { get; set; }
        public string CountryName { get; set; }
        public string CarrierName { get; set; }
        public string TwoG { get; set; }
        public string ThreeG { get; set; }
        public string FourG { get; set; }
        public string FiveG { get; set; }
        public bool TwoGFullCompatible { get; set; }
        public bool ThreeGFullCompatible { get; set; }
        public bool FourGFullCompatible { get; set; }
        public bool FiveGFullCompatible { get; set; }
        public bool IsTwoGCompatible { get; set; }
        public bool IsThreeGCompatible { get; set; }
        public bool IsFourGCompatible { get; set; }
        public bool IsFiveGCompatible { get; set; }
        public string CarrierFrequeciesFormatted { get; set; }
        public string DeviceFrequeciesFormatted { get; set; }
        public string FullDeviceName { get; set; }
        public string FullCarrierName { get; set; }
    }
}
