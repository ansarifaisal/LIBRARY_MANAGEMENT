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
        private ILostOrReplaceService _lostOrReplaceService;

        public IssueBookController(
            IIssueBookService issueBookService,
            IBookService bookService,
            IStudentService studentService,
            ISendEmailService sendEmailService,
            IReturnBookService returnBookService,
            ILostOrReplaceService lostOrReplaceService)
        {
            _issueBookService = issueBookService;
            _bookService = bookService;
            _studentService = studentService;
            _sendEmailService = sendEmailService;
            _returnBookService = returnBookService;
            _lostOrReplaceService = lostOrReplaceService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(IssueBookBindingModel issueBookBindingModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is invalid");
            var issueBook = issueBookBindingModel.IssueBook;
            _issueBookService.Create(issueBook);
            issueBookBindingModel.Book.Status = "Issued";
            _bookService.Update(issueBookBindingModel.Book);
            issueBookBindingModel.User.IssueCount = issueBookBindingModel.User.IssueCount + 1;
            _sendEmailService.sendIssueBookConfirmation(issueBookBindingModel.User.Email, issueBook);
            _studentService.Update(issueBookBindingModel.User);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var books = _issueBookService.GetAll();
            return Ok(books);
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
            student.Fine = student.Fine + issueBook.Fine;
            _studentService.Update(student);
            return Ok("Fine Updated");
        }

        [HttpPut]
        [Route("return")]
        public IHttpActionResult ReturnBook(ReturnBook returnBook)
        {
            _returnBookService.Create(returnBook);
            var student = _studentService.GetByRollNo(returnBook.RollNo);
            if (student == null)
                return BadRequest();
            student.IssueCount = student.IssueCount - 1;
            student.Fine = student.Fine - returnBook.Fine;
            _studentService.Update(student);
            var book = _bookService.GetByAccessionNumber(returnBook.AccessionNumber);
            if (book == null)
                return BadRequest();
            book.Status = "Available";
            _sendEmailService.sendReturnBookConfirmation(returnBook.Email, returnBook);
            _bookService.Update(book);
            return Ok("Book Returned Successfully!");
        }

        [HttpPut]
        [Route("lost")]
        public IHttpActionResult LostBook(LostOrReplace lostOrReplace)
        {
            _lostOrReplaceService.Create(lostOrReplace);
            var book = _bookService.GetByAccessionNumber(lostOrReplace.AccessionNumber);
            if (book == null)
                return BadRequest();
            book.Status = "Lost";
            _bookService.Update(book);
            var borrower = _studentService.GetByRollNo(lostOrReplace.RollNo);
            if (borrower == null)
                return BadRequest();
            borrower.IssueCount = borrower.IssueCount - 1;
            borrower.Status = "DEFAULT";
            _sendEmailService.sendLostBookReminder(lostOrReplace.Email, lostOrReplace);
            _studentService.Update(borrower);
            return Ok("");
        }

        [HttpGet]
        [Route("byRollNumber")]
        public IHttpActionResult GetByRollNumber(string rollNo)
        {
            if (rollNo == null)
                return BadRequest();
            var books = _issueBookService.GetByRollNumber(rollNo);
            return Ok(books);
        }
    }
}
