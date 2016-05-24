namespace AAWebSmartHouse.Data.Services
{
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Data.Services.Contracts;

    public class RoomsService : IRoomsService
    {
        private readonly IRepository<Room> rooms;

        public RoomsService(IRepository<Room> housesRepo)
        {
            this.rooms = housesRepo;
        }

        public IQueryable<Room> GetAllRoomsPaged(int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.rooms
                .All()
                .OrderBy(r => r.RoomName)
                .ThenByDescending(ro => ro.Sensors.Count)
                .ThenBy(roo => roo.RoomId)
                .ThenBy(rooo => rooo.RoomDescription)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public IQueryable<Room> GetRoomsByHouseIdPaged(int houseId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.rooms
                .All()
                .Where(rw => rw.HouseId == houseId)
                .OrderBy(r => r.RoomName)
                .ThenByDescending(ro => ro.Sensors.Count)
                .ThenBy(roo => roo.RoomId)
                .ThenBy(rooo => rooo.RoomDescription)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }
    }
}