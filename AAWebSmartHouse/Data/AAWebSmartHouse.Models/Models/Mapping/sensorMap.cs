using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace AAWebSmartHouse.Models.Models.Mapping
{
    public class sensorMap : EntityTypeConfiguration<sensor>
    {
        public sensorMap()
        {
            // Primary Key
            this.HasKey(t => t.SensorId);

            // Properties
            this.Property(t => t.SensorName)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.SensorDescription)
                .HasMaxLength(500);

            this.Property(t => t.SensorUnits)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("sensors", "sql7112984");
            this.Property(t => t.SensorId).HasColumnName("SensorId");
            this.Property(t => t.SensorName).HasColumnName("SensorName");
            this.Property(t => t.SensorDescription).HasColumnName("SensorDescription");
            this.Property(t => t.SensorUnits).HasColumnName("SensorUnits");
            this.Property(t => t.RoomId).HasColumnName("RoomId");

            // Relationships
            this.HasRequired(t => t.room)
                .WithMany(t => t.sensors)
                .HasForeignKey(d => d.RoomId);

        }
    }
}
