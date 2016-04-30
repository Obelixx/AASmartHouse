namespace AAWebSmartHouse.Data.Services
{
    using AAWebSmartHouse.Common;
    using Models;
    using System.Linq;

    public class UsersService
    {
        //private readonly IRepository<SoftwareProject> projects;
        private readonly IRepository<user> users;

        public UsersService(
            //IRepository<SoftwareProject> projectsRepo,
            IRepository<user> usersRepo)
        {
            //this.projects = projectsRepo;
            this.users = usersRepo;
        }

        public IQueryable<user> All(int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.users
                .All()
                .OrderByDescending(u => u.FirstName)
                .ThenByDescending(us => us.LastName)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }
    }
}
