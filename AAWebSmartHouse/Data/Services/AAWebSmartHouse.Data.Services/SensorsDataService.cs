namespace AAWebSmartHouse.Data.Services
{
    using System.Linq;

    using AAWebSmartHouse.Common;
    using AAWebSmartHouse.Data.Models;
    using AAWebSmartHouse.Data.Services.Contracts;

    public class SensorsDataService : ISensorsDataService
    {
        private readonly IRepository<SensorDataByHour> sensorsDataByHour;
        private readonly IRepository<SensorDataByDay> sensorsDataByDay;
        private readonly IRepository<SensorDataByWeek> sensorsDataByWeek;
        private readonly IRepository<SensorDataByMonth> sensorsDataByMonth;

        public SensorsDataService(
            IRepository<SensorDataByHour> sensorsDataByHourRepo,
            IRepository<SensorDataByDay> sensorsDataByDayRepo,
            IRepository<SensorDataByWeek> sensorsDataByWeekRepo,
            IRepository<SensorDataByMonth> sensorsDataByMonthRepo)
        {
            this.sensorsDataByHour = sensorsDataByHourRepo;
            this.sensorsDataByDay = sensorsDataByDayRepo;
            this.sensorsDataByWeek = sensorsDataByWeekRepo;
            this.sensorsDataByMonth = sensorsDataByMonthRepo;
        }

        public IQueryable<SensorDataByHour> GetSensorDataByHourPaged(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            ////Func<SensorDataByHour, Object> orderFunc = null;
            ////System.Linq.Expressions.Expression<Func<SensorDataByHour, Object>> orderFunc = null;
            
            ////orderFunc = item => item.SensorDataDateTime;
            ////orderFunc = item => item.SensorValue;

            // TODO: do i need sort order outside?
            return this.sensorsDataByHour
                .All()
                .Where(sw => sw.SensorId == sensorId)
                .OrderByDescending(it => it.SensorDataDateTime)
                .AsQueryable()
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public IQueryable<SensorDataByDay> GetSensorDataByDayPaged(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.sensorsDataByDay
                .All()
                .Where(sw => sw.SensorId == sensorId)
                .OrderByDescending(it => it.SensorDataDateTime)
                .AsQueryable()
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public IQueryable<SensorDataByWeek> GetSensorDataByWeekPaged(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.sensorsDataByWeek
                .All()
                .Where(sw => sw.SensorId == sensorId)
                .OrderByDescending(it => it.SensorDataDateTime)
                .AsQueryable()
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public IQueryable<SensorDataByMonth> GetSensorDataByMonthPaged(int sensorId, int page = 1, int pageSize = GlobalConstants.DefaultPageSize)
        {
            return this.sensorsDataByMonth
                .All()
                .Where(sw => sw.SensorId == sensorId)
                .OrderByDescending(it => it.SensorDataDateTime)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }
    }
}
