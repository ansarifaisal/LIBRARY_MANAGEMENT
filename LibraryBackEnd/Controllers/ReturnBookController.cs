﻿using LibraryBackEnd.Core.Services.Interface;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/returnBook")]
    public class ReturnBookController : ApiController
    {
        private IIssueBookService _issueBookService;
        private IReturnBookService _returnBookService;
        private IStudentService _studentService;

        public ReturnBookController(
            IReturnBookService returnBookService,
            IIssueBookService issueBookService,
            IStudentService studentService)
        {
            _returnBookService = returnBookService;
            _issueBookService = issueBookService;
            _studentService = studentService;
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var returnBooks = _returnBookService.GetAll();
            return Ok(returnBooks);
        }

        [HttpGet]
        [Route("get")]
        public IHttpActionResult GetReturnBook(string accessionNumber)
        {
            var returnBook = _returnBookService.GetReturnBook(accessionNumber);
            return Ok(returnBook);
        }

        [HttpGet]
        [Route("getByRollNo")]
        public IHttpActionResult GetByRollNo(string rollNo)
        {
            var returnBook = _returnBookService.GetByRollNo(rollNo);
            return Ok(returnBook);
        }

        [HttpGet]
        [Route("returnedBookInYears")]
        public IHttpActionResult returnedBookInYear()
        {
            var returnBook = _returnBookService.returnedBookInYear();
            return Ok(returnBook);
        }


        [HttpGet]
        [Route("returnedBookInYear/{year}")]
        public IHttpActionResult GetBookInYear(int year)
        {
            var returnBook = _returnBookService.GetBookInYear(year);
            return Ok(returnBook);
        }

    }
}
