using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace LibraryBackEnd.Core.Services.Class
{
    public class SendEmailService : ISendEmailService
    {

        public bool SendEmail(string recipient, string subject, string message)
        {
            bool isMessageSent = false;

            SmtpClient client = new SmtpClient(EmailConfiguration.SmtpClient);

            client.Port = EmailConfiguration.SmtpPort;

            client.DeliveryMethod = SmtpDeliveryMethod.Network;

            client.UseDefaultCredentials = EmailConfiguration.DefaultCredentials;

            var credentials =
                new NetworkCredential(EmailConfiguration.EmailSender, EmailConfiguration.EmailCredentials);

            client.EnableSsl = EmailConfiguration.Ssl;

            client.Credentials = credentials;

            try
            {
                var mail = new MailMessage(EmailConfiguration.EmailSender.Trim(), recipient.Trim());
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
            var callBackUrl = HttpUtility.UrlDecode(url.ToString());

            var message = "Please confirm your account by clicking <a href=\"" + callBackUrl + "\">here</a>";

            var subject = "Confirm your account";

            SendEmail(email, subject, message);

            return true;
        }

        public bool sendReminder(string email)
        {
            var message = "You need to submit the book you have taken tomorrow";
            var subject = "Return Book Reminder";
            SendEmail(email, subject, message);
            return true;
        }
    }
}
