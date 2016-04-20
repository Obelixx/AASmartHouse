using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace AAWebSmartHouse.Models.Models.Mapping
{
    public class sensordatabydayMap : EntityTypeConfiguration<sensordatabyday>
    {
        public sensordatabydayMap()
        {
            // Primary Key
            this.HasKey(t => t.SensorDataByDayId);

            // Properties
            this.Property(t => t.SensorValue)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("sensordatabyday", "sql7112984");
            this.Property(t => t.SensorDataByDayId).HasColumnName("SensorDataByDayId");
            this.Property(t => t.SensorId).HasColumnName("SensorId");
            this.Property(t => t.SensorValue).HasColumnName("SensorValue");
            this.Property(t => t.SensorDataDateTime).HasColumnName("SensorDataDateTime");

            // Relationships
            this.HasRequired(t => t.sensor)
                .WithMany(t => t.sensordatabydays)
                .HasForeignKey(d => d.SensorId);

        }
    }
}
