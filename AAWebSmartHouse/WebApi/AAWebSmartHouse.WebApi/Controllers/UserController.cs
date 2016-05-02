namespace AAWebSmartHouse.WebApi.Controllers
{
    using System.Linq;
    using System.Web.Http;
    using AAWebSmartHouse.Data.Services.Contracts;
    using AAWebSmartHouse.WebApi.Models.User.ResponseModels;
    using AutoMapper.QueryableExtensions;

    // api/User
    public class UserController : ApiController
    {
        private readonly IUsersService users;

        public UserController(IUsersService usersService)
        {
            this.users = usersService;
        }
        
        // GET api/User
        [Authorize]
        public IHttpActionResult Get()
        {
            var result = this.users
                .All()
                .ProjectTo<UserDetailsResponseModel>()
                .ToList();

            return this.Ok(result);
        }
    }
}
