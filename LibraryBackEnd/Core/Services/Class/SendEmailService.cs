using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace LibraryBackEnd.Core.Services.Class
{
    public class SendEmailService : ISendEmailService
    {
        private ISiteConfigurationService _siteConfigurationService;

        public SendEmailService(ISiteConfigurationService siteConfigurationService)
        {
            _siteConfigurationService = siteConfigurationService;
        }

        public class Configuration
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public int Fine { get; set; }
            public string AdminName { get; set; }
        }

        public Configuration GetCredentials()
        {
            var configurations = _siteConfigurationService.GetAll();
            var config = new Configuration();
            foreach (var configuration in configurations)
            {
                config.Email = configuration.Email;
                config.Password = configuration.Password;
                config.Fine = configuration.Fine;
                config.AdminName = configuration.AdminName;
            }
            return config;
        }

        public bool SendEmail(string recipient, string subject, string message)
        {
            bool isMessageSent = false;

            var EmailCredentials = GetCredentials();

            SmtpClient client = new SmtpClient(EmailConfiguration.SmtpClient);

            client.Port = EmailConfiguration.SmtpPort;

            client.DeliveryMethod = SmtpDeliveryMethod.Network;

            client.UseDefaultCredentials = EmailConfiguration.DefaultCredentials;

            var credentials =
                new NetworkCredential(EmailCredentials.Email, EmailCredentials.Password);

            client.EnableSsl = EmailConfiguration.Ssl;

            client.Credentials = credentials;

            try
            {
                var mail = new MailMessage(EmailCredentials.Email.Trim(), recipient.Trim());
                mail.Subject = subject;
                mail.Body = message;
                mail.IsBodyHtml = true;
                client.Send(mail);
                isMessageSent = true;
            }
            catch (System.Exception ex)
            {
                isMessageSent = false;
            }

            return isMessageSent;
        }

        public bool SendActivationMail(Uri url, string email)
        {
            var config = GetCredentials();

            var callBackUrl = HttpUtility.UrlDecode(url.ToString());

            var message = "Please Confirm Your Account By Clicking <a href=\"" + callBackUrl + "\">Here</a> <br>"
                            + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";
            var subject = "Confirm Your Account";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendReminder(string email)
        {
            var message = "You Need ";
            var subject = "Return Book Reminder";
            SendEmail(email, subject, message);
            return true;
        }

        public bool SendForgetMail(Uri url, string email)
        {
            var config = GetCredentials();

            var callBackUrl = HttpUtility.UrlDecode(url.ToString());

            var message = "<a href=\"" + callBackUrl + "\">Here</a> to Reset Your Password. <br>"
                + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";

            var subject = "Password Reset.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendIssueBookConfirmation(string email, IssueBook issueBook)
        {
            var config = GetCredentials();

            var message = "<h2>Hello " + issueBook.FullName + ",</h2> <b>" + issueBook.BookTitle
                + "</b> Has Been Issued, You Have To Submit It On <b>" + issueBook.ReturnDate.ToShortDateString()
            + "</b>.<br/> If You Fail To Do So You Will Be Charged <b>" + config.Fine + "/-</b> Per Day Basis.<br/>"
            + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";

            var subject = "Book Issued Confirmation.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendLateBookReminder(string email, IssueBook issueBook)
        {
            var config = GetCredentials();

            var message = "<h2>Hello " + issueBook.FullName
                + ",</h2> You Are Receiving This Mail Since You Have Failed To Submit " + issueBook.BookTitle
                + " On " + issueBook.ReturnDate
                + ", Submit The Book With " + issueBook.Fine + "/- fine.<br/>"
                + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";


            var subject = "Book Submission Reminder.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendReturnBookReminder(string email, IssueBook issueBook)
        {
            var config = GetCredentials();
            var message = "<h2>Hello " + issueBook.FullName
              + ",</h2> You Are Receiving This Mail You Have To Submit <b>" + issueBook.BookTitle
              + "</b> Tomorrow. i.e on " + issueBook.ReturnDate
              + ", If You Fail To Do So You Will Be Charged <b>" + config.Fine + "/-</b> per day.<br/>"
              + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";
            var subject = "Book Return Reminder.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendLostBookReminder(string email, LostOrReplace lostOrReplace)
        {
            var config = GetCredentials();

            var message = "<h2>Hello " + lostOrReplace.FullName
              + ",</h2> You Have Lost <b>" + lostOrReplace.BookTitle
              + "</b> book, Now Your Status Is <b>Default</b>. <br>"
              + "Please Contact To <b>" + config.AdminName + "</b> In Library."
            + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";
            var subject = "Book Lost Confirmation.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendReturnBookConfirmation(string email, ReturnBook returnBook)
        {
            var config = GetCredentials();

            var message = "<h2>Hello " + returnBook.FullName
              + ",</h2> You Have Submitted <b>" + returnBook.BookTitle
              + "</b> Book."
            + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";
            var subject = "Book Return Reminder.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendIssueMagazineConfirmation(string email, IssueMagazine issueMagazine)
        {
            var config = GetCredentials();

            var message = "<h2>Hello " + issueMagazine.FullName + ",</h2> <b>Volume "
                        + issueMagazine.Volume + " Of " + issueMagazine.Title
                        + "</b> Has Been Issued, You Have To Submit It On <b>" + issueMagazine.ReturnDate.ToShortDateString()
                        + "</b>.<br/> If You Fail To Do So You Will Be Charged <b>" + config.Fine + "/-</b> Per Day Basis.<br/>"
                        + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";

            var subject = "Magazine Issued Confirmation.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendLateMagazineReminder(string email, IssueMagazine issueMagazine)
        {
            var config = GetCredentials();

            var message = "<h2>Hello " + issueMagazine.FullName
                + ",</h2> You Are Receiving This Mail Since You Have Failed To Submit <b>Volume "
                + issueMagazine.Volume + " Of " + issueMagazine.Title + " On " + issueMagazine.ReturnDate.ToShortDateString()
                + ", Submit The Magazine With " + issueMagazine.Fine + "/- fine.<br/>"
                + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";


            var subject = "Magazine Submission Reminder.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendReturnMagazineReminder(string email, IssueMagazine issueMagazine)
        {
            var config = GetCredentials();
            var message = "<h2>Hello " + issueMagazine.FullName
              + ",</h2> You Are Receiving This Mail Since You Have To Submit <b> Volume "
              + issueMagazine.Volume + " Of " + issueMagazine.Title
              + "</b> Tomorrow. i.e on " + issueMagazine.ReturnDate.ToShortDateString()
              + ", If You Fail To Do So You Will Be Charged <b>" + config.Fine + "/-</b> per day.<br/>"
              + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";
            var subject = "Magazine Return Reminder.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendLostMagazineReminder(string email, LostOrReplaceMagazine lostOrReplace)
        {
            var config = GetCredentials();

            var message = "<h2>Hello " + lostOrReplace.FullName
              + ",</h2> You Have Lost <b>Volume " + lostOrReplace.Volume + " Of " + lostOrReplace.Title
              + "</b> Magazine, Now Your Status Is <b>Default</b>. <br>"
              + "Please Contact To <b>" + config.AdminName + "</b> In Library."
            + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";
            var subject = "Magazine Lost Confirmation.";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendReturnMagazineConfirmation(string email, ReturnMagazine returnMagazine)
        {
            var config = GetCredentials();

            var message = "<h2>Hello " + returnMagazine.FullName
              + ",</h2> You Have Submitted <b>Volume " + returnMagazine.Volume + " Of " + returnMagazine.title
              + "</b> Magazine."
            + "<p align='right'>Regards & Thanks,<br><b>" + config.AdminName + "</b></p>";
            var subject = "Magazine Return Confirmation.";

            SendEmail(email, subject, message);

            return true;
        }
    }
}
