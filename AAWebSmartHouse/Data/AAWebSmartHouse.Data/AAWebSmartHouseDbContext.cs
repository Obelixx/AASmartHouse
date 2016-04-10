namespace AAWebSmartHouse.Data
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;

    public class AAWebSmartHouseDbContext : IdentityDbContext<User>
    {
        public AAWebSmartHouseDbContext()
                : base("LocalMySQLConnection", throwIfV1Schema: false)
            {
        }

        public static AAWebSmartHouseDbContext Create()
        {
            return new AAWebSmartHouseDbContext();
        }
    }
}
