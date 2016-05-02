namespace AAWebSmartHouse.Data.Migrations
{
    using System.Data.Entity.Migrations;
    using System.Linq;

    using AAWebSmartHouse.Data.Models;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

    public sealed class Configuration : DbMigrationsConfiguration<AAWebSmartHouseDbContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
            this.CodeGenerator = new MySql.Data.Entity.MySqlMigrationCodeGenerator();
            
            // register mysql code generator
            this.SetSqlGenerator("MySql.Data.MySqlClient", new MySql.Data.Entity.MySqlMigrationSqlGenerator());
        }

        protected override void Seed(AAWebSmartHouseDbContext context)
        {
            ////  This method will be called after migrating to the latest version.

            ////  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            ////  to avoid creating duplicate seed data. E.g.
            ////
            ////    context.People.AddOrUpdate(
            ////      p => p.FullName,
            ////      new Person { FullName = "Andrew Peters" },
            ////      new Person { FullName = "Brice Lambson" },
            ////      new Person { FullName = "Rowan Miller" }
            ////    );

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                context.Roles.AddOrUpdate(
                    new IdentityRole[] 
                    {
                        new IdentityRole("Admin"),
                        //new IdentityRole("User")
                    });

                context.SaveChanges();
            }

            var databaseRole = context.Roles.Where(ro => ro.Name == "Admin").FirstOrDefault();

            if (!context.Users.Any(u => u.UserName == "admin"))
            {
                User user = new User();

                string passwordHash = new PasswordHasher().HashPassword("adminPassword");
                user.PasswordHash = passwordHash;
                user.FirstName = "admin";
                user.LastName = "admin";
                user.Email = "admin";
                user.UserName = "admin";
                user.EmailConfirmed = true;
                user.PhoneNumberConfirmed = true;

                context.Users.AddOrUpdate(user);

                context.SaveChanges();

                var databaseUser = context.Users.Where(u => u.UserName == "admin").FirstOrDefault();

                var userRoleRelation = new IdentityUserRole() { UserId = databaseUser.Id, RoleId = databaseRole.Id };

                databaseUser.Roles.Add(userRoleRelation);

                context.SaveChanges();
            }
        }
    }
}
