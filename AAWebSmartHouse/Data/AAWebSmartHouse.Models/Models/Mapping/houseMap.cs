using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace AAWebSmartHouse.Models.Models.Mapping
{
    public partial class houseMap : EntityTypeConfiguration<house>
    {
        public houseMap()
        {
            // Table & Column Mappings
            this.ToTable("houses", "sql7112984");
            this.Property(t => t.HouseId).HasColumnName("HouseId");
            this.Property(t => t.HouseName).HasColumnName("HouseName");
            this.Property(t => t.HouseLocation).HasColumnName("HouseLocation");
            this.Property(t => t.HouseDescription).HasColumnName("HouseDescription");
        }
    }
}
