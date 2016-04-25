namespace AAWebSmartHouse.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class sensor
    {
        public sensor()
        {
            this.sensordatabydays = new List<sensordatabyday>();
            this.sensordatabyhours = new List<sensordatabyhour>();
            this.sensordatabymonths = new List<sensordatabymonth>();
            this.sensordatabyweeks = new List<sensordatabyweek>();
        }
        
        public int SensorId { get; set; }
        public string SensorName { get; set; }
        public string SensorDescription { get; set; }
        public string SensorUnits { get; set; }
        public int RoomId { get; set; }
        public virtual room room { get; set; }
        public virtual ICollection<sensordatabyday> sensordatabydays { get; set; }
        public virtual ICollection<sensordatabyhour> sensordatabyhours { get; set; }
        public virtual ICollection<sensordatabymonth> sensordatabymonths { get; set; }
        public virtual ICollection<sensordatabyweek> sensordatabyweeks { get; set; }
    }
}
