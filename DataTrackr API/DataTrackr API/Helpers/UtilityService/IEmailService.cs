using System;
using DataTrackr_API.Models;

namespace DataTrackr_API.Helpers.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
    }
}
