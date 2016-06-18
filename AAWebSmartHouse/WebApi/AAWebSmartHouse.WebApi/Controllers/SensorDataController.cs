namespace AAWebSmartHouse.WebApi.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Services.Contracts;
    using AAWebSmartHouse.WebApi.Models.User.ResponseModels;

    using AutoMapper.QueryableExtensions;

    public class SensorDataController : ApiController
    {
        private readonly IUsersService users;
        private readonly IRoomsService rooms;
        private readonly ISensorsService sensors;
        private readonly ISensorsDataService sensorsData;

        public SensorDataController(
            IUsersService usersService,
            IRoomsService roomsService,
            ISensorsService sensorsService,
            ISensorsDataService sensorsDataService)
        {
            this.users = usersService;
            this.rooms = roomsService;
            this.sensors = sensorsService;
            this.sensorsData = sensorsDataService;
        }
                
        // GET api/SensorData?sensorId=sensorId&&page=1&pageSize=10
        public IHttpActionResult Get(int sensorId, SensorAggregationType aggregationType, int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.IsInRole(AdminRole.Name))
            {
                var userSensor = this.users
                .GetUser(this.User.Identity.Name)
                .Select(u => u.Houses.Select(h => h.Rooms.Select(s => s.Sensors.Where(us => us.SensorId == sensorId))))
                .FirstOrDefault();

                // TODO: Maybe it can be null?
                if (userSensor.Count() == 0)
                {
                    return this.BadRequest();
                }
            }
            
            IQueryable query;

            switch (aggregationType)
            {
                case SensorAggregationType.ByDay:
                    query = this.sensorsData
                        .GetSensorDataByHourPaged(sensorId, page, pageSize);                        
                    break;
                case SensorAggregationType.ByMonth:
                    query = this.sensorsData
                        .GetSensorDataByHourPaged(sensorId, page, pageSize);
                    break;
                case SensorAggregationType.ByYear:
                    query = this.sensorsData
                        .GetSensorDataByHourPaged(sensorId, page, pageSize);
                    break;
                case SensorAggregationType.ByYears:
                    query = this.sensorsData
                        .GetSensorDataByHourPaged(sensorId, page, pageSize);
                    break;
                default:
                    return this.BadRequest("Use one of these aggregation types: " + string.Join(", ", Enum.GetNames(typeof(SensorAggregationType))));
            }
            
            var result = query
                .ProjectTo<SensorDataResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }
    }
}
