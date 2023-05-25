using AutoMapper;
using DataTrackrAPI.DTO.Account;
using DataTrackrAPI.DTO.Country;
using DataTrackrAPI.DTO.Customer;
using DataTrackr_Web_API.Models;

namespace DataTrackrAPI.Configurations
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
