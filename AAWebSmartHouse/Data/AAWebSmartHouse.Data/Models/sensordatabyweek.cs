namespace AAWebSmartHouse.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public partial class sensordatabyweek
    {
        public int SensorDataByWeekId { get; set; }
        public int SensorId { get; set; }
        public string SensorValue { get; set; }
        public DateTime SensorDataDateTime { get; set; }
        public virtual sensor sensor { get; set; }
    }
}
