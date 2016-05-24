namespace AAWebSmartHouse.WebApi.Controllers
{
    using System.Linq;
    using System.Web.Http;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Services.Contracts;
    using AAWebSmartHouse.WebApi.Models.User.ResponseModels;

    using AutoMapper.QueryableExtensions;

    public class SensorController : ApiController
    {
        private readonly IUsersService users;
        private readonly IRoomsService rooms;
        private readonly ISensorsService sensors;

        public SensorController(
            IUsersService usersService,
            IRoomsService roomsService,
            ISensorsService sensorsService)
        {
            this.users = usersService;
            this.rooms = roomsService;
            this.sensors = sensorsService;
        }

        [Authorize(Roles = AdminRole.Name)]
        [Route("api/Sensor/GetAll")]
        public IHttpActionResult Get(int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.Identity.IsAuthenticated || !this.User.IsInRole(AdminRole.Name))
            {
                return this.BadRequest("Only " + AdminRole.Name + " Can request all Rooms");
            }

            var result = this.sensors
                .GetAllSensorsPaged(page, pageSize)
                .ProjectTo<SensorDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        // GET api/Sensor?houseId=houseId&page=1&pageSize=10
        public IHttpActionResult Get(int roomId, int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.IsInRole(AdminRole.Name))
            {
                var userRoom = this.users
                .GetUser(this.User.Identity.Name)
                .Select(u => u.Houses.Select(h => h.Rooms.Where(r => r.RoomId == roomId).FirstOrDefault()))
                .FirstOrDefault();
                
                // TODO: Maybe it can be null?
                if (userRoom.Count() == 0)
                {
                    return this.BadRequest();
                }
            }

            var result = this.sensors
                .GetSensorsByRoomIdPaged(roomId, page, pageSize)
                .ProjectTo<SensorDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }
    }
}
