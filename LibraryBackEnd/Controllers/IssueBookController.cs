using LibraryBackEnd.Core.BindingModels;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/issueBook")]
    public class IssueBookController : ApiController
    {
        private IIssueBookService _issueBookService;
        private IBookService _bookService;
        private IStudentService _studentService;
        private ISendEmailService _sendEmailService;

        public IssueBookController(
            IIssueBookService issueBookService,
            IBookService bookService,
            IStudentService studentService,
            ISendEmailService sendEmailService)
        {
            _issueBookService = issueBookService;
            _bookService = bookService;
            _studentService = studentService;
            _sendEmailService = sendEmailService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(IssueBookBindingModel issueBookBindingModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is invalid");
            _issueBookService.Create(issueBookBindingModel.IssueBook);
            issueBookBindingModel.Book.Status = "Issued";
            _bookService.Update(issueBookBindingModel.Book);
            issueBookBindingModel.User.IssueCount = issueBookBindingModel.User.IssueCount + 1;
            _studentService.Update(issueBookBindingModel.User);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var courses = _issueBookService.GetAll();
            return Ok(courses);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(IssueBook issueBook)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _issueBookService.Update(issueBook);
            return Ok("Updated Successfully!");
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(IssueBook issueBook)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            var student = _studentService.GetByRollNo(issueBook.RollNo);
            student.IssueCount = student.IssueCount - 1;
            _studentService.Update(student);
            var book = _bookService.GetByAccessionNumber(issueBook.AccessionNumber);
            book.Status = "Available";
            _bookService.Update(book);
            _issueBookService.Delete(issueBook);
            return Ok("Deleted Successfully!");
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();
            var course = _issueBookService.SelectById(Id);
            if (course == null)
                return BadRequest();

            return Ok(course);
        }

        [HttpGet]
        [Route("sendEmail")]
        public IHttpActionResult SendReminderEmail(string email)
        {
            var flag = _sendEmailService.sendReminder(email);
            if (flag == false)
                return BadRequest("Email Not Sent");
            return Ok("Email Sent Successfully!");
        }

    }
}
