using DataTrackr_API.DTO.Customer;
using DataTrackr_Web_API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataTrackr_API.DTO.Country
{
    public class CreateCustomerDto:BaseCustomerDTO
    {
        public virtual Coordinates Headquarters { get; set; }
        public string CountryCode { get; set; }

    }
}
