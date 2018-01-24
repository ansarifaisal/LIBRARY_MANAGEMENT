using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/book")]
    public class BookController : ApiController
    {
        private IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is invalid");
            _bookService.Create(book);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var books = _bookService.GetAll();
            return Ok(books);
        }

        [Route("getBooks")]
        [HttpGet]
        public IHttpActionResult GetBooks()
        {
            var books = _bookService.GetBooks();
            return Ok(books);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _bookService.Update(book);
            return Ok("Updated Successfully!");
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _bookService.Delete(book);
            return Ok("Deleted Successfully!");
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();
            var book = _bookService.SelectById(Id);
            if (book == null)
                return BadRequest();

            return Ok(book);
        }

        [HttpGet]
        [Route("byAccessionNumber/{accessionNumber}")]
        public IHttpActionResult GetByAccessionNumber(string accessionNumber)
        {
            if (accessionNumber == null)
                throw new ArgumentNullException();

            var book = _bookService.GetByAccessionNumber(accessionNumber);
            if (book == null)
                return Ok(book);
            return Ok(book);
        }

        [HttpGet]
        [Route("bookTitles")]
        public IHttpActionResult BookTitles()
        {
            var bookTitle = _bookService.BookTitle();
            return Ok(bookTitle);
        }

        [HttpGet]
        [Route("accessionNumbers")]
        public IHttpActionResult GetAccessionNumbers()
        {
            var accessionNumbers = _bookService.GetAccessionNumbers();
            return Ok(accessionNumbers);
        }

        [HttpGet]
        [Route("booksByCourse")]
        public IHttpActionResult GetBooksByCourse(string course)
        {
            var books = _bookService.GetDistinctBooksByCourse(course);
            return Ok(books);
        }

        [HttpGet]
        [Route("getBookByTitle")]
        public IHttpActionResult GetBookByTitle(string title)
        {
            var book = _bookService.GetBookByTitle(title);
            return Ok(book);
        }
    }
}
