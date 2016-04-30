namespace AAWebSmartHouse.Data.Models
{
    using System;

    public partial class SensorDataByDay
    {
        public int SensorDataByDayId { get; set; }

        public int SensorId { get; set; }

        public string SensorValue { get; set; }

        public DateTime SensorDataDateTime { get; set; }

        public virtual Sensor Sensor { get; set; }
    }
}
