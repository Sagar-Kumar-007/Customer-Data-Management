using DataTrackr_Web_API.Models;

namespace DataTrackr_API.DTO.Customer
{
    public class UpdateCustomerDto:BaseCustomerDTO
    {


        public virtual Coordinates Headquarters { get; set; }
        public string CountryCode { get; set; }

    }
}
