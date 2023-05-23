namespace DataTrackr_API.DTO.Account
{
    public class CreateAccountDto:BaseAccountDTO
    {
        public decimal AccountRevenue { get; set; }
        public string CustomerEmail { get; set; }

    }
}
