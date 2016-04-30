namespace AAWebSmartHouse.Data
{
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;

    using AAWebSmartHouse.Data.Models;

    public interface IAAWebSmartHouseDbContext
    {
        IDbSet<house> houses { get; set; }
        IDbSet<room> rooms { get; set; }
        IDbSet<sensordatabyday> sensordatabydays { get; set; }
        IDbSet<sensordatabyhour> sensordatabyhours { get; set; }
        IDbSet<sensordatabymonth> sensordatabymonths { get; set; }
        IDbSet<sensordatabyweek> sensordatabyweeks { get; set; }
        IDbSet<sensor> sensors { get; set; }

        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;

        void Dispose();

        int SaveChanges();
    }
}
