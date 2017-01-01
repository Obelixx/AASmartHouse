namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using System.Collections.Generic;
    using System.Linq;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;

    using AutoMapper;

    public class HouseDetailsResponseModel : IMapFrom<House>, IHaveCustomMappings
    {
        public int HouseId { get; set; }

        public string HouseName { get; set; }
        
        public int ControlerNumber { get; set; }

        public string VerificationCode { get; set; }

        public string HouseLocation { get; set; }

        public string HouseDescription { get; set; }

        public IEnumerable<int> RoomIds { get; set; }

        public void CreateMappings(IConfiguration config)
        {
            config.CreateMap<House, HouseDetailsResponseModel>()
                .ForMember(m => m.RoomIds, opts => opts.MapFrom(h => h.Rooms.Select(r => r.RoomId)));
        }
    }
}
