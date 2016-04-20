namespace AAWebSmartHouse.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class UsersHouses
    {
        [Column(Order = 0),Key]
        [Required]
        public string User_Id { get; set; }

        [Column(Order = 1), Key]
        [Required]
        public int HouseId { get; set; }        
    }
}
