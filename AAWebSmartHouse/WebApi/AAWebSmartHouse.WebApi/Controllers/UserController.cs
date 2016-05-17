namespace AAWebSmartHouse.WebApi.Controllers
{
    using System.Linq;
    using System.Web.Http;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Services.Contracts;
    using AAWebSmartHouse.WebApi.Models.User.ReqestModels;
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

        // GET api/User/GetAll
        [Authorize(Roles = GlobalConstants.AdminRoleName)]
        [Route("api/User/GetAll")]
        public IHttpActionResult Get(int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.Identity.IsAuthenticated || !this.User.IsInRole(GlobalConstants.AdminRoleName))
            {
                return this.BadRequest("Only " + GlobalConstants.AdminRoleName + " Can request all Users");
            }

            var result = this.users
                .All(page, pageSize)
                .ProjectTo<UserDetailsResponseModel>()
                .ToList();

            return this.Ok(result);
        }

        [Authorize]
        public IHttpActionResult Get()
        {
            var result = this.users
                .Self(this.User.Identity.Name)
                .ProjectTo<UserDetailsResponseModel>()
                .FirstOrDefault();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        [Authorize]
        public IHttpActionResult Post(UserDetailsRquestModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            if (!this.User.IsInRole(GlobalConstants.AdminRoleName))
            {
                if (model.OldEMail != this.User.Identity.Name)
                {
                    return this.BadRequest("Cant edit other users data.");
                }
                else
                {
                    model.OldEMail = this.User.Identity.Name;
                }
            }

            if (this.users.Self(model.NewEMail) != null)
            {
                return this.BadRequest("New E-mail already exists.");
            }
            
            var result = this.users
                .Edit(model.OldEMail, model.NewEMail, model.FirstName, model.LastName, model.PhoneNumber)
                .ProjectTo<UserDetailsResponseModel>()
                .FirstOrDefault();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

    }
}
