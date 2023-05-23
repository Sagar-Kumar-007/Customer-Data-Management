using AutoMapper;
using DataTrackr_API.DTO.Account;
using DataTrackr_API.DTO.Country;
using DataTrackr_API.DTO.Customer;
using DataTrackr_Web_API.Models;

namespace DataTrackr_API.Configurations
{
    public class MapperConfig:Profile
    {
        public MapperConfig()
        {
            CreateMap<Customer, CreateCustomerDto>().ReverseMap();
            CreateMap<Customer, GetCustomerDto>().ReverseMap();
            CreateMap<Customer, GetCustomerDetailsWithAccountsDTO>().ReverseMap();
            CreateMap<Customer, UpdateCustomerDto>().ReverseMap();

            CreateMap<Account, GetAccountDto>().ReverseMap();
            CreateMap<Account, CreateAccountDto>().ReverseMap();
            CreateMap<Account, UpdateAccountDetailDto>().ReverseMap();
        }
    }
}
