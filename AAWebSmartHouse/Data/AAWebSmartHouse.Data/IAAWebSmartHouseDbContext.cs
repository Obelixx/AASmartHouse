﻿namespace AAWebSmartHouse.Data
{
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;

    using AAWebSmartHouse.Data.Models;

    public interface IAAWebSmartHouseDbContext
    {
        IDbSet<House> Houses { get; set; }

        IDbSet<Room> Rooms { get; set; }

        IDbSet<SensorDataByDay> SensorDataByDays { get; set; }
        
        IDbSet<SensorDataByHour> SensorDataByHours { get; set; }

        IDbSet<SensorDataByMonth> SensorDataByMonths { get; set; }

        IDbSet<SensorDataByWeek> SensorDataByWeeks { get; set; }

        IDbSet<Sensor> Sensors { get; set; }

        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;

        void Dispose();

        int SaveChanges();
    }
}
