namespace AAWebSmartHouse.Data
{
    using System.Data.Entity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using AAWebSmartHouse.Data.Models;

    public partial class AAWebSmartHouseDbContext : IdentityDbContext<user>, IAAWebSmartHouseDbContext
    {
        public AAWebSmartHouseDbContext()
            : base("LocalMySQLConnection", throwIfV1Schema: false)
        {
        }

        public virtual IDbSet<house> houses { get; set; }
        public virtual IDbSet<room> rooms { get; set; }
        public virtual IDbSet<sensordatabyday> sensordatabydays { get; set; }
        public virtual IDbSet<sensordatabyhour> sensordatabyhours { get; set; }
        public virtual IDbSet<sensordatabymonth> sensordatabymonths { get; set; }
        public virtual IDbSet<sensordatabyweek> sensordatabyweeks { get; set; }
        public virtual IDbSet<sensor> sensors { get; set; }
        

        public static AAWebSmartHouseDbContext Create()
        {
            return new AAWebSmartHouseDbContext();
        }
    }
}
