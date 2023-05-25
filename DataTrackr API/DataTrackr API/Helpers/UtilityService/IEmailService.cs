using DataTrackrAPI.Models;

namespace DataTrackrAPI.Helpers.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
    }
}
