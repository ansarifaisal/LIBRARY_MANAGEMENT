using LibraryBackEnd.Core.Services.Class;
using LibraryBackEnd.Core.ViewModels;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [RoutePrefix("api/email")]
    public class EmailController : ApiController
    {
        [HttpPost]
        [Route("SendEmail")]
        public IHttpActionResult SendEmailNotification(EmailViewModel email)
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
