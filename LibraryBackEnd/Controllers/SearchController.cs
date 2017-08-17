using LibraryBackEnd.Core.BindingModels;
using LibraryBackEnd.Core.Services.Interface;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/search")]
    public class SearchController : ApiController
    {
        private IBookService _bookService;
        private IStudentService _studentService;

        public SearchController(IBookService bookService, IStudentService studentService)
        {
            _bookService = bookService;
            _studentService = studentService;
        }

        [Route("books")]
        [HttpPost]
        public IHttpActionResult GetSearchResults(SearchBindingModel searchBindingModel)
        {
            var books = _bookService.GetSearchResults(searchBindingModel);
            return Ok(books);
        }

        [Route("students")]
        [HttpPost]
        public IHttpActionResult GetStudentSearchResults(SearchStudentBindingModel searchStudentBindingModel)
        {
            var students = _studentService.GetSearchResults(searchStudentBindingModel);
            return Ok(students);
        }

        [HttpGet]
        [Route("fullNames")]
        public IHttpActionResult GetFullName()
        {
            var fullNames = _studentService.GetFullName();
            return Ok(fullNames);
        }

        [HttpGet]
        [Route("rollNos")]
        public IHttpActionResult GetRollNos()
        {
            var rollNos = _studentService.GetRollNos();
            return Ok(rollNos);
        }
    }
}
