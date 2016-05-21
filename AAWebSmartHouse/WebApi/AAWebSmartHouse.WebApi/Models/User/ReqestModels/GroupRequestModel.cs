namespace AAWebSmartHouse.WebApi.Models.User.ReqestModels
{
    using System.ComponentModel.DataAnnotations;

    using AAWebSmartHouse.Common;

    public class GroupRequestModel
    {
        [Required]
        [MaxLength(ValidationConstants.MaxRoleNameSize)]
        public string GroupName { get; set; }
    }
}
