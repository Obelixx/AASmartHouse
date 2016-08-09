namespace AAWebSmartHouse.Data.Services.Contracts
{
    using System.Collections.Generic;
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;
    using Microsoft.AspNet.Identity.EntityFramework;

    public interface IUsersService
    {
        IQueryable<User> GetAllUsersPaged(int page = 1, int pageSize = GlobalConstants.DefaultPageSize);

        IQueryable<User> GetUser(string userId);

        IQueryable<User> Edit(string EMail, string firstName, string lastName, string phoneNumber);

        IQueryable<IdentityRole> GetAllGroupsPaged(int page = 1, int pageSize = GlobalConstants.DefaultPageSize);

        IQueryable<IdentityRole> GetGroupById(string groupId);

        IQueryable<IdentityRole> GetGroupsById(string[] groupIds);

        IQueryable<IdentityRole> GetGroupByName(string groupName);

        IQueryable<IdentityRole> CreateGroup(string groupName);

        void RemoveGroup(string groupName);

        bool RemoveUserFromGroup(string identityEmail, string groupId);

        void AddUserToGroup(string identityEmail, string groupId);
    }
}
