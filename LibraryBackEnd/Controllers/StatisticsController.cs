using LibraryBackEnd.Core.Services.Interface;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/statistics")]
    public class StatisticsController : ApiController
    {
        private IBookService _bookService;
        private IStudentService _studentService;

        public StatisticsController(IBookService bookService, IStudentService studentService)
        {
            _bookService = bookService;
            _studentService = studentService;
        }

        [HttpGet]
        [Route("booksInCourse")]
        public IHttpActionResult GetBooksInCourse()
        {
            var courses = _bookService.GetBooksInCourse();
            return Ok(courses);
        }

        [HttpGet]
        [Route("booksInSubject")]
        public IHttpActionResult GetBooksInSubject()
        {
            var subjects = _bookService.GetBooksInSubject();
            return Ok(subjects);
        }

        [HttpGet]
        [Route("studentsInYear")]
        public IHttpActionResult GetStudentsInYear()
        {
            var students = _studentService.GetStudentsInYear();
            return Ok(students);
        }

        [HttpGet]
        [Route("studentsInCourse")]
        public IHttpActionResult GetStudentsInCourse()
        {
            var students = _studentService.GetStudentsInCourse();
            return Ok(students);
        }

        [HttpGet]
        [Route("bookBaughtInYear")]
        public IHttpActionResult GetBookBaughtInYear()
        {
            var books = _bookService.BookBaughtInYear();
            return Ok(books);
        }
    }
}
