using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/magazine")]
    public class MagazineController : ApiController
    {
        private IMagazinePublisherService _magazinePublisherService;

        public MagazineController(IMagazinePublisherService magazinePublisherService)
        {
            _magazinePublisherService = magazinePublisherService;
        }

        [Route("publisher/add")]
        [HttpPost]
        public IHttpActionResult AddPublication(MagazinePublisher magazinePublisher)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            var flag = CheckExistingPublisher(magazinePublisher.Title);

            if (flag == true)
                return BadRequest("true");

            _magazinePublisherService.Create(magazinePublisher);
            return Ok("Added Successfully!");
        }

        [Route("publisher/all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var publishers = _magazinePublisherService.GetAll();
            return Ok(publishers);
        }

        [Route("publisher/edit")]
        [HttpPost]
        public IHttpActionResult Edit(MagazinePublisher magazinePublisher)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _magazinePublisherService.Update(magazinePublisher);
            return Ok();
        }

        [Route("publisher/delete")]
        [HttpPost]
        public IHttpActionResult Delete(MagazinePublisher magazinePublisher)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _magazinePublisherService.Delete(magazinePublisher);
            return Ok();
        }

        [Route("get/publisher/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var magazinePublisher = _magazinePublisherService.SelectById(Id);

            if (magazinePublisher == null)
                return NotFound();

            return Ok(magazinePublisher);
        }

        [Route("publisher/checkExisting")]
        [HttpGet]
        public bool CheckExistingPublisher(string title)
        {
            if (title == null)
                return false;
            var publisher = _magazinePublisherService.GetByTitle(title);
            if (publisher == null)
                return false;
            return true;
        }

    }
}
