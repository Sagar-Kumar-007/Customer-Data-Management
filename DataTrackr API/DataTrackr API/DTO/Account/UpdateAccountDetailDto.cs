using DataTrackr_Web_API.Models;

namespace DataTrackr_API.DTO.Account
{
    public class UpdateAccountDetailDto
    {
        public string Acc_email { get; set; }
        //public decimal Acc_revenue { get; set; }

        public Coordinates Location { get; set; }

        public string aname { get; set; }

        public string EstYear { get; set; }

        public string description { get; set; }
        //public string Customer_email { get; set; }
    }
}
