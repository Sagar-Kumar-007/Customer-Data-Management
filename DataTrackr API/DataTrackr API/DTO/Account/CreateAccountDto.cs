namespace DataTrackrAPI.DTO.Account
{
    public class CreateAccountDto:BaseAccountDTO
    {
        public decimal AccountRevenue { get; set; }
        public string CustomerEmail { get; set; }
    }
}
