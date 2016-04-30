namespace AAWebSmartHouse.Data.Services.Contracts
{
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;

    public interface IUsersService
    {
        IQueryable<User> All(int page = 1, int pageSize = GlobalConstants.DefaultPageSize);
    }
}
