namespace AAWebSmartHouse.Data
{
    using System.Data.Entity;

    using AAWebSmartHouse.Data.Models;
    using Microsoft.AspNet.Identity.EntityFramework;

    public partial class AAWebSmartHouseDbContext : IdentityDbContext<User>, IAAWebSmartHouseDbContext
    {
        public AAWebSmartHouseDbContext()
            : base("LocalMySQLConnection", throwIfV1Schema: false)
        {
        }

        public virtual IDbSet<House> Houses { get; set; }

        public virtual IDbSet<Room> Rooms { get; set; }

        public virtual IDbSet<SensorDataByDay> SensorDataByDays { get; set; }

        public virtual IDbSet<SensorDataByHour> SensorDataByHours { get; set; }

        public virtual IDbSet<SensorDataByMonth> SensorDataByMonths { get; set; }

        public virtual IDbSet<SensorDataByWeek> SensorDataByWeeks { get; set; }

        public virtual IDbSet<Sensor> Sensors { get; set; }
        
        public static AAWebSmartHouseDbContext Create()
        {
            return new AAWebSmartHouseDbContext();
        }
    }
}
