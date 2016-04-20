using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace AAWebSmartHouse.Models.Models.Mapping
{
    public class roomMap : EntityTypeConfiguration<room>
    {
        public roomMap()
        {
            // Primary Key
            this.HasKey(t => t.RoomId);

            // Properties
            this.Property(t => t.RoomName)
                .IsRequired()
                .HasMaxLength(45);

            this.Property(t => t.RoomDescription)
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("rooms", "sql7112984");
            this.Property(t => t.RoomId).HasColumnName("RoomId");
            this.Property(t => t.RoomName).HasColumnName("RoomName");
            this.Property(t => t.RoomDescription).HasColumnName("RoomDescription");
            this.Property(t => t.HouseId).HasColumnName("HouseId");

            // Relationships
            this.HasRequired(t => t.house)
                .WithMany(t => t.rooms)
                .HasForeignKey(d => d.HouseId);

        }
    }
}
