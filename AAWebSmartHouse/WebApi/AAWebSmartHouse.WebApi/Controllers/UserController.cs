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
    [Authorize]
    public class UserController : ApiController
    {
        private readonly IUsersService users;

        public UserController(IUsersService usersService)
        {
            this.users = usersService;
        }
        
        [Authorize(Roles = AdminRole.Name)]
        [Route("api/User/GetAll")]
        public IHttpActionResult Get(int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.Identity.IsAuthenticated || !this.User.IsInRole(AdminRole.Name))
            {
                return this.BadRequest("Only " + AdminRole.Name + " Can request all Users");
            }

            var result = this.users
                .GetAllUsersPaged(page, pageSize)
                .ProjectTo<UserDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        // GET api/User
        public IHttpActionResult Get()
        {
            var result = this.users
                .GetUser(this.User.Identity.Name)
                .ProjectTo<UserDetailsResponseModel>()
                .FirstOrDefault();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        // POST api/User
        public IHttpActionResult Post(UserDetailsRequestModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            if (!this.User.IsInRole(AdminRole.Name))
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

            if (this.users.GetUser(model.NewEMail) != null)
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
