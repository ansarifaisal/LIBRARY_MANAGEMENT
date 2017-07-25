using LibraryBackEnd.Configuration;
using System.Net;
using System.Net.Mail;

namespace LibraryBackEnd.Services
{
    public class SendEmailService
    {

        public bool SendEmail(string recipient, string subject, string message)
        {

            bool isMessageSent = false;

            SmtpClient client = new SmtpClient(EmailConfiguration.SmtpClient);

            client.Port = EmailConfiguration.SmtpPort;

            client.DeliveryMethod = SmtpDeliveryMethod.Network;

            client.UseDefaultCredentials = false;

            NetworkCredential credentials =
                new NetworkCredential(EmailConfiguration.EmailSender, EmailConfiguration.EmailCredentials);

            client.EnableSsl = true;

            client.Credentials = credentials;

            try
            {
                var mail = new MailMessage(EmailConfiguration.EmailSender, recipient);
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
    }
}
