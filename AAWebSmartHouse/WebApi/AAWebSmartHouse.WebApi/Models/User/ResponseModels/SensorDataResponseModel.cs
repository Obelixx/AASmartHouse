namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using System;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;

    public class SensorDataResponseModel : IMapFrom<SensorDataByHour>
    {
        public int SensorId { get; set; }

        public string SensorValue { get; set; }

        public DateTime SensorDataDateTime { get; set; }
    }
}
