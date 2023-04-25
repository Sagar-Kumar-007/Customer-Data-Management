using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DataTrackr_API.Models;

namespace DataTrackr_Web_API.Models
{
    public class Coordinates
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; }
    }
    public class Account
    {
        [Key]
        public string Acc_email { get; set; }
        public double Acc_revenue { get; set; }

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
