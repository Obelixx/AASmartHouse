namespace AAWebSmartHouse.WebApi.Models.User.ReqestModels
{
    using System.ComponentModel.DataAnnotations;

    using AAWebSmartHouse.Common;

    public class UserAndGroupRequestModel
    {
        [Required]
        [MaxLength(ValidationConstants.MaxEMail)]
        public string UserIdentityEmail { get; set; }
        
        [Required]
        [MaxLength(ValidationConstants.MaxRoleNameSize)]
        public string GroupName { get; set; }
    }
}
