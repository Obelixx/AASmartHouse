namespace AAWebSmartHouse.Data.Models
{
    using System.Collections.Generic;

    public partial class Sensor
    {
        public Sensor()
        {
            this.SensorDataByDays = new List<SensorDataByDay>();
            this.SensorDataByHours = new List<SensorDataByHour>();
            this.SensorDataByMonths = new List<SensorDataByMonth>();
            this.SensorDataByWeeks = new List<SensorDataByWeek>();
        }
        
        public int SensorId { get; set; }

        public string SensorName { get; set; }

        public string SensorDescription { get; set; }

        public string SensorUnits { get; set; }

        public int RoomId { get; set; }

        public virtual Room Room { get; set; }

        public virtual ICollection<SensorDataByDay> SensorDataByDays { get; set; }

        public virtual ICollection<SensorDataByHour> SensorDataByHours { get; set; }

        public virtual ICollection<SensorDataByMonth> SensorDataByMonths { get; set; }

        public virtual ICollection<SensorDataByWeek> SensorDataByWeeks { get; set; }
    }
}
