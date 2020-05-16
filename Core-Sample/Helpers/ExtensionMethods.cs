using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core_Sample.Helpers
{
    public static class ExtensionMethods
    {
        public static bool CustomCompare(this string source, string stringToFind, bool ignoreNullOrEmpty = false)
        {
            if (ignoreNullOrEmpty && string.IsNullOrEmpty(stringToFind)) { return true; }
            return string.IsNullOrEmpty(source) ? false : source.IndexOf(stringToFind, StringComparison.OrdinalIgnoreCase) >= 0;
        }
       
        public static bool ExactMatch(this string source, string stringToFind, bool ignoreNullOrEmpty = false)
        {
            if (ignoreNullOrEmpty && string.IsNullOrEmpty(stringToFind))
                return true;

            return String.CompareOrdinal(source, stringToFind) == 0;
        }

        public static string TrimAndUpper(this string source)
        {
            if (string.IsNullOrWhiteSpace(source))
                return source;

            return source.Trim().ToUpper();
        }

    }
}
