using System;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface ISendEmailService
    {
        bool SendActivationMail(Uri url, string email);
        bool SendEmail(string recipient, string subject, string message);
        bool sendReminder(string email);
    }
}