using DataTrackrAPI.DTO.Customer;
using DataTrackr_Web_API.Models;

namespace DataTrackrAPI.DTO.Country
{
    public class CreateCustomerDto:BaseCustomerDTO
    {
        public virtual Coordinates Headquarters { get; set; }
        public string CountryCode { get; set; }
    }
}
