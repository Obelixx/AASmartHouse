namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using System.Collections.Generic;
    using System.Linq;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;
    using AutoMapper;

    public class UserDetailsResponseModel : IMapFrom<User>, IHaveCustomMappings
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EMail { get; set; }

        public string UserName { get; set; }

        public string Id { get; set; }

        public string PhoneNumber { get; set; }

        public ICollection<string> RoleIds { get; set; }

        public void CreateMappings(IConfiguration config)
        {
            config.CreateMap<User, UserDetailsResponseModel>()
                .ForMember(m => m.RoleIds, opts => opts.MapFrom(u => u.Roles.Select(ro => ro.RoleId)));
        }
    }
}
