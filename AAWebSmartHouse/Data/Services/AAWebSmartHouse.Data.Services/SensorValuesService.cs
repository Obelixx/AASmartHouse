namespace AAWebSmartHouse.Data.Services
{
    using System;
    using System.Globalization;
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

        public IQueryable<SensorValue> GetSensorValuesPaged(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            ////Func<SensorDataByHour, Object> orderFunc = null;
            ////System.Linq.Expressions.Expression<Func<SensorDataByHour, Object>> orderFunc = null;

            ////orderFunc = item => item.SensorDataDateTime;
            ////orderFunc = item => item.SensorValue;

            // TODO: do i need sort order outside?
            var query = this.sensorData
                .All()
                .Where(sw => sw.SensorId == sensorId);

            query = query.OrderByDescending(it => it.SensorValueDateTime);

            return query.Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        //filtrirane i agregirane(den/sedmica/mesec)
        public IQueryable<SensorValue> GetSensorValuesPagedOrderdAndFiltered(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize, bool orderAscendingByDate = false, SensorAggregationType agregation = SensorAggregationType.ByHour)
        {
            var query = this.sensorData
               .All()
               .Where(sw => sw.SensorId == sensorId);

            switch (agregation)
            {
                case SensorAggregationType.ByHour:
                    break;
                case SensorAggregationType.ByDay:
                    query = query.GroupBy(g => new { group = g.SensorValueDateTime.Day })
                        .Select(s => new SensorValue()
                        {
                            Value = s.Average(se => se.Value),
                            SensorValueDateTime = new DateTime(s.Select(se => se.SensorValueDateTime.Year).FirstOrDefault(), 
                                                                      s.Select(se => se.SensorValueDateTime.Month).FirstOrDefault(), 
                                                                      s.Select(se => se.SensorValueDateTime.Day).FirstOrDefault(), 0, 0, 0, 0),
                            Sensor = s.Select(se => se.Sensor).FirstOrDefault(),
                            SensorId = s.Select(se => se.SensorId).FirstOrDefault(),
                            SensorValueId = s.Key.group
                        });
                    break;
                case SensorAggregationType.ByWeek:
                    query = query.GroupBy(g => new { group = DateTimeFormatInfo.CurrentInfo.Calendar.GetWeekOfYear(g.SensorValueDateTime, CalendarWeekRule.FirstFullWeek, DayOfWeek.Monday)})
                        .Select(s => new SensorValue()
                        {
                            Value = s.Average(se => se.Value),
                            SensorValueDateTime = new DateTime(s.Select(se => se.SensorValueDateTime.Year).FirstOrDefault(),
                                                                      s.Select(se => se.SensorValueDateTime.Month).FirstOrDefault(),
                                                                      s.Select(se => se.SensorValueDateTime.Day).FirstOrDefault(), 0, 0, 0, 0),
                            Sensor = s.Select(se => se.Sensor).FirstOrDefault(),
                            SensorId = s.Select(se => se.SensorId).FirstOrDefault(),
                            SensorValueId = s.Key.group
                        });
                    break;
                case SensorAggregationType.ByMonth:
                    query = query.GroupBy(g => new { group = g.SensorValueDateTime.Month })
                        .Select(s => new SensorValue()
                        {
                            Value = s.Average(se => se.Value),
                            SensorValueDateTime = new DateTime(s.Select(se => se.SensorValueDateTime.Year).FirstOrDefault(),
                                                                      s.Select(se => se.SensorValueDateTime.Month).FirstOrDefault(),
                                                                      1, 0, 0, 0, 0),
                            Sensor = s.Select(se => se.Sensor).FirstOrDefault(),
                            SensorId = s.Select(se => se.SensorId).FirstOrDefault(),
                            SensorValueId = s.Key.group
                        });
                    break;
                default:
                    break;
            }

            if (orderAscendingByDate)
            {
                query = query.OrderBy(it => it.SensorValueDateTime);
            }
            else
            {
                query = query.OrderByDescending(it => it.SensorValueDateTime);
            }

            //query = query.Select(fi => fi.SensorValueDateTime >= //)

            return query.Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        //public IQueryable<SensorDataByWeek> GetSensorDataByWeekPaged(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        //{
        //    return this.sensorsDataByWeek
        //        .All()
        //        .Where(sw => sw.SensorId == sensorId)
        //        .OrderByDescending(it => it.SensorDataDateTime)
        //        .AsQueryable()
        //        .Skip((page - 1) * pageSize)
        //        .Take(pageSize);
        //}

        //public IQueryable<SensorDataByMonth> GetSensorDataByMonthPaged(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        //{
        //    return this.sensorsDataByMonth
        //        .All()
        //        .Where(sw => sw.SensorId == sensorId)
        //        .OrderByDescending(it => it.SensorDataDateTime)
        //        .Skip((page - 1) * pageSize)
        //        .Take(pageSize);
        //}
    }
}
