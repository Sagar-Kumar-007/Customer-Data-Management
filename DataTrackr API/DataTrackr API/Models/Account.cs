using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DataTrackr_API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Text.Json.Serialization;

namespace DataTrackr_Web_API.Models
{
    public class Account
    {
        public string AccountEmail { get; set; }
        public decimal AccountRevenue { get; set; }
        public string AccountName { get; set; }
        public string EstablishmentYear { get; set; }
        public string Description { get; set; }
        public int CoordinateId { get; set; }
        public virtual Coordinates Location { get; set; }
        public string CustomerEmail { get; set; }
        [JsonIgnore]
        public Customer Customer { get; set; }
    }
}
