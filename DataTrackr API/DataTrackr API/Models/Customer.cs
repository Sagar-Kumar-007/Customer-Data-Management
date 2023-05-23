using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataTrackr_Web_API.Models
{
    public class Customer
    {
        public string CustomerEmail { get; set; }
        public string CustomerName { get; set; }
        public string Logo { get; set; }
        public string Sector { get; set; }
        public string PhoneNumber { get; set; }
        public int CoordinateId { get; set; }
        public virtual Coordinates Headquarters { get; set; }
        public string CountryCode { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public virtual IList<Account> Accounts { get; set; }
    }
}
