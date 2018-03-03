namespace AAWebSmartHouse.DataGenerator
{
    using System;
    using AAWebSmartHouse.Data;
    using AAWebSmartHouse.Data.Models;

    class DemoData
    {
        static void Main(string[] args)
        {
            Console.WriteLine("sensorId = ");
            var sensorid = int.Parse(Console.ReadLine());
            Console.WriteLine("How much sensorValues to add = ");
            var count = int.Parse(Console.ReadLine());

            var db = new AAWebSmartHouseDbContext();
            SensorValueGenerator svg = new SensorValueGenerator(new EfGenericRepository<Sensor>(db));

            Console.WriteLine(new string('=',count/1000));
            if (count > 1000)
            {
                while (count > 0)
                {
                    if (count < 1000)
                    {
                        svg.AddRandomSensorValue(count, sensorid);
                        count -= count;
                        Console.WriteLine();
                        Console.WriteLine("Done!");
                        Console.ReadKey();
                    }
                    else
                    {
                        svg.AddRandomSensorValue(1000, sensorid);
                        count -= 1000;
                        Console.Write('+');
                    }
                }
            }
        }
    }
}
