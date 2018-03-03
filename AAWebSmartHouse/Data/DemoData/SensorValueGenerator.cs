namespace AAWebSmartHouse.DataGenerator
{
    using System;
    using System.Linq;
    using AAWebSmartHouse.Data;
    using AAWebSmartHouse.Data.Models;

    class SensorValueGenerator
    {
        private readonly IRepository<Sensor> sensors;

        public SensorValueGenerator(IRepository<Sensor> sensors)
        {
            this.sensors = sensors;
        }

        public void AddRandomSensorValue(int numberOfValuesToAdd, int sensorId)
        {
            var r = RandomGenerator.Instance;

            var sensor = this.sensors.All().Where(s => s.SensorId == sensorId).FirstOrDefault();
            var lastSensorValue = sensor.SensorValues.OrderByDescending(sv => sv.SensorValueDateTime).FirstOrDefault();
            DateTime lastSensorValueDateTime;
            if (lastSensorValue !=null)
            {
                lastSensorValueDateTime = lastSensorValue.SensorValueDateTime;
            }
            else
            {
                lastSensorValueDateTime = new DateTime(2015, 1, 1);
            }

            var newDateTime = lastSensorValueDateTime;

            for (int i = 0; i < numberOfValuesToAdd; i++)
            {
                newDateTime = newDateTime.AddHours(1);

                sensor.SensorValues.Add(new SensorValue()
                {
                    SensorId = sensorId,
                    SensorValueDateTime = newDateTime,
                    Value = r.GetRandomNumber(-5, 30)
                });
            }

            sensors.SaveChanges();
        }
    }
}
