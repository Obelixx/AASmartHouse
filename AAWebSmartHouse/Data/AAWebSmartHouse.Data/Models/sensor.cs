namespace AAWebSmartHouse.Data.Models
{
    using System.Collections.Generic;

    public partial class Sensor
    {
        public Sensor()
        {
            this.SensorValues = new List<SensorValue>();
        }
        
        public int SensorId { get; set; }

        public int ControlerNumber { get; set; }

        public string SensorName { get; set; }

        public string SensorDescription { get; set; }

        public string SensorUnits { get; set; }

        public bool Registerd { get; set; }

        public int RoomId { get; set; }

        public virtual Room Room { get; set; }

        public virtual ICollection<SensorValue> SensorValues { get; set; }
    }
}
