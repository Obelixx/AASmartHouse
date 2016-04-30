namespace AAWebSmartHouse.Data.Models
{
    using System;

    public partial class SensorDataByHour
    {
        public int SensorDataByHourId { get; set; }

        public int SensorId { get; set; }

        public string SensorValue { get; set; }

        public DateTime SensorDataDateTime { get; set; }

        public virtual Sensor Sensor { get; set; }
    }
}