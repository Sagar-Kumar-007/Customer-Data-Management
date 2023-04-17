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

        [ForeignKey(nameof(Customer))]
        public string email { get; set; }

        public virtual Customer Customer { get; set; }
    }
}
