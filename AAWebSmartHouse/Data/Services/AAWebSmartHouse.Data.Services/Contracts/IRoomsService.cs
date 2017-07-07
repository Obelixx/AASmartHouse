namespace AAWebSmartHouse.Data.Services.Contracts
{
    using System.Linq;
    using AAWebSmartHouse.Data.Models;

    public interface IRoomsService
    {
        IQueryable<Room> GetAllRoomsPaged(int page = 1, int pageSize = 10);

        IQueryable<Room> GetRoomById(int roomId);

        IQueryable<Room> GetRoomsByHouseIdPaged(int houseId, int page = 1, int pageSize = 10);
    }
}