namespace AAWebSmartHouse.WebApi.Controllers
{
    using System.Linq;
    using System.Web.Http;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Services.Contracts;
    using AAWebSmartHouse.WebApi.Models.User.ReqestModels;
    using AAWebSmartHouse.WebApi.Models.User.ResponseModels;

    using AutoMapper.QueryableExtensions;

    // api/Group
    [Authorize]
    public class GroupController : ApiController
    {
        private readonly IUsersService users;

        public GroupController(IUsersService usersService)
        {
            this.users = usersService;
        }

        // GET api/Group
        public IHttpActionResult Get(string[] groupIds)
        {
            var result = this.users
                .GetGroupsById(groupIds)
                .ProjectTo<GroupDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                // TODO: maybe it is OK to have no groups?
                return this.NotFound();
            }

            return this.Ok(result);
        }

        [Authorize(Roles = AdminRole.Name)]
        [Route("api/Group/GetAll")]
        public IHttpActionResult Get(int page, int pageSize = GlobalConstants.DefaultPageSize)
        {
            if (!this.User.Identity.IsAuthenticated || !this.User.IsInRole(AdminRole.Name))
            {
                return this.BadRequest("Only " + AdminRole.Name + " Can request all Groups");
            }

            var result = this.users
                .GetAllGroupsPaged(page, pageSize)
                .ProjectTo<GroupDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        [Authorize(Roles = AdminRole.Name)]
        [Route("api/Group/CreateGroup")]
        public IHttpActionResult Post(GroupRequestModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var result = this.users
                .CreateGroup(model.GroupName)
                .ProjectTo<GroupDetailsResponseModel>()
                .ToList();

            if (result == null)
            {
                return this.BadRequest();
            }

            return this.Ok(result);                
        }

        [Authorize(Roles = AdminRole.Name)]
        [Route("api/Group/AddUserToGroup")]
        public IHttpActionResult Post(UserAndGroupRequestModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var groupId = this.users
                .GetGroupByName(model.GroupName)
                .FirstOrDefault()
                .Id;

            if (groupId == null)
            {
                return this.NotFound();
            }

            this.users.AddUserToGroup(model.UserIdentityEmail, groupId);

            if (User.IsInRole(model.GroupName))
            {
                return this.Ok("User '" + model.UserIdentityEmail + "' added to group: " + model.GroupName);
            }
            else
            {
                return this.BadRequest();
            }
        }

        [Authorize(Roles = AdminRole.Name)]
        [Route("api/Group/RemoveUserFromGroup")]
        public IHttpActionResult Delete(UserAndGroupRequestModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var groupId = this.users
                .GetGroupByName(model.GroupName)
                .FirstOrDefault()
                .Id;

            if (groupId == null)
            {
                return this.NotFound();
            }
            
            if (this.users.RemoveUserFromGroup(model.UserIdentityEmail, groupId))
            {
                return this.Ok("User '" + model.UserIdentityEmail + "' removed from group: " + model.GroupName);
            }
            else
            {
                return this.BadRequest();
            }
        }
    }
}