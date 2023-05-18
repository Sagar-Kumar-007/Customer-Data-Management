using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DataTrackr_API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace DataTrackr_Web_API.Models
{
    public class Account
    {
        public string Acc_email { get; set; }
        public decimal Acc_revenue { get; set; }

        public string aname { get; set; }

        public string EstYear { get; set; }

        public string description { get; set; }

        public int CoordinateId { get; set; }
        public virtual Coordinates Location { get; set; }
        public string Customer_email { get; set; }

        public Customer Customer { get; set; }
    }
}
