using System;
using System.Collections.Generic;

namespace AAWebSmartHouse.Models.Models
{
    public partial class room
    {
        public room()
        {
            this.sensors = new List<sensor>();
        }

        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string RoomDescription { get; set; }
        public int HouseId { get; set; }
        public virtual house house { get; set; }
        public virtual ICollection<sensor> sensors { get; set; }
    }
}
