namespace AAWebSmartHouse.Data.Migrations
{
    using System.Data.Entity.Migrations;
    using System.Linq;

    using AAWebSmartHouse.Common;
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

            if (!context.Roles.Any(r => r.Name == AdminUser.Name))
            {
                context.Roles.AddOrUpdate(
                    new IdentityRole[]
                    {
                        new IdentityRole(AdminUser.Name),
                        //// new IdentityRole("User")
                    });

                context.SaveChanges();
            }

            var databaseRole = context.Roles.Where(ro => ro.Name == AdminUser.Name).FirstOrDefault();
            
            // Adding admin user..
            if (!context.Users.Any(u => u.UserName == AdminUser.UserName))
            {
                User user = new User();

                string passwordHash = new PasswordHasher().HashPassword(AdminUser.Password);
                user.PasswordHash = passwordHash;
                user.FirstName = AdminUser.UserName;
                user.LastName = AdminUser.UserName;
                user.Email = AdminUser.UserName;
                user.UserName = AdminUser.UserName;
                user.EmailConfirmed = true;
                user.PhoneNumberConfirmed = true;

                context.Users.AddOrUpdate(user);

                context.SaveChanges();

                var databaseUser = context.Users.Where(u => u.UserName == AdminUser.UserName).FirstOrDefault();

                var userRoleRelation = new IdentityUserRole() { UserId = databaseUser.Id, RoleId = databaseRole.Id };

                databaseUser.Roles.Add(userRoleRelation);

                context.SaveChanges();
            }
            
            UserStore<User> userStore = new UserStore<User>(context);
            UserManager<User> userManager = new UserManager<User>(userStore);
            
            string userId = context.Users.Where(x => x.Email == AdminUser.UserName && string.IsNullOrEmpty(x.SecurityStamp)).Select(x => x.Id).FirstOrDefault();

            if (!string.IsNullOrEmpty(userId))
            {
                userManager.UpdateSecurityStamp(userId);
            }

            // Adding simple user..
            if (!context.Users.Any(u => u.UserName == SimpleUser.UserName))
            {
                User user = new User();

                string passwordHash = new PasswordHasher().HashPassword(SimpleUser.Password);
                user.PasswordHash = passwordHash;
                user.FirstName = SimpleUser.UserName;
                user.LastName = SimpleUser.UserName;
                user.Email = SimpleUser.UserName;
                user.UserName = SimpleUser.UserName;
                user.EmailConfirmed = true;
                user.PhoneNumberConfirmed = true;

                context.Users.AddOrUpdate(user);

                context.SaveChanges();               
            }
        }
    }
}
