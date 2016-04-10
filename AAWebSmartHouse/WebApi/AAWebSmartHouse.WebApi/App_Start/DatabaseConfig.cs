namespace AAWebSmartHouse.WebApi
{
    using Data;
    using Data.Migrations;
    using System.Data.Entity;

    public static class DatabaseConfig
    {
        public static void Initialize()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<AAWebSmartHouseDbContext, Configuration>());

            AAWebSmartHouseDbContext.Create().Database.Initialize(true);
        }
    }
}
