using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core_Sample.Helpers
{
    public class Utility
    {
        public static bool CompareResults(string tCarrier, string tDevice, string type, out Tuple<int, string> tuple)
        {
            var strMatchedFrequencies = "";
            var matchedFrequencies = 0;
            var blnMatchFound = true;

            if (string.IsNullOrWhiteSpace(tCarrier) && string.IsNullOrWhiteSpace(tDevice))
            {
                strMatchedFrequencies = $"Carrier Network and Device do not support {type}";
                blnMatchFound = false;
            }
            else if (string.IsNullOrWhiteSpace(tCarrier))
            {
                strMatchedFrequencies = $"Carrier Network does not support {type}";
                blnMatchFound = false;
            }
            else if (string.IsNullOrWhiteSpace(tDevice))
            {
                strMatchedFrequencies = $"Device does not support {type} bands";
                blnMatchFound = false;
            }

            if (!blnMatchFound)
            {
                tuple = new Tuple<int, string>(matchedFrequencies, strMatchedFrequencies);
                return false;
            }

            var seperator = new char[] { '/' };
            var carrierFrequecies = tCarrier.Split(seperator);
            var deviceFrequecies = tDevice.Split(seperator);
            var lstFrequencies = new List<string>();

            for (int i = 0; i < carrierFrequecies.Length; i++)
            {
                for (int a = 0; a < deviceFrequecies.Length; a++)
                {
                    if (carrierFrequecies[i].ToLower().Equals(deviceFrequecies[a].ToLower()))
                    {
                        lstFrequencies.Add(deviceFrequecies[a]);
                        matchedFrequencies += 1;
                        break;
                    }
                }//End of device loop
            }// End of carrier loop

            strMatchedFrequencies = (lstFrequencies.Count > 0) ? String.Join(", ", lstFrequencies) : "Device not compatible";

            blnMatchFound = matchedFrequencies == carrierFrequecies.Length;

            tuple = new Tuple<int, string>(matchedFrequencies, strMatchedFrequencies);

            return blnMatchFound;
        }

    }
}
