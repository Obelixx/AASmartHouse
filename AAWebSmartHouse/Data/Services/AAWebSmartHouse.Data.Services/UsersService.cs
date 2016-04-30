namespace AAWebSmartHouse.Data.Services
{
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;

    public class UsersService
    {
        // private readonly IRepository<SensorsData> sensors;
        private readonly IRepository<User> users;

        public UsersService(
            //// IRepository<SensorsData> sensorsRepo,
            IRepository<User> usersRepo)
        {
            // this.sensors = sensorsRepo;
            this.users = usersRepo;
        }

        public IQueryable<User> All(int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
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
