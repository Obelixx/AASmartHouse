namespace AAWebSmartHouse.WebApi.Controllers
{
    using Data.Services.Contracts;
    using System.Web.Http;

    public class UsersController : ApiController
    {
        private readonly IUsersService users;

        public UsersController(IUsersService usersService)
        {
            this.users = usersService;
        }


        //public IHttpActionResult Get()
        //{
        //    var result = this.users
        //        .All()
        //        .ProjectTo<SoftwareProjectDetailsResponseModel>()
        //        .ToList();

        //    return this.Ok(result);
        //}
    }
}
