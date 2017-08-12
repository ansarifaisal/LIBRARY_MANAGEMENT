using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Class;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [RoutePrefix("api/issue")]
    [Authorize]
    public class IssueController : ApiController
    {
        private IssueBookService _issueBookService;

        public IssueController(IssueBookService issueBookService)
        {
            _issueBookService = issueBookService;
        }

        [Route("all")]
        public IHttpActionResult GetAll()
        {
            var users = _issueBookService.GetAll();
            return Ok(users);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(IssueBook book)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _issueBookService.Update(book);
            return Ok("Updated Successfully!");
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(IssueBook book)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _issueBookService.Delete(book);
            return Ok("Deleted Successfully!");
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();
            var book = _issueBookService.SelectById(Id);
            if (book == null)
                return BadRequest();

            return Ok(book);
        }

    }
}
