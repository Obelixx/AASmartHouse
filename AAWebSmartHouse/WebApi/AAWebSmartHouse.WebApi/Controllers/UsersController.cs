namespace AAWebSmartHouse.WebApi.Controllers
{
    using System.Web.Http;
    using Data.Services.Contracts;

    public class UsersController : ApiController
    {
        private readonly IUsersService users;

        public UsersController(IUsersService usersService)
        {
            this.users = usersService;
        }
        
        ////public IHttpActionResult Get()
        ////{
        ////    var result = this.users
        ////        .All()
        ////        .ProjectTo<SensorDetailsResponseModel>()
        ////        .ToList();

        ////    return this.Ok(result);
        ////}
    }
}
