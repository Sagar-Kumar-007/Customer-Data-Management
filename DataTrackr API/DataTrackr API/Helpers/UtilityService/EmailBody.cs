namespace DataTrackr_API.Helpers.UtilityService
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email,string emailToken)
        {
            return $@"
                    <html>
                     <head></head>
                     <body>Reset Password</body>
                    </html>
                    ";
        }
    }
}
