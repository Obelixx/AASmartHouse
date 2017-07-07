namespace AAWebSmartHouse.Data.Services.Contracts
{
    using System.Linq;
    using AAWebSmartHouse.Data.Models;

    public interface ISensorsService
    {
        IQueryable<Sensor> GetAllSensorsPaged(int page = 1, int pageSize = 10);

        IQueryable<Sensor> GetSensorById(int sensorId);

        IQueryable<Sensor> GetSensorsByRoomIdPaged(int roomId, int page = 1, int pageSize = 10);
    }
}