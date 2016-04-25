namespace AAWebSmartHouse.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public partial class sensordatabyday
    {
        public int SensorDataByDayId { get; set; }
        public int SensorId { get; set; }
        public string SensorValue { get; set; }
        public DateTime SensorDataDateTime { get; set; }
        public virtual sensor sensor { get; set; }
    }
}
