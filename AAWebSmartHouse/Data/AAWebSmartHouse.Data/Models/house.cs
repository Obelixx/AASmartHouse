namespace AAWebSmartHouse.Data.Models
{
    using System.Collections.Generic;

    public partial class House
    {
        public House()
        {
            this.Rooms = new List<Room>();
            this.Users = new List<User>();
        }
        
        public int HouseId { get; set; }

        public string HouseName { get; set; }

        public int ControlerNumber { get; set; }

        public string VerificationCode { get; set; }

        public string HouseLocation { get; set; }

        public string HouseDescription { get; set; }

        public virtual ICollection<Room> Rooms { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
