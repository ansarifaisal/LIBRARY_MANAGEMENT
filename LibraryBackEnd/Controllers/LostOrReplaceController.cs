using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/lostOrReplace")]
    public class LostOrReplaceController : ApiController
    {
        private ILostOrReplaceService _lostOrReplaceService;
        private IBookService _bookService;
        private IStudentService _studentService;

        public LostOrReplaceController(
            ILostOrReplaceService lostOrReplaceService,
            IBookService bookService,
            IStudentService studentService)
        {
            _lostOrReplaceService = lostOrReplaceService;
            _bookService = bookService;
            _studentService = studentService;
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var books = _lostOrReplaceService.GetAll();
            return Ok(books);
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();
            var book = _lostOrReplaceService.SelectById(Id);
            if (book == null)
                return BadRequest();

            return Ok(book);
        }

        [HttpPut]
        [Route("replace")]
        public IHttpActionResult ReplaceBook(LostOrReplace lostOrReplace)
        {
            lostOrReplace.Status = "Replace";
            _lostOrReplaceService.Update(lostOrReplace);

            var book = _bookService.GetByAccessionNumber(lostOrReplace.AccessionNumber);

            if (book == null)
                return BadRequest();
            book.Status = "Replace";
            _bookService.Update(book);

            var student = _studentService.GetByRollNo(lostOrReplace.RollNo);
            if (student == null)
                return BadRequest();
            student.Status = "APPROVED";
            _studentService.Update(student);
            return Ok("Done!");
        }

        [HttpPut]
        [Route("undoReplace")]
        public IHttpActionResult UndoReplaceBook(LostOrReplace lostOrReplace)
        {
            lostOrReplace.Status = "Lost";
            _lostOrReplaceService.Update(lostOrReplace);

            var book = _bookService.GetByAccessionNumber(lostOrReplace.AccessionNumber);

            if (book == null)
                return BadRequest();
            book.Status = "Lost";
            _bookService.Update(book);

            var student = _studentService.GetByRollNo(lostOrReplace.RollNo);
            if (student == null)
                return BadRequest();
            student.Status = "DEFAULT";
            _studentService.Update(student);
            return Ok("Done!");
        }

    }
}
