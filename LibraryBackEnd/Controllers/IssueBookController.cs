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
        private IReturnBookService _returnBookService;

        public IssueBookController(
            IIssueBookService issueBookService,
            IBookService bookService,
            IStudentService studentService,
            ISendEmailService sendEmailService,
            IReturnBookService returnBookService)
        {
            _issueBookService = issueBookService;
            _bookService = bookService;
            _studentService = studentService;
            _sendEmailService = sendEmailService;
            _returnBookService = returnBookService;
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

        [HttpPut]
        [Route("fine")]
        public IHttpActionResult UpdateFine(IssueBook issueBook)
        {
            _issueBookService.Update(issueBook);
            var student = _studentService.GetByRollNo(issueBook.RollNo);
            student.Fine = issueBook.Fine;
            _studentService.Update(student);
            return Ok("Fine Updated");
        }

        [HttpPut]
        [Route("return")]
        public IHttpActionResult ReturnBook(IssueBook issueBook)
        {
            var _issuedBook = issueBook;
            _issueBookService.Delete(issueBook);
            var returnBook = new ReturnBook
            {
                AccessionNumber = _issuedBook.AccessionNumber,
                BookTitle = _issuedBook.BookTitle,
                Course = _issuedBook.Course,
                Email = _issuedBook.Email,
                IssuedDate = _issuedBook.IssuedDate,
                ReturnDate = _issuedBook.ReturnDate,
                FullName = _issuedBook.FullName,
                Fine = _issuedBook.Fine,
                RollNo = _issuedBook.RollNo
            };
            _returnBookService.Create(returnBook);
            var student = _studentService.GetByRollNo(_issuedBook.RollNo);
            if (student == null)
                return BadRequest();
            student.Fine = student.Fine - _issuedBook.Fine;
            _studentService.Update(student);
            var book = _bookService.GetByAccessionNumber(_issuedBook.AccessionNumber);
            if (book == null)
                return BadRequest();
            book.Status = "Available";
            _bookService.Update(book);
            return Ok("Book Returned Successfully!");
        }

    }
}
