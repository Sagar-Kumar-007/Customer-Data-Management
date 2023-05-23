using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace DataTrackr_Web_API.Models
{
    public class Coordinates
    {
        public int CoordinateId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; }
        [JsonIgnore]
        public virtual ICollection<Customer> Customers { get; set; }
        [JsonIgnore]
        public virtual ICollection<Account> Accounts{ get; set; }
    }
}
