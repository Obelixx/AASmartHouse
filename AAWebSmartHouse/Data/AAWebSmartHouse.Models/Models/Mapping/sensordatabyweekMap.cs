using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace AAWebSmartHouse.Models.Models.Mapping
{
    public class sensordatabyweekMap : EntityTypeConfiguration<sensordatabyweek>
    {
        public sensordatabyweekMap()
        {
            // Primary Key
            this.HasKey(t => t.SensorDataByWeekId);

            // Properties
            this.Property(t => t.SensorValue)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("sensordatabyweek", "sql7112984");
            this.Property(t => t.SensorDataByWeekId).HasColumnName("SensorDataByWeekId");
            this.Property(t => t.SensorId).HasColumnName("SensorId");
            this.Property(t => t.SensorValue).HasColumnName("SensorValue");
            this.Property(t => t.SensorDataDateTime).HasColumnName("SensorDataDateTime");

            // Relationships
            this.HasRequired(t => t.sensor)
                .WithMany(t => t.sensordatabyweeks)
                .HasForeignKey(d => d.SensorId);

        }
    }
}
