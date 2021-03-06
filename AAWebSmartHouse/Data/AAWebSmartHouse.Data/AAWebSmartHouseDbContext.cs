﻿namespace AAWebSmartHouse.Data
{
    using System.Linq;
    using System.Data.Entity;

    using AAWebSmartHouse.Data.Models;
    using Microsoft.AspNet.Identity.EntityFramework;

    public partial class AAWebSmartHouseDbContext : IdentityDbContext<User>, IAAWebSmartHouseDbContext
    {
        public AAWebSmartHouseDbContext()
            : base("LocalMySQLConnection", throwIfV1Schema: false)
        {
            this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        public virtual IDbSet<House> Houses { get; set; }

        public virtual IDbSet<Room> Rooms { get; set; }

        public virtual IDbSet<SensorValue> SensorValues { get; set; }

        public virtual IDbSet<Sensor> Sensors { get; set; }
        
        public static AAWebSmartHouseDbContext Create()
        {
            return new AAWebSmartHouseDbContext();
        }
    }
}
