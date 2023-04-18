using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DataTrackr_Web_API.Models
{
    public class Account
    {
        [Key]
        public string Location { get; set; }

        public string name { get; set; }

        public string EstYear { get; set; }

        public int PmId { get; set; }

        [ForeignKey(nameof(Account_email))]
        public string Account_email { get; set; }

        [ForeignKey(nameof(Account_email))]
        public virtual Customer Customer { get; set; }
    }
}
