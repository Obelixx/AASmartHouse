using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace AAWebSmartHouse.Models.Models.Mapping
{
    public class sensordatabymonthMap : EntityTypeConfiguration<sensordatabymonth>
    {
        public sensordatabymonthMap()
        {
            // Primary Key
            this.HasKey(t => t.SensorDataByMonthId);

            // Properties
            this.Property(t => t.SensorValue)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("sensordatabymonth", "sql7112984");
            this.Property(t => t.SensorDataByMonthId).HasColumnName("SensorDataByMonthId");
            this.Property(t => t.SensorId).HasColumnName("SensorId");
            this.Property(t => t.SensorValue).HasColumnName("SensorValue");
            this.Property(t => t.SensorDataDateTime).HasColumnName("SensorDataDateTime");

            // Relationships
            this.HasRequired(t => t.sensor)
                .WithMany(t => t.sensordatabymonths)
                .HasForeignKey(d => d.SensorId);

        }
    }
}
