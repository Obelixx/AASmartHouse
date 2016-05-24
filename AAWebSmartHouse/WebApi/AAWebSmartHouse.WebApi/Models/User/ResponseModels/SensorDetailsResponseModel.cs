namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;

    public class SensorDetailsResponseModel : IMapFrom<Sensor>
    {
        public int SensorId { get; set; }

        public string SensorName { get; set; }

        public string SensorDescription { get; set; }

        public string SensorUnits { get; set; }

        public int RoomId { get; set; }
    }
}