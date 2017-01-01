namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using System.Collections.Generic;
    using System.Linq;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;

    using AutoMapper;

    public class SensorDetailsResponseModel : IMapFrom<Sensor>, IHaveCustomMappings
    {
        public int SensorId { get; set; }

        public int ControlerNumber { get; set; }

        public string SensorName { get; set; }

        public string SensorDescription { get; set; }

        public string SensorUnits { get; set; }

        public bool Registerd { get; set; }

        public int RoomId { get; set; }

        public IEnumerable<int> SensorValuesIds { get; set; }
        //public IEnumerable<int> SensorDataIdsByDay { get; set; }
        //public IEnumerable<int> SensorDataIdsByWeek { get; set; }
        //public IEnumerable<int> SensorDataIdsByMonth { get; set; }

        public void CreateMappings(IConfiguration config)
        {
            config.CreateMap<Sensor, SensorDetailsResponseModel>()
                .ForMember(
                    m => m.SensorValuesIds,
                    opts => opts.MapFrom(s => s.SensorValues.Select(sd => sd.SensorValueId))
                    );

            //config.CreateMap<Sensor, SensorDetailsResponseModel>()
            //    .ForMember(
            //        m => m.SensorDataIdsByDay,
            //        opts => opts.MapFrom(s => s.SensorDataByDay.Select(sdh => sdh.SensorDataByDayId))
            //        );

            //config.CreateMap<Sensor, SensorDetailsResponseModel>()
            //    .ForMember(
            //        m => m.SensorDataIdsByWeek,
            //        opts => opts.MapFrom(s => s.SensorDataByWeek.Select(sdh => sdh.SensorDataByWeekId))
            //        );

            //config.CreateMap<Sensor, SensorDetailsResponseModel>()
            //    .ForMember(
            //        m => m.SensorDataIdsByMonth,
            //        opts => opts.MapFrom(s => s.SensorDataByMonth.Select(sdh => sdh.SensorDataByMonthId))
            //        );
        }
    }
}