using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Class;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/email")]
    public class EmailController : ApiController
    {
        private SendEmailService _sendEmailService;

        public EmailController(SendEmailService sendEmailService)
        {
            _sendEmailService = sendEmailService;
        }

        [HttpPost]
        [Route("returnBook")]
        public IHttpActionResult SendReturnBookReminder(string email, IssueBook issueBook)
        {
            if (email == "" || issueBook == null)
                throw new ArgumentNullException();
            var flag = _sendEmailService.sendReturnBookReminder(email, issueBook);
            if (flag == false)
                return BadRequest();
            return Ok();
        }

        [HttpPost]
        [Route("lateBook")]
        public IHttpActionResult SendLateBookReminder(string email, IssueBook issueBook)
        {
            if (email == "" || issueBook == null)
                throw new ArgumentNullException();
            var flag = _sendEmailService.sendLateBookReminder(email, issueBook);
            if (flag == false)
                return BadRequest();
            return Ok();
        }

        [HttpPost]
        [Route("returnMagazine")]
        public IHttpActionResult SendReturnMagazineReminder(string email, IssueMagazine issueMagazine)
        {
            if (email == "" || issueMagazine == null)
                throw new ArgumentNullException();
            var flag = _sendEmailService.sendReturnMagazineReminder(email, issueMagazine);
            if (flag == false)
                return BadRequest();
            return Ok();
        }

        [HttpPost]
        [Route("lateMagazine")]
        public IHttpActionResult SendLateMagazineReminder(string email, IssueMagazine issueMagazine)
        {
            if (email == "" || issueMagazine == null)
                throw new ArgumentNullException();
            var flag = _sendEmailService.sendLateMagazineReminder(email, issueMagazine);
            if (flag == false)
                return BadRequest();
            return Ok();
        }
    }
}
