namespace AAWebSmartHouse.Data.Services
{
    using System.Collections.Generic;
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Data.Services.Contracts;

    using Microsoft.AspNet.Identity.EntityFramework;

    public class UsersService : IUsersService
    {
        private readonly IRepository<User> users;
        private readonly IRepository<IdentityRole> roles;

        public UsersService(IRepository<User> usersRepo, IRepository<IdentityRole> roelsRepo)
        {
            this.users = usersRepo;
            this.roles = roelsRepo;
        }
        #region Users
        public IQueryable<User> GetAllUsersPaged(int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.users
                .All()
                .OrderByDescending(u => u.FirstName)
                .ThenByDescending(us => us.LastName)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public IQueryable<User> GetUser(string identityEmail)
        {
            return this.users
                .All()
                .Where(u => u.Email == identityEmail);
        }

        public IQueryable<User> Edit(string oldEMail, string newEMail, string firstName, string lastName, string phoneNumber)
        {
            var user = this.GetUser(oldEMail).FirstOrDefault();

            if (user == null)
            {
                return null;
            }

            user.Email = newEMail;
            user.FirstName = firstName;
            user.LastName = lastName;
            user.PhoneNumber = phoneNumber;

            this.users.SaveChanges();

            return this.GetUser(newEMail);
        }
        #endregion
        #region Groups
        public IQueryable<IdentityRole> GetAllGroupsPaged(int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.roles
                .All()
                .OrderByDescending(r => r.Name)
                .ThenByDescending(ro => ro.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public IQueryable<IdentityRole> GetGroupById(string groupId)
        {
            return this.roles
                .All()
                .Where(r => r.Id == groupId);
        }

        public IQueryable<IdentityRole> GetGroupsById(string[] groupIds)
        {
            var groups = new List<IdentityRole>(groupIds.Length);

            foreach (var id in groupIds)
            {
                var group = this.GetGroupById(id).FirstOrDefault();
                groups.Add(
                    new IdentityRole
                    {
                        Id = group.Id,
                        Name = group.Name
                    });
            }

            return groups.AsQueryable();
        }

        public IQueryable<IdentityRole> GetGroupByName(string groupName)
        {
            return this.roles
                .All()
                .Where(r => r.Name == groupName);
        }

        public IQueryable<IdentityRole> CreateGroup(string groupName)
        {
            this.roles.Add(new IdentityRole(groupName));

            this.roles.SaveChanges();

            return this.GetGroupByName(groupName);
        }

        public void RemoveGroup(string groupName)
        {
            this.roles.Delete(this.GetGroupById(groupName).FirstOrDefault());

            this.roles.SaveChanges();
        }

        public bool RemoveUserFromGroup(string identityEmail, string groupId)
        {
            var user = this.GetUser(identityEmail).FirstOrDefault();

            var userRoleRelation = user
                .Roles
                .Where(g => g.RoleId == groupId && g.UserId == user.Id)
                .FirstOrDefault();

            var result = user.Roles.Remove(userRoleRelation);

            this.users.SaveChanges();

            return result;
        }

        public void AddUserToGroup(string identityEmail, string groupId)
        {
            var user = this.GetUser(identityEmail).FirstOrDefault();

            var userRoleRelation = new IdentityUserRole() { UserId = user.Id, RoleId = groupId };

            user.Roles.Add(userRoleRelation);

            this.users.SaveChanges();
        }
        #endregion
    }
}
