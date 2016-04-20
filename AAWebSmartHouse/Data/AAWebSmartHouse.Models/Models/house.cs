using System;
using System.Collections.Generic;

namespace AAWebSmartHouse.Models.Models
{
    public partial class house
    {
        public house()
        {
            this.rooms = new List<room>();
        }

        public int HouseId { get; set; }
        public string HouseName { get; set; }
        public string HouseLocation { get; set; }
        public string HouseDescription { get; set; }
        public virtual ICollection<room> rooms { get; set; }
    }
}
