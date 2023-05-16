using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace DataTrackr_Web_API.Models
{
    public class Coordinates
    {
        public double latitude { get; set; }
        public double longitude { get; set; }
        [Key]
        public string address { get; set; }
    }
    public class Account
    {
        [Key]
        public string Acc_email { get; set; }
        public decimal Acc_revenue { get; set; }

        public Coordinates Location { get; set; }

        public string aname { get; set; }

        public string EstYear { get; set; }

        public string description { get; set; }        

        [ForeignKey(nameof(Customer_email))]
        public string Customer_email { get; set; }

        [ForeignKey(nameof(Customer_email))]
        public virtual Customer Customer { get; set; }

    }
}
