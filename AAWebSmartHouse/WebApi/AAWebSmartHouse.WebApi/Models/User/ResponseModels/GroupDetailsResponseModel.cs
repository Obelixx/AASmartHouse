namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;

    using Microsoft.AspNet.Identity.EntityFramework;

    public class GroupDetailsResponseModel : IMapFrom<IdentityRole>
    {
        public string Name { get; set; }
    }
}
