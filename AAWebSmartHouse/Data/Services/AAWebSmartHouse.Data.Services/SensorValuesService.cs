namespace AAWebSmartHouse.Data.Services
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Data.Services.Contracts;

    public class SensorValuesService : ISensorValuesService
    {
        private readonly IRepository<SensorValue> sensorData;

        public SensorValuesService(
            IRepository<SensorValue> sensorDataRepo)
        {
            this.sensorData = sensorDataRepo;
        }

        public IQueryable<SensorValue> GetSensorValueById(int sensorValueId)
        {
            return this.sensorData
                .All()
                .Where(u => u.SensorValueId == sensorValueId);
        }

        //filter and agregate(day/week/month)
        public IQueryable<SensorValue> GetSensorValuesPagedOrderdAndAgregated(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize, bool orderAscendingByDate = false, SensorAggregationType aggregation = SensorAggregationType.ByHour)
        {
            var query = this.sensorData.All();
            var parmSensorId = new MySql.Data.MySqlClient.MySqlParameter("@SensorId", sensorId);
            var parmTake = new MySql.Data.MySqlClient.MySqlParameter("@take", pageSize);
            var parmSkip = new MySql.Data.MySqlClient.MySqlParameter("@skip", (page - 1) * pageSize);

            switch (aggregation)
            {
                case SensorAggregationType.ByHour:
                    query = query.Where(s => s.SensorId == sensorId);
                    if (orderAscendingByDate)
                    {
                        query = query.OrderBy(it => it.SensorValueDateTime);
                    }
                    else
                    {
                        query = query.OrderByDescending(it => it.SensorValueDateTime);
                    }
                    return query.Skip((page - 1) * pageSize).Take(pageSize);
                case SensorAggregationType.ByDay:
                    return this.sensorData
                        .CustomQuery(@"SELECT year(`SensorValueDateTime`) * 10000 + month(`SensorValueDateTime`) * 100 + day(`SensorValueDateTime`) as `SensorValueId`,avg(`Value`) as `Value`,`SensorId`,`SensorValueDateTime`
FROM `sensorvalues`
WHERE `SensorId` = @SensorId
GROUP BY year(`SensorValueDateTime`) * 10000 + month(`SensorValueDateTime`) * 100 + day(`SensorValueDateTime`)
ORDER BY SensorValueDateTime" + (orderAscendingByDate ? "" : " desc") + @"
LIMIT @skip, @take", parmSensorId, parmSkip, parmTake);
                case SensorAggregationType.ByWeek:
                    return this.sensorData
                        .CustomQuery(@"SELECT year(`SensorValueDateTime`) * 100 +  weekofyear(`SensorValueDateTime`) as `SensorValueId`,avg(`Value`) as `Value`,`SensorId`,`SensorValueDateTime`
FROM `sensorvalues`
WHERE `SensorId` = @SensorId
GROUP BY year(`SensorValueDateTime`) * 100 +  weekofyear(`SensorValueDateTime`)
ORDER BY SensorValueDateTime" + (orderAscendingByDate ? "" : " desc") + @"
LIMIT @skip, @take", parmSensorId, parmSkip, parmTake);
                case SensorAggregationType.ByMonth:
                    return this.sensorData
                        .CustomQuery(@"SELECT year(`SensorValueDateTime`) * 100 + month(`SensorValueDateTime`) as `SensorValueId`,avg(`Value`) as `Value`,`SensorId`,`SensorValueDateTime`
FROM `sensorvalues`
WHERE `SensorId` = @SensorId
GROUP BY year(`SensorValueDateTime`) * 100 + month(`SensorValueDateTime`)
ORDER BY SensorValueDateTime" + (orderAscendingByDate ? "" : " desc") + @"
LIMIT @skip, @take", parmSensorId, parmSkip, parmTake);
                default:
                    throw new ArgumentException("Unknown aggregation type.", "aggregation");
            }
        }

        public int GetSensorValuesCountByAggregation(int sensorId, SensorAggregationType aggregation = SensorAggregationType.ByHour)
        {
            var query = this.sensorData.All();
            var parmSensorId = new MySql.Data.MySqlClient.MySqlParameter("@SensorId", sensorId);

            switch (aggregation)
            {
                case SensorAggregationType.ByHour:
                    return query.Where(s => s.SensorId == sensorId).Count();
                case SensorAggregationType.ByDay:
                    return this.sensorData
                        .CustomQuery<int>(@"SELECT year(`SensorValueDateTime`) * 100 + month(`SensorValueDateTime`) as `SensorValueId`
FROM `sensorvalues`
WHERE `SensorId` = @SensorId
GROUP BY year(`SensorValueDateTime`) * 10000 + month(`SensorValueDateTime`) * 100 + day(`SensorValueDateTime`)", parmSensorId)
                        .Count();

                case SensorAggregationType.ByWeek:
                    return this.sensorData
                        .CustomQuery<int>(@"SELECT year(`SensorValueDateTime`) * 100 +  weekofyear(`SensorValueDateTime`) as `SensorValueId`
FROM `sensorvalues`
WHERE `SensorId` = @SensorId
GROUP BY year(`SensorValueDateTime`) * 100 +  weekofyear(`SensorValueDateTime`)", parmSensorId)
                        .Count();
                case SensorAggregationType.ByMonth:
                    return this.sensorData
                        .CustomQuery<int>(@"SELECT  year(`SensorValueDateTime`) * 100 + month(`SensorValueDateTime`) as `SensorValueId`
FROM `sensorvalues`
WHERE `SensorId` = @SensorId
GROUP BY year(`SensorValueDateTime`) * 100 + month(`SensorValueDateTime`)", parmSensorId)
                        .Count();
                default:
                    throw new ArgumentException("Unknown aggregation type.", "aggregation");
            }
        }
    }
}