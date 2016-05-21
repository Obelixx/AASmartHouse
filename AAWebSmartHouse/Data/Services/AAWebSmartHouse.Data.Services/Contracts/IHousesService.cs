namespace AAWebSmartHouse.Data.Services.Contracts
{
    using System.Linq;
    using AAWebSmartHouse.Data.Models;

    public interface IHousesService
    {
        IQueryable<House> GetAllHousesPaged(int page = 1, int pageSize = 10);

        IQueryable<House> GetHouse(int houseId);

        IQueryable<House> GetHousesPaged(int[] ids, int page = 1, int pageSize = 10);
    }
}