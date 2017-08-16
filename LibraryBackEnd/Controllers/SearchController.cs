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

        public SearchController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [Route("books")]
        [HttpPost]
        public IHttpActionResult GetSearchResults(SearchBindingModel searchBindingModel)
        {
            var books = _bookService.GetSearchResults(searchBindingModel);
            return Ok(books);
        }
    }
}
