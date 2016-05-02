namespace AAWebSmartHouse.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        

        public override void Up()
        {
            //CreateTable(
            //    "Houses",
            //    c => new
            //        {
            //            HouseId = c.Int(nullable: false, identity: true),
            //            HouseName = c.String(unicode: false),
            //            HouseLocation = c.String(unicode: false),
            //            HouseDescription = c.String(unicode: false),
            //        })
            //    .PrimaryKey(t => t.HouseId)                ;
            
            //CreateTable(
            //    "Rooms",
            //    c => new
            //        {
            //            RoomId = c.Int(nullable: false, identity: true),
            //            RoomName = c.String(unicode: false),
            //            RoomDescription = c.String(unicode: false),
            //            HouseId = c.Int(nullable: false),
            //        })
            //    .PrimaryKey(t => t.RoomId)                
            //    .ForeignKey("Houses", t => t.HouseId, cascadeDelete: true)
            //    .Index(t => t.HouseId);
            
            //CreateTable(
            //    "Sensors",
            //    c => new
            //        {
            //            SensorId = c.Int(nullable: false, identity: true),
            //            SensorName = c.String(unicode: false),
            //            SensorDescription = c.String(unicode: false),
            //            SensorUnits = c.String(unicode: false),
            //            RoomId = c.Int(nullable: false),
            //        })
            //    .PrimaryKey(t => t.SensorId)                
            //    .ForeignKey("Rooms", t => t.RoomId, cascadeDelete: true)
            //    .Index(t => t.RoomId);
            
            //CreateTable(
            //    "SensorDataByDays",
            //    c => new
            //        {
            //            SensorDataByDayId = c.Int(nullable: false, identity: true),
            //            SensorId = c.Int(nullable: false),
            //            SensorValue = c.String(unicode: false),
            //            SensorDataDateTime = c.DateTime(nullable: false, precision: 0),
            //        })
            //    .PrimaryKey(t => t.SensorDataByDayId)                
            //    .ForeignKey("Sensors", t => t.SensorId, cascadeDelete: true)
            //    .Index(t => t.SensorId);
            
            //CreateTable(
            //    "SensorDataByHours",
            //    c => new
            //        {
            //            SensorDataByHourId = c.Int(nullable: false, identity: true),
            //            SensorId = c.Int(nullable: false),
            //            SensorValue = c.String(unicode: false),
            //            SensorDataDateTime = c.DateTime(nullable: false, precision: 0),
            //        })
            //    .PrimaryKey(t => t.SensorDataByHourId)                
            //    .ForeignKey("Sensors", t => t.SensorId, cascadeDelete: true)
            //    .Index(t => t.SensorId);
            
            //CreateTable(
            //    "SensorDataByMonths",
            //    c => new
            //        {
            //            SensorDataByMonthId = c.Int(nullable: false, identity: true),
            //            SensorId = c.Int(nullable: false),
            //            SensorValue = c.String(unicode: false),
            //            SensorDataDateTime = c.DateTime(nullable: false, precision: 0),
            //        })
            //    .PrimaryKey(t => t.SensorDataByMonthId)                
            //    .ForeignKey("Sensors", t => t.SensorId, cascadeDelete: true)
            //    .Index(t => t.SensorId);
            
            //CreateTable(
            //    "SensorDataByWeeks",
            //    c => new
            //        {
            //            SensorDataByWeekId = c.Int(nullable: false, identity: true),
            //            SensorId = c.Int(nullable: false),
            //            SensorValue = c.String(unicode: false),
            //            SensorDataDateTime = c.DateTime(nullable: false, precision: 0),
            //        })
            //    .PrimaryKey(t => t.SensorDataByWeekId)                
            //    .ForeignKey("Sensors", t => t.SensorId, cascadeDelete: true)
            //    .Index(t => t.SensorId);
            
            CreateTable(
                "AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        FirstName = c.String(maxLength: 50, storeType: "nvarchar"),
                        LastName = c.String(maxLength: 50, storeType: "nvarchar"),
                        Email = c.String(maxLength: 256, storeType: "nvarchar"),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(unicode: false),
                        SecurityStamp = c.String(unicode: false),
                        PhoneNumber = c.String(unicode: false),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(precision: 0),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => t.Id)                
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        ClaimType = c.String(unicode: false),
                        ClaimValue = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id)                
                .ForeignKey("AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        ProviderKey = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        UserId = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })                
                .ForeignKey("AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        RoleId = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })                
                .ForeignKey("AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        Name = c.String(nullable: false, maxLength: 256, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => t.Id)                
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "UserHouses",
                c => new
                    {
                        User_Id = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        House_HouseId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.User_Id, t.House_HouseId })                
                .ForeignKey("AspNetUsers", t => t.User_Id, cascadeDelete: true)
                .ForeignKey("Houses", t => t.House_HouseId, cascadeDelete: true)
                .Index(t => t.User_Id)
                .Index(t => t.House_HouseId);
            
        }

        public override void Down()
        {
            DropForeignKey("AspNetUserRoles", "RoleId", "AspNetRoles");
            DropForeignKey("AspNetUserRoles", "UserId", "AspNetUsers");
            DropForeignKey("AspNetUserLogins", "UserId", "AspNetUsers");
            DropForeignKey("UserHouses", "House_HouseId", "Houses");
            DropForeignKey("UserHouses", "User_Id", "AspNetUsers");
            DropForeignKey("AspNetUserClaims", "UserId", "AspNetUsers");
            DropForeignKey("SensorDataByWeeks", "SensorId", "Sensors");
            DropForeignKey("SensorDataByMonths", "SensorId", "Sensors");
            DropForeignKey("SensorDataByHours", "SensorId", "Sensors");
            DropForeignKey("SensorDataByDays", "SensorId", "Sensors");
            DropForeignKey("Sensors", "RoomId", "Rooms");
            DropForeignKey("Rooms", "HouseId", "Houses");
            DropIndex("UserHouses", new[] { "House_HouseId" });
            DropIndex("UserHouses", new[] { "User_Id" });
            DropIndex("AspNetRoles", "RoleNameIndex");
            DropIndex("AspNetUserRoles", new[] { "RoleId" });
            DropIndex("AspNetUserRoles", new[] { "UserId" });
            DropIndex("AspNetUserLogins", new[] { "UserId" });
            DropIndex("AspNetUserClaims", new[] { "UserId" });
            DropIndex("AspNetUsers", "UserNameIndex");
            DropIndex("SensorDataByWeeks", new[] { "SensorId" });
            DropIndex("SensorDataByMonths", new[] { "SensorId" });
            DropIndex("SensorDataByHours", new[] { "SensorId" });
            DropIndex("SensorDataByDays", new[] { "SensorId" });
            DropIndex("Sensors", new[] { "RoomId" });
            DropIndex("Rooms", new[] { "HouseId" });
            DropTable("UserHouses");
            DropTable("AspNetRoles");
            DropTable("AspNetUserRoles");
            DropTable("AspNetUserLogins");
            DropTable("AspNetUserClaims");
            DropTable("AspNetUsers");
            DropTable("SensorDataByWeeks");
            DropTable("SensorDataByMonths");
            DropTable("SensorDataByHours");
            DropTable("SensorDataByDays");
            DropTable("Sensors");
            DropTable("Rooms");
            DropTable("Houses");
        }
    }
}
