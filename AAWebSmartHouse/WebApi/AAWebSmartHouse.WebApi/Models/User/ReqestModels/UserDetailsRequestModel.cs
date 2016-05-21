namespace AAWebSmartHouse.WebApi.Models.User.ReqestModels
{
    using System.ComponentModel.DataAnnotations;

    using AAWebSmartHouse.Common;

    public class UserDetailsRequestModel
    {
        [Required]
        [MaxLength(ValidationConstants.MaxFirstName)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(ValidationConstants.MaxLastName)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(ValidationConstants.MaxEMail)]
        public string NewEMail { get; set; }

        [Required]
        [MaxLength(ValidationConstants.MaxEMail)]
        public string OldEMail { get; set; }

        [MaxLength(ValidationConstants.MaxPhoneNumber)]
        public string PhoneNumber { get; set; }
    }
}
