namespace AAWebSmartHouse.DataGenerator
{
    using AAWebSmartHouse.Data;
    using AAWebSmartHouse.Data.Models;

    class DemoHouse
    {
        private readonly IRepository<House> houses;

        public DemoHouse(IRepository<House> houses)
        {
            this.houses = houses;
        }

        public void AddRandomHouse()
        {
            var r = RandomGenerator.Instance;

            houses.Add(new House()
            {
                ControlerNumber = 1,
                HouseDescription = "Description-" + r.GetRandomString(6),
                HouseLocation = "Location-" + r.GetRandomString(6),
                HouseName = "Name-" + r.GetRandomString(6),
                VerificationCode = "vCode"
            });

            houses.SaveChanges();
        }
    }
}
