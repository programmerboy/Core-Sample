using System;
using System.ComponentModel.DataAnnotations;

namespace Core_Sample.Models
{
    public class Device
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Brand { get; set; }

        [Required]
        [StringLength(200)]
        public string PhoneModel { get; set; }

        [StringLength(200)]
        public string SubModel { get; set; }

        [Display(Name = "2G"), StringLength(200)]
        public string Two_G { get; set; }

        [Display(Name = "3G"), StringLength(200)]
        public string Three_G { get; set; }

        [Display(Name = "4G"), StringLength(600)]
        public string Four_G { get; set; }

        [Display(Name = "5G"), StringLength(600)]
        public string Five_G { get; set; }

        [Display(Name = "Time Added"), DataType(DataType.DateTime)]
        public DateTime Date_Added { get; set; }

        [Display(Name = "Time Modified"), DataType(DataType.DateTime)]
        public DateTime Date_Modified { get; set; }
    }
}
