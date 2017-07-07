namespace AAWebSmartHouse.Data.Services.Contracts
{
    using System.Linq;
    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;

    public interface ISensorValuesService
    {
        IQueryable<SensorValue> GetSensorValueById(int sensorValueId);

        IQueryable<SensorValue> GetSensorValuesPagedOrderdAndAgregated(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize, bool orderAscendingByDate = false, SensorAggregationType agregation = SensorAggregationType.ByHour);

        int GetSensorValuesCountByAggregation(int sensorId, SensorAggregationType agregation = SensorAggregationType.ByHour);
    }
}