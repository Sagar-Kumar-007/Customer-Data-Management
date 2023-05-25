using System.ComponentModel.DataAnnotations;

namespace DataTrackrAPI.Models
{
    public class Log
    {
        public int LogId { get; set; }
        public string UserId { get; set; }
        public string TimeStamp { get; set; }
        public string Operation { get; set; }
        public string Message { get; set; }
    }
}
