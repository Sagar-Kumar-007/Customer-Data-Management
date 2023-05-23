using DataTrackr_Web_API.Models;

namespace DataTrackr_API.DTO.Account
{
    public class BaseAccountDTO
    {
        public string AccountEmail { get; set; }
        public virtual Coordinates Location { get; set; }
        public string AccountName { get; set; }
        public string EstablishmentYear { get; set; }
        public string Description { get; set; }

    }
}
