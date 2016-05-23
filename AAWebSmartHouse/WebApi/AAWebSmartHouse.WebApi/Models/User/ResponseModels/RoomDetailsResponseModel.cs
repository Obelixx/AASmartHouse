namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using System.Collections.Generic;
    using System.Linq;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;

    using AutoMapper;

    public class RoomDetailsResponseModel : IMapFrom<Room>, IHaveCustomMappings
    {
        public int RoomId { get; set; }

        public string RoomName { get; set; }

        public string RoomDescription { get; set; }

        public int HouseId { get; set; }

        public ICollection<int> SensorsIds { get; set; }

        public void CreateMappings(IConfiguration config)
        {
            config.CreateMap<Room, RoomDetailsResponseModel>()
                .ForMember(m => m.SensorsIds, opts => opts.MapFrom(r => r.Sensors.Select(ro => ro.SensorId).ToList()));
        }
    }
}
