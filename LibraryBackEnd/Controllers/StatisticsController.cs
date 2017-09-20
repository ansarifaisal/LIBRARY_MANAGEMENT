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
        private IPeriodicMagazineService _periodicMagazineService;

        public StatisticsController(IBookService bookService, IStudentService studentService,
            IPeriodicMagazineService periodicMagazineService)
        {
            _bookService = bookService;
            _studentService = studentService;
            _periodicMagazineService = periodicMagazineService;
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

        [HttpGet]
        [Route("bookTypes")]
        public IHttpActionResult GetBookType()
        {
            var bookTypes = _bookService.GetBookTypes();
            return Ok(bookTypes);
        }

        [HttpGet]
        [Route("booksByType")]
        public IHttpActionResult GetBooksByType(string type)
        {
            var books = _bookService.GetBooksByType(type);
            return Ok(books);
        }

        [HttpGet]
        [Route("magazineTitles")]
        public IHttpActionResult GetMagazineTitles()
        {
            var magazines = _periodicMagazineService.GetMagazineTitles();
            return Ok(magazines);
        }

        [HttpGet]
        [Route("magazineByTitle")]
        public IHttpActionResult GetMagazineByTitle(string title)
        {
            if (title.Contains("  "))
                title = title.Replace("  ", "++");

            var magazines = _periodicMagazineService.GetMagazineByTitle(title);
            return Ok(magazines);
        }

        [HttpGet]
        [Route("magazineCourses")]
        public IHttpActionResult GetMagazineCourse()
        {
            var courses = _periodicMagazineService.GetMagazineCourse();
            return Ok(courses);
        }

        [HttpGet]
        [Route("magazineByCourse")]
        public IHttpActionResult GetMagazineByCourse(string course)
        {
            var magazines = _periodicMagazineService.GetMagazineByCourse(course);
            return Ok(magazines);
        }

        [HttpGet]
        [Route("magazineTypes")]
        public IHttpActionResult GetMagazineTypes()
        {
            var types = _periodicMagazineService.GetMagazineTypes();
            return Ok(types);
        }

        [HttpGet]
        [Route("magazineByType")]
        public IHttpActionResult GetMagazineByTypes(string type)
        {

            var magazines = _periodicMagazineService.GetMagazineByTypes(type);
            return Ok(magazines);
        }

        [HttpGet]
        [Route("magazinePeriodicity")]
        public IHttpActionResult GetMagazinePeriodicity()
        {

            var periodicity = _periodicMagazineService.GetMagazinePeriodicity();
            return Ok(periodicity);
        }

        [HttpGet]
        [Route("magazineByPeriodicity")]
        public IHttpActionResult GetMagazineByPeriodicity(string periodicity)
        {
            var magazines = _periodicMagazineService.GetMagazineByPeriodicity(periodicity);
            return Ok(magazines);
        }

        [HttpGet]
        [Route("magazineSubscription")]
        public IHttpActionResult GetMagazineSubscriptionInYear()
        {
            var years = _periodicMagazineService.GetMagazineSubscriptionInYear();
            return Ok(years);
        }

        [HttpGet]
        [Route("magazineBySubscription/{year}")]
        public IHttpActionResult GetMagazineBySubscription(int year)
        {
            var magazines = _periodicMagazineService.GetMagazineBySubscription(year);
            return Ok(magazines);
        }

    }
}
