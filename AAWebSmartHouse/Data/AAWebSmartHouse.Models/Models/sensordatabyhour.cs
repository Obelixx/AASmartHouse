using System;
using System.Collections.Generic;

namespace AAWebSmartHouse.Models.Models
{
    public partial class sensordatabyhour
    {
        public int SensorDataByHourId { get; set; }
        public int SensorId { get; set; }
        public string SensorValue { get; set; }
        public System.DateTime SensorDataDateTime { get; set; }
        public virtual sensor sensor { get; set; }
    }
}