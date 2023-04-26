using DataTrackr_API.DTO.Account;
using DataTrackr_Web_API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataTrackr_API.DTO.Customer
{
    public class GetCustomerDetails
    {
        public string email { get; set; }
        public string cname { get; set; }
        public string logo { get; set; }
        public string sector { get; set; }
        public string phoneNo { get; set; }
        public string headquaters { get; set; }
        public string CountryCode { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public virtual IList<GetAccountDto> Accounts { get; set; }
    }

  
}
