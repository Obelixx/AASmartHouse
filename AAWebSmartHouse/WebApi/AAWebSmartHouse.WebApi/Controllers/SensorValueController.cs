namespace AAWebSmartHouse.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Services.Contracts;
    using AAWebSmartHouse.WebApi.Models.User.ResponseModels;

    using AutoMapper.QueryableExtensions;

    public class SensorValueController : ApiController
    {
        private readonly IUsersService users;
        private readonly IRoomsService rooms;
        private readonly ISensorsService sensors;
        private readonly ISensorValuesService sensorValues;

        public SensorValueController(
            IUsersService usersService,
            IRoomsService roomsService,
            ISensorsService sensorsService,
            ISensorValuesService sensorValuesService)
        {
            this.users = usersService;
            this.rooms = roomsService;
            this.sensors = sensorsService;
            this.sensorValues = sensorValuesService;
        }

        // GET api/SensorValue?sensorId=sensorId&page=1&aggregationType=ByHour/ByDay/ByWeek/ByMonth&pageSize=10&orderAscendingByDate=false
        public IHttpActionResult Get(int sensorId, int page, SensorAggregationType aggregationType = SensorAggregationType.ByHour, int pageSize = GlobalConstants.DefaultPageSize, bool orderAscendingByDate = false)
        {
            if (!this.User.IsInRole(AdminUser.Name))
            {
                var userSensor = this.users
                .GetUser(this.User.Identity.Name)
                .Select(u => u.Houses.Select(h => h.Rooms.Select(s => s.Sensors.Where(us => us.SensorId == sensorId))))
                .FirstOrDefault();
                
                if (userSensor == null || userSensor.Count() == 0)
                {
                    return this.BadRequest();
                }
            }

            var result = this.sensorValues
                .GetSensorValuesPagedOrderdAndAgregated(sensorId, page, pageSize, orderAscendingByDate, aggregationType)
                .ProjectTo<SensorValueResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        // GET api/SensorValue?sensorId=sensorId&aggregationType=ByHour/ByDay/ByWeek/ByMonth
        // get elements count by aggregationType
        public IHttpActionResult Get(int sensorId, SensorAggregationType aggregationType = SensorAggregationType.ByHour)
        {
            if (!this.User.IsInRole(AdminUser.Name))
            {
                var userSensor = this.users
                .GetUser(this.User.Identity.Name)
                .Select(u => u.Houses.Select(h => h.Rooms.Select(s => s.Sensors.Where(us => us.SensorId == sensorId))))
                .FirstOrDefault();

                if (userSensor == null || userSensor.Count() == 0)
                {
                    return this.BadRequest();
                }
            }

            var result = this.sensorValues
                .GetSensorValuesCountByAggregation(sensorId, aggregationType);

            return this.Ok(result);
        }
    }
}
