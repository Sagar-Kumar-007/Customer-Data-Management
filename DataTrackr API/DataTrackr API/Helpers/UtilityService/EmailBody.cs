using DataTrackrAPI.Models;

namespace DataTrackrAPI.Helpers.UtilityService
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email,string emailToken)
        {
            return $@"
                    <html>
                     <head></head>
                     <body>Security code to reset your password is: {emailToken} </body>
                    </html>";
        }
    }
}
