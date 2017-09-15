using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/newspaper/paper")]
    public class NewspaperController : ApiController
    {
        private INewspaperService _newsPaperService;

        public NewspaperController(INewspaperService newsPaperService)
        {
            _newsPaperService = newsPaperService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult AddPublication(Newspaper newsPaper)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperService.Create(newsPaper);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All(string title, DateTime month)
        {
            var publishers = _newsPaperService.GetByMonth(title, month);
            return Ok(publishers);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(Newspaper newsPaper)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperService.Update(newsPaper);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(Newspaper newsPaper)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperService.Delete(newsPaper);
            return Ok();
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var newsPaper = _newsPaperService.SelectById(Id);

            if (newsPaper == null)
                return NotFound();

            return Ok(newsPaper);
        }

        [Route("getDate")]
        [HttpGet]
        public IHttpActionResult GetDate(DateTime date, DateTime month, string publisher)
        {
            if (date == null || month == null || publisher == "")
                throw new ArgumentNullException();
            var newsPaper = _newsPaperService.GetDate(date, month, publisher);

            return Ok(newsPaper);
        }
    }
}
