using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace DataTrackr_Web_API.Models
{
    public class Coordinates
    {
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string address { get; set; }
        public string Acc_email { get; set; }
        [JsonIgnore]
        public virtual Account Account { get; set; }
    }
}
