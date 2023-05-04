using System.ComponentModel.DataAnnotations;

namespace DataTrackr_API.Models
{
    public class Logs
    {
        [Key]
        public int logId { get; set; }
        public string userId { get; set; }
        public string timeStamp { get; set; }
        public string operation { get; set; }
        public string message { get; set; }



    }
}
