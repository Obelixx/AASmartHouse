namespace AAWebSmartHouse.WebApi.Controllers
{
    using System.Linq;
    using System.Web.Http;
    using AutoMapper.QueryableExtensions;
    using Common;
    using Data.Services.Contracts;
    using Models.User.ResponseModels;

    // api/Room
    [Authorize]
    public class RoomController : ApiController
    {
        private readonly IUsersService users;
        private readonly IRoomsService rooms;

        public RoomController(
            IUsersService usersService,
            IRoomsService roomsService)
        {
            this.users = usersService;
            this.rooms = roomsService;
        }

        [Authorize(Roles = AdminUser.Name)]
        [Route("api/Room/GetAll")]
        public IHttpActionResult GetAll(int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.Identity.IsAuthenticated || !this.User.IsInRole(AdminUser.Name))
            {
                return this.BadRequest("Only " + AdminUser.Name + " Can request all Rooms");
            }

            var result = this.rooms
                .GetAllRoomsPaged(page, pageSize)
                .ProjectTo<RoomDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        // GET api/Room?houseId=houseId&page=1&pageSize=10
        public IHttpActionResult Get(int houseId, int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.IsInRole(AdminUser.Name))
            {
                var userHouse = this.users
                .GetUser(this.User.Identity.Name)
                .Select(u => u.Houses.Where(h => h.HouseId == houseId))
                .FirstOrDefault();

                // TODO: Maybe it can be null?
                if (userHouse.Count() == 0)
                {
                    return this.BadRequest();
                }
            }

            var result = this.rooms
                .GetRoomsByHouseIdPaged(houseId, page, pageSize)
                .ProjectTo<RoomDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        public IHttpActionResult Get(int roomId)
        {
            if (!this.User.IsInRole(AdminUser.Name))
            {
                var userRoom = this.users
                .GetUser(this.User.Identity.Name)
                .Select(u => u.Houses.Select(h => h.Rooms.Where(r => r.RoomId == roomId)))
                .FirstOrDefault();

                // TODO: Maybe it can be null?
                if (userRoom.Count() == 0)
                {
                    return this.BadRequest();
                }
            }

            var result = this.rooms
                .GetRoomById(roomId)
                .ProjectTo<RoomDetailsResponseModel>()
                .FirstOrDefault();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }
    }
}
