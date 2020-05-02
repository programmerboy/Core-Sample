using System.Collections.Generic;

namespace Core_Sample.Configurations
{
    public class AppSettings
    {
        public string ApiKey { get; set; }

        public int PagerSize { get; set; }

        public Dictionary<string, InnerClass> Dict { get; set; }

        public Cors Cors { get; set; }

        public List<string> SpecialWrods { get; set; }

        public MyEnum AnEnum { get; set; }
    }


    public class InnerClass
    {
        public string Name { get; set; }
        public bool IsEnabled { get; set; } = true;
    }

    public class Cors
    {
        public List<string> Origins { get; set; }
        public List<string> Headers { get; set; }
        public List<string> Methods { get; set; }
        public List<string> ExposedHeaders { get; set; }
    }

    public enum MyEnum
    {
        None = 0,
        Lots = 1
    }

}
