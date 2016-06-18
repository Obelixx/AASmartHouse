namespace AAWebSmartHouse.WebApi.Controllers
{
    using System.Linq;
    using System.Web.Http;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Services.Contracts;
    using AAWebSmartHouse.WebApi.Models.User.ResponseModels;

    using AutoMapper.QueryableExtensions;

    // api/House
    [Authorize]
    public class HouseController : ApiController
    {
        private readonly IHousesService houses;
        private readonly IUsersService users;

        public HouseController(IHousesService housesService, IUsersService usersService)
        {
            this.houses = housesService;
            this.users = usersService;
        }

        [Authorize(Roles = AdminRole.Name)]
        [Route("api/House/GetAll")]
        public IHttpActionResult GetAll(int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.Identity.IsAuthenticated || !this.User.IsInRole(AdminRole.Name))
            {
                return this.BadRequest("Only " + AdminRole.Name + " Can request all Users");
            }

            var result = this.houses
                .GetAllHousesPaged(page, pageSize)
                .ProjectTo<HousesDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        // GET api/House
        public IHttpActionResult Get(int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            var ids = this.users
                .GetUser(this.User.Identity.Name)
                .FirstOrDefault()
                .Houses.Select(h => h.HouseId)
                .ToArray();

            if (ids == null)
            {
                // TODO: Check the response!
                return this.Ok("You have no Houses!");
            }

            var result = this.houses
                .GetHousesPaged(ids, page, pageSize)
                .ProjectTo<HousesDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        // add house to user
        [Authorize(Roles = AdminRole.Name)]
        [Route("api/House/AddUser")]
        public IHttpActionResult Post(int houseId, string userId)
        {
            if (!this.User.Identity.IsAuthenticated || !this.User.IsInRole(AdminRole.Name))
            {
                return this.BadRequest("Only " + AdminRole.Name + " Can add houses to users!");
            }
            
            if (houses.AddUserToHouse(houseId, userId))
            {
                return this.NotFound();
            }
            
            // TODO: massage maybe?
            return this.Ok("User Added");
        }
    }
}