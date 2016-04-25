namespace AAWebSmartHouse.Data
{
    using System.Data.Entity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using AAWebSmartHouse.Data.Models;

    public partial class AAWebSmartHouseDbContext : IdentityDbContext<user>
    {
        public AAWebSmartHouseDbContext()
            : base("LocalMySQLConnection", throwIfV1Schema: false)
        {
        }

        public DbSet<house> houses { get; set; }
        public DbSet<room> rooms { get; set; }
        public DbSet<sensordatabyday> sensordatabydays { get; set; }
        public DbSet<sensordatabyhour> sensordatabyhours { get; set; }
        public DbSet<sensordatabymonth> sensordatabymonths { get; set; }
        public DbSet<sensordatabyweek> sensordatabyweeks { get; set; }
        public DbSet<sensor> sensors { get; set; }
        

        public static AAWebSmartHouseDbContext Create()
        {
            return new AAWebSmartHouseDbContext();
        }
    }
}
