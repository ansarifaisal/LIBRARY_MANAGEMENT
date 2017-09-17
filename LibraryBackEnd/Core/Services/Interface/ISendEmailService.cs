using LibraryBackEnd.Core.Models;
using System;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface ISendEmailService
    {
        bool SendActivationMail(Uri url, string email);
        bool SendForgetMail(Uri url, string email);
        bool SendEmail(string recipient, string subject, string message);
        bool sendReminder(string email);
        bool sendIssueBookConfirmation(string email, IssueBook issueBook);
        bool sendLateBookReminder(string email, IssueBook issueBook);
        bool sendReturnBookReminder(string email, IssueBook issueBook);
        bool sendLostBookReminder(string email, LostOrReplace lostOrReplace);
        bool sendReturnBookConfirmation(string email, ReturnBook returnBook);

        bool sendIssueMagazineConfirmation(string email, IssueMagazine issueMagazine);
        bool sendLateMagazineReminder(string email, IssueMagazine issueMagazine);
        bool sendReturnMagazineReminder(string email, IssueMagazine issueMagazine);
        bool sendLostMagazineReminder(string email, LostOrReplaceMagazine lostOrReplace);
        bool sendReturnMagazineConfirmation(string email, ReturnMagazine returnMagazine);
    }
}