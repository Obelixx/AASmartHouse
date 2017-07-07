namespace AAWebSmartHouse.Data
{
    using System;
    using System.Data.Entity.Infrastructure;
    using System.Linq;

    public interface IRepository<T> : IDisposable where T : class
    {
        IQueryable<T> All();

        //string GetDatabaseName();

        IQueryable<T> CustomQuery(string sqlQuery, params object[] arguments);

        IQueryable<Y> CustomQuery<Y>(string sqlQuery, params object[] arguments);

        T GetById(object id);

        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);

        void Delete(object id);

        T Attach(T entity);

        void Detach(T entity);

        int SaveChanges();
    }
}
