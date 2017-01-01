namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using System;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;

    public class SensorValueResponseModel : IMapFrom<SensorValue>
    {
        public int SensorValueId { get; set; }

        public int SensorId { get; set; }

        public string Value { get; set; }

        public DateTime SensorValueDateTime { get; set; }
    }
}
