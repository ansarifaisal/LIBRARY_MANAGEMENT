using LibraryBackEnd.Configuration;
using Microsoft.AspNet.Identity;
using SendGrid.Helpers.Mail;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace LibraryBackEnd.Services
{
    public class SendEmailService : IIdentityMessageService
    {
        //send activation mail
        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }

        // Use NuGet to install SendGrid (Basic C# client lib) 
        private async Task configSendGridasync(IdentityMessage message)
        {
            var myMessage = new SendGridMessage();

            myMessage.AddTo(message.Destination);
            myMessage.From = new System.Net.Mail.MailAddress("taiseer@bitoftech.net", "Taiseer Joudeh");
            myMessage.Subject = message.Subject;
            myMessage.PlainTextContent = message.Body;
            myMessage.HtmlContent = message.Body;

            var credentials = new NetworkCredential(ConfigurationManager.AppSettings["emailService:Account"],
                                                    ConfigurationManager.AppSettings["emailService:Password"]);

            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            if (transportWeb != null)
            {
                await transportWeb.DeliverAsync(myMessage);
            }
            else
            {
                //Trace.TraceError("Failed to create Web transport.");
                await Task.FromResult(0);
            }
        }

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
                var mail = new MailMessage(EmailConfiguration.EmailSender.Trim(), recipient.Trim());
                mail.Subject = subject;
                mail.Body = message;
                mail.IsBodyHtml = true;
                client.Send(mail);
                isMessageSent = true;
            }
            catch (System.Exception)
            {

                isMessageSent = false;
            }

            return isMessageSent;
        }

    }
}
