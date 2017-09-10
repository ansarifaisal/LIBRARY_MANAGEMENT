using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/newspaper/month")]
    public class NewspaperMonthController : ApiController
    {
        private INewspaperMonthService _newsPaperMonthService;

        public NewspaperMonthController(INewspaperMonthService newsPaperMonthService)
        {
            _newsPaperMonthService = newsPaperMonthService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult AddPublication(NewspaperMonth newsPaperMonth)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperMonthService.Create(newsPaperMonth);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All(string title)
        {
            var months = _newsPaperMonthService.GetByTitle(title);
            return Ok(months);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(NewspaperMonth newsPaperMonth)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperMonthService.Update(newsPaperMonth);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(NewspaperMonth newsPaperMonth)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperMonthService.Delete(newsPaperMonth);
            return Ok();
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var periodicNewspaper = _newsPaperMonthService.SelectById(Id);

            if (periodicNewspaper == null)
                return NotFound();

            return Ok(periodicNewspaper);
        }
    }
}
