using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace DataTrackr_Web_API.Models
{
    public class Coordinates
    {
        public int coordinateId { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string address { get; set; }
        [JsonIgnore]
        public virtual ICollection<Customer> Customers { get; set; }

        [JsonIgnore]
        public virtual ICollection<Account> Accounts{ get; set; }
    }
}
