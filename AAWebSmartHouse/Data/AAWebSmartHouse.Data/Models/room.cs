namespace AAWebSmartHouse.Data.Models
{
    using System.Collections.Generic;

    public partial class Room
    {
        public Room()
        {
            this.Sensors = new List<Sensor>();
        }
        
        public int RoomId { get; set; }

        public string RoomName { get; set; }

        public string RoomDescription { get; set; }

        public int HouseId { get; set; }

        public virtual House House { get; set; }

        public virtual ICollection<Sensor> Sensors { get; set; }
    }
}
