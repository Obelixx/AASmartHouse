namespace AAWebSmartHouse.Data.Services
{
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Data.Services.Contracts;

    public class HousesService : IHousesService
    {
        private readonly IRepository<House> houses;
        private readonly IRepository<User> users;

        public HousesService(IRepository<House> housesRepo, IRepository<User> usersRepo)
        {
            this.houses = housesRepo;
            this.users = usersRepo;
        }

        public IQueryable<House> GetAllHousesPaged(int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.houses
                .All()
                .OrderBy(h => h.HouseName)
                .ThenByDescending(ho => ho.Rooms.Count)
                .ThenBy(hou => hou.HouseLocation)
                .ThenBy(hous => hous.HouseDescription)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public IQueryable<House> GetHouse(int houseId)
        {
            return this.houses
                .All()
                .Where(u => u.HouseId == houseId);
        }

        public IQueryable<House> GetHousesPaged(int[] ids, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.houses
                .All()
                .Where(h => ids.Contains(h.HouseId))
                .OrderBy(h => h.HouseName)
                .ThenByDescending(ho => ho.Rooms.Count)
                .ThenBy(hou => hou.HouseLocation)
                .ThenBy(hous => hous.HouseDescription)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public bool AddUserToHouse(int houseId, string userId)
        {
            var house = this.GetHouse(houseId)
                .FirstOrDefault();

            var user = this.users
                .All()
                .Where(u => u.Email == userId)
                .FirstOrDefault();

            if (house == null || user == null)
            {
                return false;
            }

            house.Users.Add(user);

            this.houses.SaveChanges();
            
            return house.Users.Contains(user);
        }
    }
}