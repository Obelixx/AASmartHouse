namespace AAWebSmartHouse.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class house
    {
        public house()
        {
            this.rooms = new List<room>();
            this.users = new List<user>();
        }
        
        public int HouseId { get; set; }
        public string HouseName { get; set; }
        public string HouseLocation { get; set; }
        public string HouseDescription { get; set; }
        public virtual ICollection<room> rooms { get; set; }
        public virtual ICollection<user> users { get; set; }
    }
}
