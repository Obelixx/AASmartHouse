namespace AAWebSmartHouse.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;
    
    public partial class SensorValue
    {
        public int SensorValueId { get; set; }

        public int SensorId { get; set; }

        public double Value { get; set; }

        public DateTime SensorValueDateTime { get; set; }

        public virtual Sensor Sensor { get; set; }
    }
}
