namespace AAWebSmartHouse.Data.Services
{
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Data.Services.Contracts;

    public class UsersService : IUsersService
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

        public IQueryable<User> Self(string userName)
        {
            return this.users
                .All()
                .Where(u => u.Email == userName);
        }

        public IQueryable<User> Edit(string oldEMail, string newEMail, string firstName, string lastName, string phoneNumber)
        {
            var user = this.users
                .All()
                .Where(u => u.Email == oldEMail).FirstOrDefault();

            if (user == null)
            {
                return null;
            }

            user.Email = newEMail;
            user.FirstName = firstName;
            user.LastName = lastName;
            user.PhoneNumber = phoneNumber;

            this.users.SaveChanges();

            return this.users
                .All()
                .Where(u => u.Email == newEMail);
        }
    }
}
