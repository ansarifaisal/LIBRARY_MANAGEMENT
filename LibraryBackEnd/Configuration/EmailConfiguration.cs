namespace LibraryBackEnd.Configuration
{
    public class EmailConfiguration
    {

        public static readonly string EmailSender = "studenthubcorp@gmail.com";

        public static readonly string EmailCredentials = "studenthub123";

        public static readonly string SmtpClient = "smtp.gmail.com";

        public static readonly int SmtpPort = 587;

        public static readonly bool DefaultCredentials = false;

        public static readonly bool Ssl = true;
    }
}
