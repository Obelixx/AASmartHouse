namespace AAWebSmartHouse.Data.Services.Contracts
{
    using System.Linq;
    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;

    public interface ISensorValuesService
    {
        IQueryable<SensorValue> GetSensorValuesPaged(int sensorId, int page = 1, int pageSize = 10);

        IQueryable<SensorValue> GetSensorValuesPagedOrderdAndFiltered(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize, bool orderAscendingByDate = false, SensorAggregationType agregation = SensorAggregationType.ByHour);
    }
}