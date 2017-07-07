namespace AAWebSmartHouse.WebApi.Models.User.ResponseModels
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.WebApi.Infrastructure.Mappings;

    using AutoMapper;
    using Data.Services;

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
        //public IEnumerable<int> SensorValuesIdsByDay { get; set; }
        //public IEnumerable<int> SensorValuesIdsByWeek { get; set; }
        //public IEnumerable<int> SensorValuesIdsByMonth { get; set; }

        public void CreateMappings(IConfiguration config)
        {
            config.CreateMap<Sensor, SensorDetailsResponseModel>()
                .ForMember(
                    m => m.SensorValuesIds,
                    opts => opts.MapFrom(s => s.SensorValues.Select(sv => sv.SensorValueId))
                    );

            //config.CreateMap<Sensor, SensorDetailsResponseModel>()
            //    .ForMember(
            //        m => m.SensorValuesIdsByDay,
            //        opts => opts.MapFrom(s => { var sensorId = s.SensorId;
                       
            //                                    //        .GroupBy(svg => svg.SensorValueDateTime.Year * 10000 +
            //                                    //               svg.SensorValueDateTime.Month * 100 +
            //                                    //               svg.SensorValueDateTime.Day)
            //                                    //.Select(svgr => svgr.Key)
            //                                    //.ToList()})
            //        );

            ////config.CreateMap<Sensor, SensorDetailsResponseModel>()
            ////    .ForMember(
            ////        m => m.SensorValuesIdsByWeek,
            ////        opts => opts.MapFrom(s => s.SensorValues
            ////                                    .ToList()
            ////                                    .GroupBy(g => new
            ////                                    {
            ////                                        group = g.SensorValueDateTime.Year * 100 +
            ////                                            CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(g.SensorValueDateTime,
            ////                                            CalendarWeekRule.FirstDay,
            ////                                            DayOfWeek.Monday)
            ////                                    })
            ////                                    .Select(svgr => svgr.Key.group))
            ////        );

            //config.CreateMap<Sensor, SensorDetailsResponseModel>()
            //    .ForMember(
            //        m => m.SensorValuesIdsByMonth,
            //        opts => opts.MapFrom(s => s.SensorValues
            //                                    .GroupBy(svg => svg.SensorValueDateTime.Year * 100 +
            //                                                   svg.SensorValueDateTime.Month)
            //                                    .Select(svgr => svgr.Key)
            //                                    .ToList())
            //        );
        }
    }
}