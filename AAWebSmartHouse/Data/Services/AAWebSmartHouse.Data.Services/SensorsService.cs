namespace AAWebSmartHouse.Data.Services
{
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Data.Services.Contracts;

    public class SensorsService : ISensorsService
    {
        private readonly IRepository<Sensor> sensors;

        public SensorsService(IRepository<Sensor> sensorsRepo)
        {
            this.sensors = sensorsRepo;
        }

        public IQueryable<Sensor> GetAllSensorsPaged(int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.sensors
                .All()
                .OrderBy(s => s.SensorName)
                .ThenBy(se => se.SensorId)
                .ThenBy(sen => sen.SensorDescription)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public IQueryable<Sensor> GetSensorsByRoomIdPaged(int roomId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.sensors
                .All()
                .Where(sw => sw.RoomId == roomId)
                .OrderBy(s => s.SensorName)
                .ThenBy(se => se.SensorId)
                .ThenBy(sen => sen.SensorDescription)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }
    }
}
