namespace AAWebSmartHouse.Data.Services.Contracts
{
    using System.Linq;
    using AAWebSmartHouse.Data.Models;

    public interface ISensorsDataService
    {
        IQueryable<SensorDataByDay> GetSensorDataByDayPaged(int sensorId, int page = 1, int pageSize = 10);
        IQueryable<SensorDataByHour> GetSensorDataByHourPaged(int sensorId, int page = 1, int pageSize = 10);
        IQueryable<SensorDataByMonth> GetSensorDataByMonthPaged(int sensorId, int page = 1, int pageSize = 10);
        IQueryable<SensorDataByWeek> GetSensorDataByWeekPaged(int sensorId, int page = 1, int pageSize = 10);
    }
}