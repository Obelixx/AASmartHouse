namespace AAWebSmartHouse.WebApi
{
    using System.Data.Entity;
    using AAWebSmartHouse.Data;
    using AAWebSmartHouse.Data.Migrations;

    public static class DatabaseConfig
    {
        public static void Initialize()
        {
            // TODO: delete this: var config = new MySqlConfig();
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<AAWebSmartHouseDbContext, Configuration>());

            AAWebSmartHouseDbContext.Create().Database.Initialize(true);
        }
    }
}
