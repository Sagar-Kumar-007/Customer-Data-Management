using System.ComponentModel.DataAnnotations.Schema;

namespace DataTrackr_API.DTO.Account
{
    public class CreateAccountDto
    {
        public string Location { get; set; }

        public string name { get; set; }

        public string EstYear { get; set; }

        //public int PmId { get; set; }

        public string Account_email { get; set; }


    }
}
