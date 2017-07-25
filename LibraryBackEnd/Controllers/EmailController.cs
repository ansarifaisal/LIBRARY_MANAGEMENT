using LibraryBackEnd.Models.ViewModel;
using LibraryBackEnd.Services;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [RoutePrefix("api/email")]
    public class EmailController : ApiController
    {
        [HttpPost]
        [Route("SendEmail")]
        public IHttpActionResult SendEmailNotification(Email email)
        {

            try
            {
                SendEmailService emailService = new SendEmailService();
                bool flag = emailService.SendEmail
                            (
                                email.recipient,
                                email.subject,
                                email.message
                            );

                if (flag != false)
                    return Ok("Email Sent");

                return Ok("Not Send");
            }
            catch (Exception ex)
            {

            }
            return Ok();

        }

    }
}
