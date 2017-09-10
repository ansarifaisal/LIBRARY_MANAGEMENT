using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/newspaper/publisher")]
    public class NewspaperPublisherController : ApiController
    {
        private INewspaperPublisherService _newsPaperPublisherService;

        public NewspaperPublisherController(INewspaperPublisherService newsPaperPublisherService)
        {
            _newsPaperPublisherService = newsPaperPublisherService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult AddPublication(NewspaperPublisher newspaperPublisher)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperPublisherService.Create(newspaperPublisher);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var publishers = _newsPaperPublisherService.GetAll();
            return Ok(publishers);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(NewspaperPublisher newspaperPublisher)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperPublisherService.Update(newspaperPublisher);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(NewspaperPublisher newspaperPublisher)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _newsPaperPublisherService.Delete(newspaperPublisher);
            return Ok();
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var newspaperPublisher = _newsPaperPublisherService.SelectById(Id);

            if (newspaperPublisher == null)
                return NotFound();

            return Ok(newspaperPublisher);
        }
    }
}
