namespace AAWebSmartHouse.Data.Services.Contracts
{
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Common;
    using System.Linq;

    public interface IUsersService
    {
        IQueryable<user> All(int page = 1, int pageSize = GlobalConstants.DefaultPageSize);
    }
}
