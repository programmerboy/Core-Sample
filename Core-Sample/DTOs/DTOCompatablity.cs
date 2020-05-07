using Core_Sample.DTOs;

namespace CoreSample.DTOs
{
    public class DTOCompatablity : DTONetwork
    {
        public int TwoGMatchedFreq { get; set; }
        public int ThreeGMatchedFreq { get; set; }
        public int FourGMatchedFreq { get; set; }
        public int FiveGMatchedFreq { get; set; }

        public bool TwoGFullCompatible { get; set; }
        public bool ThreeGFullCompatible { get; set; }
        public bool FourGFullCompatible { get; set; }
        public bool FiveGFullCompatible { get; set; }

        //public bool IsTwoGCompatible { get; set; }
        //public bool IsThreeGCompatible { get; set; }
        //public bool IsFourGCompatible { get; set; }
        //public bool IsFiveGCompatible { get; set; }

        public DTONetwork CarrierFrequencies { get; set; }
        public DTONetwork DeviceFrequencies { get; set; }

    }
}
