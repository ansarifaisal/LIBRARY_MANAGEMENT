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
        [Route("booksByCourse")]
        public IHttpActionResult GetBooksByCourse(string courseName)
        {
            var courses = _bookService.GetBooksByCourse(courseName);
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
        [Route("booksBySubject")]
        public IHttpActionResult GetBooksBySubject(string subject)
        {
            if (subject.Contains("  "))
                subject = subject.Replace("  ", "++");
            var books = _bookService.GetBooksBySubject(subject);
            return Ok(books);
        }

        [HttpGet]
        [Route("studentsInYear")]
        public IHttpActionResult GetStudentsInYear()
        {
            var students = _studentService.GetStudentsInYear();
            return Ok(students);
        }


        [HttpGet]
        [Route("studentsByYear/{year}")]
        public IHttpActionResult GetStudentsByYear(int year)
        {
            var students = _studentService.GetStudentsByYear(year);
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
        [Route("studentsByCourse")]
        public IHttpActionResult GetStudentsByCourse(string courseName)
        {
            var students = _studentService.GetStudentsByCourse(courseName);
            return Ok(students);
        }


        [HttpGet]
        [Route("bookBaughtInYear")]
        public IHttpActionResult GetBookBaughtInYear()
        {
            var books = _bookService.BookBaughtInYear();
            return Ok(books);
        }

        [HttpGet]
        [Route("booksByYear/{year}")]
        public IHttpActionResult GetBooksByYear(int year)
        {
            var books = _bookService.GetBooksByYear(year);
            return Ok(books);
        }

        [HttpGet]
        [Route("booksTitles")]
        public IHttpActionResult GetBooksTitles()
        {
            var titles = _bookService.GetBooksTitles();
            return Ok(titles);
        }

        [HttpGet]
        [Route("booksByTitles")]
        public IHttpActionResult GetBooksByTitle(string title)
        {
            var books = _bookService.GetBooksByTitle(title);
            return Ok(books);
        }
    }
}
