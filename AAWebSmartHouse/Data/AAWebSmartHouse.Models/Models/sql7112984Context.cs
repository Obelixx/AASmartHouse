using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using AAWebSmartHouse.Models.Models.Mapping;

namespace AAWebSmartHouse.Models.Models
{
    public partial class sql7112984Context : DbContext
    {
        static sql7112984Context()
        {
            Database.SetInitializer<sql7112984Context>(null);
        }

        public sql7112984Context()
            : base("Name=sql7112984Context")
        {
        }

        public DbSet<house> houses { get; set; }
        public DbSet<room> rooms { get; set; }
        public DbSet<sensordatabyday> sensordatabydays { get; set; }
        public DbSet<sensordatabyhour> sensordatabyhours { get; set; }
        public DbSet<sensordatabymonth> sensordatabymonths { get; set; }
        public DbSet<sensordatabyweek> sensordatabyweeks { get; set; }
        public DbSet<sensor> sensors { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new houseMap());
            modelBuilder.Configurations.Add(new roomMap());
            modelBuilder.Configurations.Add(new sensordatabydayMap());
            modelBuilder.Configurations.Add(new sensordatabyhourMap());
            modelBuilder.Configurations.Add(new sensordatabymonthMap());
            modelBuilder.Configurations.Add(new sensordatabyweekMap());
            modelBuilder.Configurations.Add(new sensorMap());
        }
    }
}
