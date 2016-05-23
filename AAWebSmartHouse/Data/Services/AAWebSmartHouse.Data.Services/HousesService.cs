namespace AAWebSmartHouse.Data.Services
{
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Data.Services.Contracts;

    public class HousesService : IHousesService
    {
        private readonly IRepository<House> houses;

        public HousesService(IRepository<House> housesRepo)
        {
            this.houses = housesRepo;
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
    }
}