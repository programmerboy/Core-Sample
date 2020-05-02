using System;
using System.ComponentModel.DataAnnotations;

namespace Core_Sample.Models
{
    public class Carrier
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Country name cannot be longer than 100 characters.")]
        public string Country { get; set; }

        [Required]
        [StringLength(200, ErrorMessage = "CarrierName cannot be longer than 200 characters.")]
        [Display(Name = "Carrier")]
        public string CarrierName { get; set; }

        [Display(Name = "2G")]
        [StringLength(200, ErrorMessage = "2G cannot be longer than 200 characters.")]
        public string Two_G { get; set; }

        [Display(Name = "3G")]
        [StringLength(200, ErrorMessage = "3G cannot be longer than 200 characters.")]
        public string Three_G { get; set; }

        [Display(Name = "4G"), StringLength(600, ErrorMessage = "4G cannot be longer than 600 characters.")]
        public string Four_G { get; set; }

        [Display(Name = "5G"), StringLength(600, ErrorMessage = "5G cannot be longer than 600 characters.")]
        public string Five_G { get; set; }

        [Display(Name = "Time Added")]
        public Nullable<DateTime> Date_Added { get; set; }

        [Display(Name = "Time Modified")]
        public Nullable<DateTime> Date_Modified { get; set; }
    }
}
